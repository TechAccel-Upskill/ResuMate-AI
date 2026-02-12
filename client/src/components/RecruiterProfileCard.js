import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import './RecruiterProfileCard.css';

const RecruiterProfileCard = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <div className="sidebar-bottom-section">
            <div className="recruiter-card-premium">
                <div className="rc-avatar-wrapper">
                    <div className="rc-avatar">
                        {user?.email ? user.email.charAt(0).toUpperCase() : 'T'}
                    </div>
                    <div className="rc-online-indicator"></div>
                </div>

                <div className="rc-info">
                    <h3 className="rc-name">{user?.email ? user.email.split('@')[0] : 'thumumanas'}</h3>
                    <div className="rc-role">HR Manager</div>
                    <div className="rc-company">Tech Accel</div>
                </div>

                <button onClick={handleSignOut} className="rc-signout-btn">
                    <span className="material-icons" style={{ fontSize: '16px' }}>logout</span>
                    Sign out
                </button>
            </div>

            <div className="powered-by-section">
                <div className="powered-text">POWERED BY</div>
                <div className="powered-company">
                    <span className="material-icons company-icon">business</span>
                    TechAccel India
                </div>
            </div>
        </div>
    );
};

export default RecruiterProfileCard;
