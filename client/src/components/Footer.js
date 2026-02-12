import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Top Section */}
                <div className="footer-top">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="brand-logo">
                            <span className="material-icons text-teal-400">auto_awesome</span>
                            ResuMate AI
                        </div>
                        <p className="brand-description">
                            Revolutionizing recruitment through AI-powered screening and seamless industry collaboration. Built for modern enterprise teams.
                        </p>
                        <div className="early-access-pill">
                            <span style={{ marginRight: '6px' }}>●</span> EARLY ACCESS • FREE TO USE
                        </div>
                    </div>

                    {/* Links */}
                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>PRODUCT</h4>
                            <ul>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#pricing">Pricing</a></li>
                                <li><a href="#demo">View Demo</a></li>
                                <li><a href="#register" style={{ opacity: 0.4, pointerEvents: 'none', cursor: 'not-allowed' }}>Get Started</a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4>RESOURCES</h4>
                            <ul>
                                <li><a href="#documentation">Documentation</a></li>
                                <li><a href="#how-it-works">How it Works</a></li>
                                <li><a href="#insights">Insights</a></li>
                                <li><a href="#faqs">FAQs</a></li>
                                <li><a href="#feedback">Feedback</a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4>COMPANY</h4>
                            <ul>
                                <li><a href="#about">About Us</a></li>
                                <li><a href="#contact">Contact</a></li>
                                <li><a href="#privacy">Privacy Policy</a></li>
                                <li><a href="#terms">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Middle Section - Collaborate */}
                <div className="collaborate-card">
                    <h3 className="collaborate-title">Collaborate With Us</h3>
                    <p className="collaborate-subtitle">
                        Have feedback or want to collaborate? Share your thoughts with our team.
                    </p>
                    <div className="collaborate-form">
                        <input
                            type="text"
                            className="collaborate-input"
                            placeholder="Write your message, feedback, or collaboration idea here..."
                        />
                        <button className="collaborate-btn">
                            Send Message
                            <span className="material-icons" style={{ fontSize: '1.2rem' }}>arrow_forward</span>
                        </button>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="footer-bottom">
                    <div className="footer-credits">
                        Built by interns at <strong>TechAccel India Pvt. Ltd.</strong> <span style={{ margin: '0 8px', opacity: 0.3 }}>|</span> <em>Powered by TechAccel</em>
                    </div>
                    <div className="footer-copyright">
                        © 2026 ResuMate AI. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
