import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // added useNavigate
import { useAuth } from '../context/AuthProvider'; // added useAuth
import './JobDescription.css';
import '../pages/Dashboard.css';

// Components
import DragDropZone from '../components/JobDescription/DragDropZone';
import PasteDescription from '../components/JobDescription/PasteDescription';
import AtsScoreSection from '../components/JobDescription/AtsScoreSection';
import ExperienceRange from '../components/JobDescription/ExperienceRange';

import ReviewJobDescription from '../components/JobDescription/ReviewJobDescription';
import RecruiterProfileCard from '../components/RecruiterProfileCard';
import ThemeToggle from '../components/ThemeToggle';

// Supabase import removed

const JobDescription = () => {
    const { user, signOut } = useAuth(); // Added hook
    const navigate = useNavigate(); // Added hook

    // 🧠 SINGLE SOURCE OF TRUTH
    const [jobDescriptionDraft, setJobDescriptionDraft] = useState({
        source: null, // 'manual' | 'paste'
        role: [],
        skills: [],
        experience: [],
        education: [],
        location: [],
        jobType: "Full-time", // Added as per UI requirements
        atsScore: 70
    });

    const [rawJD, setRawJD] = useState("");
    const [expandedSection, setExpandedSection] = useState('job roles');
    const [showReview, setShowReview] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Separate state for Experience Range slider as it's a UI control initially
    // We will sync this to draft.experience on save/review if source is manual
    const [experienceRange, setExperienceRange] = useState({ min: 2, max: 5 });

    // --- HANDLERS FOR FLOW A (MANUAL) ---
    const updateManualRole = (roleObj) => {
        // ... (existing logic)
        const newDraft = jobDescriptionDraft.source === 'paste'
            ? { ...jobDescriptionDraft, source: 'manual', role: [], skills: [], experience: [], education: [], location: [], jobType: "Full-time" }
            : { ...jobDescriptionDraft, source: 'manual' };

        newDraft.role = roleObj ? [roleObj.label] : [];
        setJobDescriptionDraft(newDraft);
    };

    const setManualSkillsCompatible = (action) => {
        const newDraft = jobDescriptionDraft.source === 'paste'
            ? { ...jobDescriptionDraft, source: 'manual', role: [], skills: [], experience: [], education: [], location: [], jobType: "Full-time" }
            : { ...jobDescriptionDraft, source: 'manual' };

        // Handle skills update - action is either a function or array
        if (typeof action === 'function') {
            const currentSkills = newDraft.skills.map((s, i) => ({ id: `s${i}`, label: s }));
            const updatedSkills = action(currentSkills);
            newDraft.skills = updatedSkills.map(s => s.label);
        } else {
            newDraft.skills = action.map(s => s.label);
        }

        setJobDescriptionDraft(newDraft);
    };

    const updateManualLocation = (locObj) => {
        const newDraft = jobDescriptionDraft.source === 'paste'
            ? { ...jobDescriptionDraft, source: 'manual', role: [], skills: [], experience: [], education: [], location: [], jobType: "Full-time" }
            : { ...jobDescriptionDraft, source: 'manual' };

        newDraft.location = locObj ? [locObj.label] : [];
        setJobDescriptionDraft(newDraft);
    };

    const updateManualEducation = (eduObj) => {
        const newDraft = jobDescriptionDraft.source === 'paste'
            ? { ...jobDescriptionDraft, source: 'manual', role: [], skills: [], experience: [], education: [], location: [], jobType: "Full-time" }
            : { ...jobDescriptionDraft, source: 'manual' };

        // Handle education update - action is either a function or array
        if (typeof eduObj === 'function') {
            const currentEdu = newDraft.education.map((e, i) => ({ id: `e${i}`, label: e }));
            const updatedEdu = eduObj(currentEdu);
            newDraft.education = updatedEdu.map(e => e.label);
        } else {
            newDraft.education = eduObj.map(e => e.label);
        }
        setJobDescriptionDraft(newDraft);
    };

    // --- HANDLERS FOR FLOW B (PASTE) ---
    const handleTagsGenerated = (generatedTags) => {
        setJobDescriptionDraft({
            source: 'paste',
            role: generatedTags.role,
            skills: generatedTags.skills,
            location: generatedTags.location,
            experience: generatedTags.experience,
            education: generatedTags.education,
            jobType: "Full-time", // Default
            atsScore: 85
        });
    };

    // --- CLEAR MANUAL FIELDS ---
    const handleClearManualFields = () => {
        setJobDescriptionDraft(prev => ({
            ...prev,
            source: null,
            role: [],
            skills: [],
            education: [],
            location: []
        }));
    };

    // --- SAVE LOGIC ---
    const handleSaveJob = async () => {
        console.log("🔥 Save button clicked - frontend");
        try {
            setIsSaving(true);

            // Prepare payload for Backend
            const payload = {
                role: jobDescriptionDraft.role[0] || "Untitled Role",
                location: jobDescriptionDraft.location[0] || "Remote",
                skills: jobDescriptionDraft.skills,
                experience: jobDescriptionDraft.experience[0] || "0-1 years",
                education: jobDescriptionDraft.education,
                jobType: jobDescriptionDraft.jobType || "Full-time",
                atsScore: jobDescriptionDraft.atsScore,
                source: jobDescriptionDraft.source
            };

            const response = await fetch("http://localhost:5000/api/jobs/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Failed to save job");
            }

            const result = await response.json();
            console.log("Saved job:", result);

            alert("✅ Job Description saved successfully");

            // Redirect or reset
            setShowReview(false);
            setJobDescriptionDraft({
                source: null,
                role: [],
                skills: [],
                location: [],
                experience: [],
                education: [],
                jobType: "Full-time",
                atsScore: 70
            });
            setRawJD("");

        } catch (error) {
            console.error(error);
            alert("❌ Error saving Job Description");
        } finally {
            setIsSaving(false);
        }
    };

    // --- REVIEW & VALIDATION ---
    const handleReviewClick = () => {
        // ... (existing conflict logic)
        const hasManualData = jobDescriptionDraft.source === 'manual' && (
            jobDescriptionDraft.role.length > 0 ||
            jobDescriptionDraft.skills.length > 0 ||
            jobDescriptionDraft.location.length > 0 ||
            jobDescriptionDraft.education.length > 0
        );

        if (rawJD.trim().length > 0 && hasManualData) {
            alert("Please select only one job description method. Creating and pasting job descriptions together is not supported.");
            return;
        }

        if (jobDescriptionDraft.source === 'manual') {
            const expString = `${experienceRange.min}-${experienceRange.max} years`;
            setJobDescriptionDraft(prev => ({ ...prev, experience: [expString] }));
        }

        setShowReview(true);
    };

    // Helper to map draft back to DragDropZone format (it wants objects)
    const getManualRoleForUI = () => {
        if (jobDescriptionDraft.source === 'paste') return null;
        return jobDescriptionDraft.role.length > 0 ? { id: 'r1', label: jobDescriptionDraft.role[0] } : null;
    };
    const getManualSkillsForUI = () => {
        if (jobDescriptionDraft.source === 'paste') return [];
        return jobDescriptionDraft.skills.map((s, i) => ({ id: `s${i}`, label: s }));
    };
    const getManualEducationForUI = () => {
        if (jobDescriptionDraft.source === 'paste') return [];
        return jobDescriptionDraft.education.map((e, i) => ({ id: `e${i}`, label: e }));
    };
    const getManualLocationForUI = () => {
        if (jobDescriptionDraft.source === 'paste') return null;
        return jobDescriptionDraft.location.length > 0 ? { id: 'l1', label: jobDescriptionDraft.location[0] } : null;
    };

    // List of locations
    const locations = [
        "Remote", "On-Site",
        "Hyderabad", "Bengaluru", "Pune", "Kolkata",
        "Mumbai", "Delhi", "Chennai", "Ahmedabad",
        "Jaipur", "Surat"
    ];

    const educationOptions = [
        "B.E/B.Tech", "Masters", "PhD", "Diploma"
    ];

    return (
        <div className="job-desc-container">
            {/* SIDEBAR (LIBRARY) */}
            <aside className="jd-sidebar">
                <div className="jd-sidebar-header">
                    <div className="jd-logo">
                        <div className="icon-box" style={{ width: '24px', height: '24px', background: 'var(--primary)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span className="material-icons" style={{ fontSize: '16px', color: 'white' }}>smart_toy</span>
                        </div>
                        <span>ResuMate AI</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Link to="/dashboard" className="nav-item">
                            <span className="material-icons">dashboard</span>
                            <span>Dashboard</span>
                        </Link>
                        <Link to="/job-description" className="nav-item active" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '8px' }}>
                            <span className="material-icons">description</span>
                            <span>Job Description</span>
                        </Link>
                        <Link to="/resume-scan" className="nav-item">
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
                    </div>
                </div>

                <div className="library-title">LIBRARY (DRAG TO ADD)</div>
                <div className="library-section">
                    {/* Job Roles */}
                    <div className="lib-accordion">
                        <div
                            className="lib-header"
                            onClick={() => setExpandedSection(expandedSection === 'roles' ? '' : 'roles')}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: expandedSection === 'roles' ? '#a78bfa' : 'inherit' }}>
                                <span className="material-icons" style={{ fontSize: '16px', color: '#a78bfa' }}>work</span>
                                Job Roles
                            </span>
                            <span className="material-icons" style={{ fontSize: '16px', transform: expandedSection === 'roles' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>expand_more</span>
                        </div>
                        {expandedSection === 'roles' && (
                            <div className="lib-content">
                                {['Senior Frontend Dev', 'Product Manager', 'UX Designer', 'Backend Engineer', 'Full Stack Developer'].map(role => (
                                    <div key={role} className="lib-item" draggable onDragStart={(e) => e.dataTransfer.setData("application/json", JSON.stringify({ type: 'role', label: role }))}>
                                        <span className="material-icons" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>drag_indicator</span> {role}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Skills */}
                    <div className="lib-accordion">
                        <div
                            className="lib-header"
                            onClick={() => setExpandedSection(expandedSection === 'skills' ? '' : 'skills')}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: expandedSection === 'skills' ? '#60a5fa' : 'inherit' }}>
                                <span className="material-icons" style={{ fontSize: '16px', color: '#60a5fa' }}>build</span>
                                Skills
                            </span>
                            <span className="material-icons" style={{ fontSize: '16px', transform: expandedSection === 'skills' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>expand_more</span>
                        </div>
                        {expandedSection === 'skills' && (
                            <div className="lib-content">
                                {['Java', 'Python', 'C', 'HTML', 'CSS', 'React', 'Node.js', 'SQL', 'TypeScript', 'Docker'].map((skill) => (
                                    <div
                                        key={skill}
                                        className="lib-item"
                                        draggable
                                        onDragStart={(e) => e.dataTransfer.setData("application/json", JSON.stringify({ type: 'skill', label: skill }))}
                                    >
                                        <span className="material-icons" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>drag_indicator</span>
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Education */}
                    <div className="lib-accordion">
                        <div
                            className="lib-header"
                            onClick={() => setExpandedSection(expandedSection === 'education' ? '' : 'education')}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: expandedSection === 'education' ? '#f472b6' : 'inherit' }}>
                                <span className="material-icons" style={{ fontSize: '16px', color: '#f472b6' }}>school</span>
                                Education
                            </span>
                            <span className="material-icons" style={{ fontSize: '16px', transform: expandedSection === 'education' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>expand_more</span>
                        </div>
                        {expandedSection === 'education' && (
                            <div className="lib-content">
                                {educationOptions.map(edu => (
                                    <div
                                        key={edu}
                                        className="lib-item"
                                        draggable
                                        onDragStart={(e) => e.dataTransfer.setData("application/json", JSON.stringify({ type: 'education', label: edu }))}
                                    >
                                        <span className="material-icons" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>drag_indicator</span>
                                        {edu}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Location */}
                    <div className="lib-accordion">
                        <div
                            className="lib-header"
                            onClick={() => setExpandedSection(expandedSection === 'location' ? '' : 'location')}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: expandedSection === 'location' ? '#4ade80' : 'inherit' }}>
                                <span className="material-icons" style={{ fontSize: '16px', color: '#4ade80' }}>public</span>
                                Location
                            </span>
                            <span className="material-icons" style={{ fontSize: '16px', transform: expandedSection === 'location' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>expand_more</span>
                        </div>
                        {expandedSection === 'location' && (
                            <div className="lib-content">
                                {locations.map(loc => (
                                    <div
                                        key={loc}
                                        className="lib-item"
                                        draggable
                                        onDragStart={(e) => e.dataTransfer.setData("application/json", JSON.stringify({ type: 'location', label: loc }))}
                                    >
                                        <span className="material-icons" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>drag_indicator</span>
                                        {loc}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* RECRUITER CARD */}
                <RecruiterProfileCard />
            </aside>

            {/* MAIN CONTENT */}
            <main className={`jd-main ${showReview ? 'review-mode' : ''}`}>
                {showReview ? (
                    <ReviewJobDescription
                        data={jobDescriptionDraft}
                        onEdit={() => setShowReview(false)}
                        onSave={handleSaveJob}
                    />
                ) : (
                    <>
                        <header className="jd-header">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div className="breadcrumbs">Dashboard  ›  New Job Posting  ›  Job Description</div>
                                <ThemeToggle />
                            </div>
                            <div className="jd-title-row">
                                <div className="jd-title">
                                    <h1>Let's start with the Job Description</h1>
                                    <div className="jd-subtitle">Define the role requirements to help our AI find the perfect match.</div>
                                </div>
                                <div className="step-tracker">
                                    <div style={{ flex: 1 }}>
                                        <span className="step-info">STEP 1 OF 4</span>
                                        <div className="progress-bar" style={{ height: '4px', background: 'var(--border-subtle)', borderRadius: '2px' }}>
                                            <div style={{ width: '25%', background: 'var(--primary)', height: '100%' }}></div>
                                        </div>
                                    </div>
                                    <span style={{ background: 'var(--bg-active)', color: 'var(--primary)', fontSize: '11px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>25%</span>
                                </div>
                            </div>
                        </header>

                        <div className="jd-grid">
                            {/* CARD 1: CREATE YOUR OWN */}
                            <DragDropZone
                                selectedRole={getManualRoleForUI()} setSelectedRole={updateManualRole}
                                selectedSkills={getManualSkillsForUI()} setSelectedSkills={setManualSkillsCompatible}
                                selectedEducation={getManualEducationForUI()} setSelectedEducation={updateManualEducation}
                                selectedLocation={getManualLocationForUI()} setSelectedLocation={updateManualLocation}
                                onClear={handleClearManualFields}
                            />

                            {/* CARD 2: PASTE DESCRIPTION */}
                            <PasteDescription
                                rawJD={rawJD}
                                setRawJD={setRawJD}
                                onTagsGenerated={handleTagsGenerated}
                            />

                            {/* CARD 3: ATS SCORE */}
                            <AtsScoreSection
                                atsScore={jobDescriptionDraft.atsScore} // Use score from draft
                                setAtsScore={(score) => setJobDescriptionDraft(prev => ({ ...prev, atsScore: score }))}
                            />

                            {/* CARD 4: EXPERIENCE RANGE */}
                            <ExperienceRange experienceRange={experienceRange} setExperienceRange={setExperienceRange} />
                        </div>

                        <footer className="jd-footer">
                            <button className="btn-outline" onClick={handleReviewClick}>Review and Save</button>
                            <button className="btn-primary" onClick={() => navigate('/resume-scan')}>Continue →</button>
                        </footer>
                    </>
                )}
            </main>
        </div>
    );
};

export default JobDescription;
