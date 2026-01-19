import React from 'react';
import './ReviewJobDescription.css';

const ReviewJobDescription = ({ data, onEdit, onSave }) => {
    const [showModal, setShowModal] = React.useState(false);

    const handleSaveClick = () => {
        setShowModal(true);
    };

    return (
        <div className="review-container-new">
            {/* ... component content ... */}
            <header className="jd-header">
                <div className="breadcrumbs">
                    Dashboard  ›  New Job Posting  ›  <span style={{ color: 'white' }}>Review Job Description</span>
                </div>
                <div className="jd-title-row">
                    <div className="jd-title">
                        <h1>Review Job Description</h1>
                        <div className="jd-subtitle">Confirm the details below before saving the job posting.</div>
                    </div>
                    {/* Compact Step Tracker */}
                    <div className="step-tracker-compact">
                        <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>STEP 2 OF 4</span>
                        <div style={{ width: '80px', height: '4px', background: '#334155', borderRadius: '2px', margin: '0 12px' }}>
                            <div style={{ width: '50%', background: '#818cf8', height: '100%', borderRadius: '2px' }}></div>
                        </div>
                        <span style={{ background: '#312e81', color: '#818cf8', fontSize: '11px', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>58%</span>
                    </div>
                </div>
            </header>

            <div className="review-main-card-new">
                {/* LEFT CONTENT */}
                <div className="review-content-section-new">
                    <div className="content-header-new">
                        <h2>Parsed Summary</h2>
                        <span className="badge-ready-new">READY TO SAVE</span>
                    </div>
                    <p className="instruction-text-new">Please verify the extracted information below.</p>

                    {/* Stacked Cards */}
                    <div className="summary-cards-stack">
                        {/* Role Card */}
                        <div className="summary-card-new role-card">
                            <div className="card-icon-new">
                                <span className="material-icons">work</span>
                            </div>
                            <div className="card-content-new">
                                <div className="card-label-new">ROLE</div>
                                <div className="card-value-new">{data.role[0] || 'Not specified'}</div>
                            </div>
                        </div>

                        {/* Location Card */}
                        <div className="summary-card-new location-card">
                            <div className="card-icon-new">
                                <span className="material-icons">location_on</span>
                            </div>
                            <div className="card-content-new">
                                <div className="card-label-new">LOCATION</div>
                                <div className="card-value-new">{data.location[0] || 'Remote'}</div>
                            </div>
                        </div>

                        {/* Skills Card */}
                        <div className="summary-card-new skills-card">
                            <div className="card-icon-new">
                                <span className="material-icons">build</span>
                            </div>
                            <div className="card-content-new">
                                <div className="card-label-new">SKILLS</div>
                                <div className="card-value-new">{data.skills.join(', ') || 'Not specified'}</div>
                            </div>
                        </div>

                        {/* Experience Card */}
                        <div className="summary-card-new experience-card">
                            <div className="card-icon-new">
                                <span className="material-icons">trending_up</span>
                            </div>
                            <div className="card-content-new">
                                <div className="card-label-new">EXPERIENCE</div>
                                <div className="card-value-new">{data.experience[0] || 'Not specified'}</div>
                            </div>
                        </div>

                        {/* Education Card */}
                        {data.education && data.education.length > 0 && (
                            <div className="summary-card-new education-card">
                                <div className="card-icon-new">
                                    <span className="material-icons">school</span>
                                </div>
                                <div className="card-content-new">
                                    <div className="card-label-new">EDUCATION</div>
                                    <div className="card-value-new">{data.education.join(', ')}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT SIDE ATS & SAVE */}
                <div className="review-sidebar-new">
                    <div className="ats-card-new">
                        <div className="ats-label-new">ATS COMPATIBILITY</div>
                        <div className="ats-circle-wrapper-new">
                            <svg viewBox="0 0 200 200" className="ats-circle-svg">
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="80"
                                    fill="none"
                                    stroke="#2d3748"
                                    strokeWidth="20"
                                />
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="80"
                                    fill="none"
                                    stroke="#818cf8"
                                    strokeWidth="20"
                                    strokeDasharray={`${(data.atsScore / 100) * 502.4} 502.4`}
                                    strokeLinecap="round"
                                    transform="rotate(-90 100 100)"
                                />
                            </svg>
                            <div className="ats-score-text-new">
                                <span className="score-val-new">{data.atsScore}<span className="percent-sign">%</span></span>
                                <div className="score-status-new">Excellent Match</div>
                            </div>
                        </div>
                        <div className="ats-dots">
                            <span className="dot active"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    </div>

                    <div className="save-action-area-new">
                        <button className="btn-save-new" onClick={handleSaveClick}>
                            <span className="material-icons">save</span>
                            Save Description
                        </button>
                    </div>
                </div>
            </div>

            {/* Back to Edit - Outside the card */}
            <div className="review-external-footer-new">
                <button className="btn-back-new" onClick={onEdit}>
                    <span className="material-icons">arrow_back</span> Back to Edit
                </button>
            </div>

            <div className="security-note-new">
                <span className="material-icons">lock</span> Your job description is secure and private until published.
            </div>

            {/* DEMO MODE MODAL */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                            <span className="material-icons">close</span>
                        </button>
                        <div className="modal-icon-box">
                            <span className="material-icons">engineering</span>
                        </div>
                        <h2>🚧 Processing in Progress</h2>
                        <p>This action is currently operating in UI demo mode without backend execution.</p>
                        <p className="modal-subtext">Backend logic for this feature is under development and will be integrated as part of the implementation plan.</p>
                        <div className="modal-info-box">
                            <span className="material-icons">info</span>
                            This preview is intended to demonstrate the final user workflow and experience.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewJobDescription;
