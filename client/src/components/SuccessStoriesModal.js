import React, { useEffect } from 'react';
import './SuccessStoriesModal.css';

const SuccessStoriesModal = ({ isOpen, onClose, onExplore, onFeedback }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <span className="material-icons">close</span>
                </button>

                <div className="modal-body-content">
                    <div className="modal-pill-container">
                        <div className="modal-pill">
                            <span style={{ fontSize: '1.25em' }}>●</span> EARLY ACCESS
                        </div>
                    </div>

                    <h2 className="modal-title">Success Stories — Early Access Phase</h2>

                    <p className="modal-description">
                        This product is in early access. Our features are evolving daily based on recruiter feedback to build the future of AI-driven hiring. Join us in shaping the workflow.
                    </p>

                    <div className="section-label">WHAT TO EXPECT</div>

                    <div className="features-grid">
                        {/* Left Column */}
                        <div className="feature-column">
                            <div className="feature-item">
                                <div className="feature-icon-wrapper active">
                                    <span className="material-icons" style={{ fontSize: '14px' }}>check</span>
                                </div>
                                <div className="feature-content">
                                    <h4>Initial workflow experience</h4>
                                    <span className="feature-status">Available now</span>
                                </div>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon-wrapper active">
                                    <span className="material-icons" style={{ fontSize: '14px' }}>check</span>
                                </div>
                                <div className="feature-content">
                                    <h4>UI-first product design</h4>
                                    <span className="feature-status">Available now</span>
                                </div>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon-wrapper active">
                                    <span className="material-icons" style={{ fontSize: '14px' }}>check</span>
                                </div>
                                <div className="feature-content">
                                    <h4>Early hiring insights</h4>
                                    <span className="feature-status">Available now</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="feature-column">
                            <div className="feature-item">
                                <div className="feature-icon-wrapper inactive">
                                    <span className="material-icons">more_horiz</span>
                                </div>
                                <div className="feature-content">
                                    <h4 style={{ color: '#94a3b8' }}>Verified success stories</h4>
                                    <span className="feature-status status-coming-soon">COMING SOON</span>
                                </div>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon-wrapper inactive">
                                    <span className="material-icons">bar_chart</span>
                                </div>
                                <div className="feature-content">
                                    <h4 style={{ color: '#94a3b8' }}>Advanced analytics</h4>
                                    <span className="feature-status">Roadmap</span>
                                </div>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon-wrapper inactive">
                                    <span className="material-icons">trending_up</span>
                                </div>
                                <div className="feature-content">
                                    <h4 style={{ color: '#94a3b8' }}>Industry benchmarks</h4>
                                    <span className="feature-status">Roadmap</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-explore" onClick={onExplore}>
                        Explore the Workflow
                        <span className="material-icons" style={{ fontSize: '1rem' }}>arrow_forward</span>
                    </button>
                    <button className="btn-feedback" onClick={onFeedback}>
                        Share Feedback
                        <span className="material-icons" style={{ fontSize: '1rem', marginLeft: '4px' }}>chat_bubble_outline</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessStoriesModal;
