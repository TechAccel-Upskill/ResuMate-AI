import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './ResumeScan.css';
import '../pages/Dashboard.css'; // Common variables
import RecruiterProfileCard from '../components/RecruiterProfileCard';
import { supabase } from '../supabase';
import ThemeToggle from '../components/ThemeToggle';

const ResumeScan = () => {

    // Icons
    const icons = {
        Gmail: <svg viewBox="0 0 24 24" width="16" height="16"><path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" /></svg>,
        Outlook: <svg viewBox="0 0 24 24" width="16" height="16"><path fill="#0072C6" d="M1 17.5V6.5h6v11H1zm6 4l12.5-3.5V6L7 2.5v19zm12.5-12l2.5 1.5v6.5l-2.5 1.5v-9.5z" /><path fill="#FFF" d="M10 8.5h5v5h-5z" /></svg>,
        'Google Drive': <svg viewBox="0 0 87.3 78" width="16" height="16"><path fill="#FFC107" d="M6.6 66.85l25.3-43.8 25.3 43.8H6.6z" /><path fill="#0066DA" d="M44.6 23.05l12.6-21.8L83.7 66.9l-12.6 21.8-26.5-65.65z" /><path fill="#009939" d="M31.9 23.05L6.6 66.85l-6.6-11.4 25.3-43.8 6.6 11.4z" /></svg>,
        'Custom Email': <span className="material-icons" style={{ fontSize: '16px', color: 'var(--text-muted)' }}>mail</span>,
    };

    const ProviderDropdown = ({ value, onChange, disabled }) => {
        const [isOpen, setIsOpen] = useState(false);
        const dropdownRef = useRef(null);

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        const toggleDropdown = () => {
            if (!disabled) {
                setIsOpen(!isOpen);
            }
        };

        const renderTriggerContent = () => {
            if (!value || value === 'Select your email source') {
                return <span style={{ color: 'var(--text-muted)' }}>Select your email source</span>;
            }
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {icons[value]}
                    <span>{value}</span>
                </div>
            );
        };

        return (
            <div className={`custom-dropdown ${disabled ? 'disabled' : ''}`} ref={dropdownRef} style={{ opacity: disabled ? 0.6 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
                <div className="dropdown-trigger" onClick={toggleDropdown}>
                    {renderTriggerContent()}
                    {!disabled && <span className="material-icons" style={{ fontSize: '16px' }}>arrow_drop_down</span>}
                </div>
                {isOpen && (
                    <div className="dropdown-menu">
                        {Object.keys(icons).map((provider) => (
                            <div
                                key={provider}
                                className={`dropdown-item ${value === provider ? 'selected' : ''}`}
                                onClick={() => {
                                    onChange(provider);
                                    setIsOpen(false);
                                }}
                            >
                                {icons[provider]}
                                {provider}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };


    // Scan State
    const [isScanning, setIsScanning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState([]);
    const [completed, setCompleted] = useState(false);

    // Intake State
    const [emailSources, setEmailSources] = useState([
        { id: 1, env: 'Select your email source', email: '', isAuthenticated: false, loading: false, error: null }
    ]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    // File Input Refs
    const fileInputRef = useRef(null);
    const folderInputRef = useRef(null);

    // Steps for the right-side list
    const [steps, setSteps] = useState([
        { id: 1, label: 'ATS Score calculation', desc: 'Scanned text for readability and format compliance.', status: 'pending' },
        { id: 2, label: 'Skill matching', desc: 'Comparing extracted skills against job requirements...', status: 'pending' },
        { id: 3, label: 'Experience comparison', desc: 'Pending analysis', status: 'pending' },
        { id: 4, label: 'Location match', desc: 'Pending analysis', status: 'pending' },
    ]);

    const logContainerRef = useRef(null);





    // Check for Return from OAuth
    useEffect(() => {
        const checkAuthReturn = async () => {
            const pendingAuth = localStorage.getItem('pending_gmail_auth');
            if (pendingAuth) {
                // We returned from a Google Auth flow
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    // Success!
                    setEmailSources(prev => prev.map(source =>
                        source.id === 1 ? { // Assuming ID 1 is the primary email source
                            ...source,
                            env: 'Gmail',
                            loading: false,
                            isAuthenticated: true,
                            email: session.user.email || 'hrteam@gmail.com'
                        } : source
                    ));
                    localStorage.removeItem('pending_gmail_auth');
                }
            }
        };
        checkAuthReturn();
    }, []);

    // Email handlers
    const updateEmailSource = (id, field, value) => {
        if (field === 'env') {
            if (value === 'Gmail') {
                // Trigger Instant Auth (Real)
                authenticateSource(id, value);
            } else {
                // Other providers (mock or standard)
                setEmailSources(prev => prev.map(source =>
                    source.id === id ? { ...source, [field]: value } : source
                ));
            }
        } else {
            setEmailSources(prev => prev.map(source =>
                source.id === id ? { ...source, [field]: value } : source
            ));
        }
    };

    const authenticateSource = async (id, provider) => {
        if (provider === 'Gmail') {
            // Set loading immediately to show feedback before redirect
            setEmailSources(prev => prev.map(source =>
                source.id === id ? { ...source, env: provider, loading: true, error: null } : source
            ));

            // Mark logic for return
            localStorage.setItem('pending_gmail_auth', 'true');

            // Trigger Real Google OAuth
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/resume-scan`,
                    scopes: 'https://www.googleapis.com/auth/gmail.readonly',
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'select_account'
                    }
                }
            });

            if (error) {
                console.error('Google Auth Error:', error);
                // Handle error state locally if redirect didn't happen (rare)
                setEmailSources(prev => prev.map(source =>
                    source.id === id ? { ...source, loading: false, error: error.message } : source
                ));
                localStorage.removeItem('pending_gmail_auth');
            }
        } else {
            // ... existing mock for others ...
            setEmailSources(prev => prev.map(source =>
                source.id === id ? { ...source, env: provider, loading: true, error: null } : source
            ));
            setTimeout(() => {
                setEmailSources(prev => prev.map(source =>
                    source.id === id ? {
                        ...source,
                        loading: false,
                        isAuthenticated: true,
                        email: provider === 'Outlook' ? 'hr_admin@outlook.com' : 'drive_user@gmail.com'
                    } : source
                ));
            }, 1500);
        }
    };

    const addEmailSource = () => {
        const newId = Math.max(...emailSources.map(s => s.id)) + 1;
        setEmailSources(prev => [...prev, { id: newId, env: 'Select your email source', email: '', isAuthenticated: false, loading: false, error: null }]);
    };

    const removeEmailSource = (id) => {
        if (emailSources.length > 1) {
            setEmailSources(prev => prev.filter(source => source.id !== id));
        }
    };

    // File handlers
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFiles(prev => {
                // Filter out duplicates based on name and size
                const newFiles = Array.from(e.target.files);
                const uniqueNewFiles = newFiles.filter(nf =>
                    !prev.some(pf => pf.name === nf.name && pf.size === nf.size)
                );
                return [...prev, ...uniqueNewFiles];
            });
        }
        // Reset input to allow re-selection of same file if needed
        e.target.value = '';
    };

    const startScan = () => {
        setIsScanning(true);
        setCompleted(false);
        setProgress(0);
        setLogs(['> Initializing OCR module...']);
        setSteps(prev => prev.map(s => ({ ...s, status: 'pending' })));

        let currentProgress = 0;

        // Simulation Interval
        const interval = setInterval(() => {
            currentProgress += 1;
            setProgress(currentProgress);

            // Log Simulation
            if (currentProgress === 5) addLog('> Parsing PDF structure: candidate_john_doe.pdf');
            if (currentProgress === 15) {
                addLog('> Extracting entities: [Skills, Experience, Education]');
                updateStepStatus(1, 'processing');
            }
            if (currentProgress === 30) {
                addLog('> Matching keywords: "React", "TypeScript"');
                updateStepStatus(1, 'completed');
                updateStepStatus(2, 'processing');
            }
            if (currentProgress === 50) {
                addLog('> Calculating relevance score...');
                updateStepStatus(2, 'completed');
                updateStepStatus(3, 'processing');
            }
            if (currentProgress === 75) {
                addLog('> Processing next file...');
                updateStepStatus(3, 'completed');
                updateStepStatus(4, 'processing');
            }
            if (currentProgress === 90) {
                addLog('> Finalizing report generation...');
                updateStepStatus(4, 'completed');
            }

            if (currentProgress >= 100) {
                clearInterval(interval);
                setCompleted(true);
                addLog('> Scan Complete.');
            }
        }, 80); // Adjust speed here (lower is faster)
    };

    const addLog = (message) => {
        setLogs(prev => [...prev, message]);
    };

    const updateStepStatus = (id, status) => {
        setSteps(prev => prev.map(step => step.id === id ? { ...step, status } : step));
    };

    // Auto-scroll logs
    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="resume-scan-container">
            {/* SIDEBAR - Consistency Maintained */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <div className="icon-box">
                        <span className="material-icons" style={{ color: 'white', fontSize: '20px' }}>smart_toy</span>
                    </div>
                    <span>ResuMate AI</span>
                </div>

                <div className="menu-label">Menu</div>
                <nav className="sidebar-nav">
                    <Link to="/dashboard" className="nav-item">
                        <span className="material-icons">dashboard</span>
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/job-description" className="nav-item">
                        <span className="material-icons">description</span>
                        <span>Job Description</span>
                    </Link>
                    <Link to="/resume-scan" className="nav-item active">
                        <span className="material-icons">document_scanner</span>
                        <span>Resume Scan</span>
                    </Link>
                    <Link to="/reports" className="nav-item">
                        <span className="material-icons">analytics</span>
                        <span>Reports</span>
                    </Link>
                    <Link to="/email-automation/1" className="nav-item">
                        <span className="material-icons">mail</span>
                        <span>Email Center</span>
                    </Link>
                </nav>

                {/* RECRUITER CARD */}
                <RecruiterProfileCard />
            </aside>

            {/* MAIN CONTENT Area */}
            <main className={`rs-main ${isScanning ? 'scanning-active' : ''}`}>
                {/* Header (Top Right) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div></div>
                    <ThemeToggle />
                </div>

                {!isScanning ? (
                    // ================= ORIGINAL UPLOAD UI =================
                    <>
                        {/* Page Header */}
                        <div className="rs-header">
                            <div style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px' }}>
                                Dashboard › Resume Scan
                            </div>

                            <div className="step-badge">Step 2</div>
                            <div className="rs-title">
                                <h1>Add Resumes</h1>
                            </div>
                            <p className="rs-desc">
                                Choose how you want to import candidate profiles into the system. You can upload in bulk or send files via a dedicated email.
                            </p>
                        </div>

                        {/* Dual Cards */}
                        {/* Dual Cards */}
                        <div className="upload-grid">
                            {/* EMAIL CARD */}
                            <div className="upload-card email-card">
                                <div className="card-icon-box icon-blue">
                                    <span className="material-icons" style={{ fontSize: '24px' }}>mail</span>
                                </div>
                                <h3 className="uc-title">Upload via email</h3>
                                <p className="uc-desc">
                                    Select your email provider to directly import resumes or forward attachments.
                                </p>

                                <div className="email-box-label">EMAIL SOURCES</div>
                                <div className="email-sources-list">
                                    {emailSources.map((source, index) => (
                                        <div key={source.id} className="email-source-row" style={{ alignItems: 'flex-start' }}> {/* Align start for success details */}
                                            {/* Dropdown */}
                                            <div style={{ width: '190px', flexShrink: 0 }}>
                                                <ProviderDropdown
                                                    value={source.env}
                                                    onChange={(val) => updateEmailSource(source.id, 'env', val)}
                                                    disabled={source.isAuthenticated || source.loading}
                                                />
                                            </div>

                                            {/* Input / Status Area */}
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                <div className="email-input-container" style={{
                                                    borderColor: source.isAuthenticated ? '#10b981' : '#334155',
                                                    background: source.isAuthenticated ? 'rgba(16, 185, 129, 0.05)' : '#0f1219'
                                                }}>
                                                    {source.loading ? (
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
                                                            <span className="material-icons spin" style={{ fontSize: '18px', color: 'var(--primary)' }}>sync</span>
                                                            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Connecting to {source.env}...</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <span className="material-icons check-icon" style={{ color: source.isAuthenticated ? '#10b981' : '#64748b' }}>
                                                                {source.isAuthenticated ? 'check_circle' : 'mail_outline'}
                                                            </span>
                                                            <input
                                                                type="text"
                                                                value={source.email}
                                                                // Only allow manual type if not authenticated (though auth disables it conceptually, custom email might need it)
                                                                onChange={(e) => updateEmailSource(source.id, 'email', e.target.value)}
                                                                readOnly={source.isAuthenticated}
                                                                placeholder={
                                                                    source.env === 'Gmail' ? 'example@gmail.com' :
                                                                        source.env === 'Outlook' ? 'example@outlook.com' :
                                                                            source.env === 'Google Drive' ? 'Select Drive Account' :
                                                                                'Enter your email'
                                                                }
                                                                className="email-text"
                                                                style={{
                                                                    background: 'transparent',
                                                                    border: 'none',
                                                                    width: '100%',
                                                                    outline: 'none',
                                                                    color: source.isAuthenticated ? '#10b981' : 'white',
                                                                    fontFamily: 'monospace',
                                                                    fontWeight: source.isAuthenticated ? '700' : 'normal',
                                                                    cursor: source.isAuthenticated ? 'default' : 'text'
                                                                }}
                                                            />
                                                            {source.isAuthenticated && <span style={{ fontSize: '14px', marginRight: '5px' }}>✔</span>}
                                                        </>
                                                    )}
                                                </div>

                                                {/* Success / Error Messages */}
                                                {source.isAuthenticated && (
                                                    <div style={{ fontSize: '12px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '5px', paddingLeft: '4px' }}>
                                                        Connected successfully
                                                    </div>
                                                )}
                                                {source.error && (
                                                    <div style={{ fontSize: '12px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '5px', paddingLeft: '4px' }}>
                                                        <span className="material-icons" style={{ fontSize: '12px' }}>error</span>
                                                        Authentication failed. Please try again.
                                                    </div>
                                                )}
                                            </div>

                                            {/* Remove Button */}
                                            {emailSources.length > 1 && (
                                                <button
                                                    onClick={() => removeEmailSource(source.id)}
                                                    className="remove-source-btn"
                                                    title="Remove source"
                                                >
                                                    <span className="material-icons">close</span>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <button className="add-source-btn" onClick={addEmailSource}>
                                    <span className="material-icons">add</span>
                                    Add Another Email Source
                                </button>
                            </div>

                            {/* FOLDER CARD */}
                            <div
                                className="upload-card folder-card"
                                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                                style={{ cursor: 'pointer' }}
                            >
                                {/* Regular File Input */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    multiple
                                    onChange={handleFileChange}
                                />
                                {/* Folder Input (WebkitDirectory) */}
                                <input
                                    type="file"
                                    ref={folderInputRef}
                                    style={{ display: 'none' }}
                                    webkitdirectory=""
                                    directory=""
                                    multiple
                                    onChange={handleFileChange}
                                />

                                {selectedFiles.length === 0 ? (
                                    <>
                                        <div className="card-icon-box icon-purple" style={{ marginBottom: '20px', background: 'rgba(99, 102, 241, 0.1)', width: '64px', height: '64px', borderRadius: '50%' }}>
                                            <span className="material-icons" style={{ fontSize: '32px' }}>cloud_upload</span>
                                        </div>
                                        <h3 className="uc-title" style={{ marginBottom: '8px' }}>Upload resumes</h3>
                                        <p className="uc-desc" style={{ textAlign: 'center', maxWidth: '300px' }}>
                                            Click to browse files, or <span
                                                className="folder-trigger"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    folderInputRef.current && folderInputRef.current.click();
                                                }}
                                            >upload an entire folder</span>.
                                        </p>

                                        <button className="bulk-btn" onClick={(e) => {
                                            e.stopPropagation(); // Prevent double trigger
                                            fileInputRef.current && fileInputRef.current.click();
                                        }}>
                                            <span className="material-icons">add</span>
                                            Select Files
                                        </button>

                                        <div className="supported-text">Supported: PDF, DOCX, TXT (Max 50MB)</div>
                                    </>
                                ) : (
                                    <div style={{ textAlign: 'center' }}>
                                        <div className="card-icon-box icon-purple" style={{ margin: '0 auto 20px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', width: '64px', height: '64px', borderRadius: '50%' }}>
                                            <span className="material-icons" style={{ fontSize: '32px' }}>check_circle</span>
                                        </div>
                                        <h3 className="uc-title" style={{ marginBottom: '8px' }}>
                                            {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''} Selected
                                        </h3>
                                        <p className="uc-desc" style={{ textAlign: 'center', maxWidth: '300px', marginBottom: '24px' }}>
                                            {selectedFiles[0].name}
                                            {selectedFiles.length > 1 && <span style={{ display: 'block', color: 'var(--primary)', marginTop: '4px' }}>+ {selectedFiles.length - 1} more files</span>}
                                        </p>

                                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                            <button className="bulk-btn" onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedFiles([]);
                                            }}>
                                                <span className="material-icons">refresh</span>
                                                Reset
                                            </button>

                                            <button className="bulk-btn" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc', border: '1px solid rgba(99, 102, 241, 0.3)' }} onClick={(e) => {
                                                e.stopPropagation();
                                                folderInputRef.current && folderInputRef.current.click();
                                            }}>
                                                <span className="material-icons">create_new_folder</span>
                                                Add Folder
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* FLOATING ACTION BAR */}
                        <div className="floating-bar">
                            <div className="fb-left">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderRight: '1px solid #334155', paddingRight: '24px' }}>
                                    <div className="file-count-badge">
                                        <span className="material-icons">description</span>
                                        <div className="notif-bubble">3</div>
                                    </div>
                                    <div className="status-text">
                                        <h4>3 resumes added</h4>
                                        <p>Ready to scan and parse</p>
                                    </div>
                                </div>

                                <div className="preview-avatars">
                                    <img src="https://i.pravatar.cc/150?img=11" className="p-avatar" alt="c1" />
                                    <img src="https://i.pravatar.cc/150?img=12" className="p-avatar" alt="c2" />
                                    <img src="https://i.pravatar.cc/150?img=8" className="p-avatar" alt="c3" />
                                    <Link to="#" className="view-list-link">View List</Link>
                                </div>
                            </div>

                            <div className="fb-right">
                                <button className="btn-cancel">Cancel</button>
                                <button className="btn-scan" onClick={startScan}>
                                    <span className="material-icons">document_scanner</span>
                                    Scan Resumes
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    // ================= SCANNING UI =================
                    <div className="scanning-container">
                        <div className="scan-center-icon">
                            <div className="scan-ripple"></div>
                            <span className="material-icons scanner-icon">document_scanner</span>
                            <span className="material-icons sparkle s1">auto_awesome</span>
                            <span className="material-icons sparkle s2">auto_awesome</span>
                        </div>

                        <h2 className="scan-title">ResuMate AI is analyzing resumes...</h2>
                        <p className="scan-subtitle">
                            Please wait while our algorithms process candidate profiles. This usually takes less than a minute.
                        </p>

                        <div className="scan-dashboard">
                            {/* Left: Terminal / Progress */}
                            <div className="scan-monitor">
                                <div className="monitor-header">
                                    <div>
                                        <h4>Processing Batch #402</h4>
                                        <p>18/25 files analyzed</p>
                                    </div>
                                    <div className="monitor-percent">
                                        <h1>{progress}%</h1>
                                        <p>~12s remaining</p>
                                    </div>
                                </div>
                                <div className="scan-progress-bar-bg">
                                    <div className="scan-progress-bar-fill" style={{ width: `${progress}%` }}></div>
                                </div>

                                <div className="scan-terminal" ref={logContainerRef}>
                                    {logs.map((log, i) => (
                                        <div key={i} className="terminal-line">{log}</div>
                                    ))}
                                    <div className="terminal-cursor">_</div>
                                </div>

                                <div className="scan-actions">
                                    <span className="cancel-text">Cancel Process</span>
                                </div>
                            </div>

                            {/* Right: Step Status */}
                            <div className="scan-steps">
                                {steps.map((step) => (
                                    <div key={step.id} className={`step-item ${step.status}`}>
                                        <div className="step-icon">
                                            {step.status === 'completed' && <span className="material-icons">check</span>}
                                            {step.status === 'processing' && <span className="material-icons spin">sync</span>}
                                            {step.status === 'pending' && <span className="material-icons">work_outline</span>}
                                        </div>
                                        <div className="step-content">
                                            <h4>{step.label}</h4>
                                            <p>{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {completed && (
                            <div className="scan-complete-action">
                                <Link to="/reports" className="check-report-btn">
                                    Check Report
                                    <span className="material-icons">arrow_forward</span>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default ResumeScan;
