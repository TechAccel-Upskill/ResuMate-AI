import React from 'react';
import './BrandingFooter.css';

const BrandingFooter = () => {
    return (
        <div className="branding-footer">
            <div className="branding-text">Powered by</div>
            <img
                src="https://techaccel.in/assets/techaccel-logo-final-DMpiP-19.png"
                alt="Tech Accel"
                className="branding-logo"
            />
        </div>
    );
};

export default BrandingFooter;
