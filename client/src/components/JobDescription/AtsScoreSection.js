import React from 'react';

const AtsScoreSection = ({ atsScore, setAtsScore }) => {
    // Logic for active bars
    const getBarClass = (barIndex) => {
        // defined ranges:
        // 1: 10-30 covers bar 1
        // 2: 30-60 covers bar 1, 2
        // 3: 60-80 covers bar 1, 2, 3
        // 4: 80-100 covers bar 1, 2, 3, 4

        let isActive = false;
        if (barIndex === 1 && atsScore >= 10) isActive = true;
        if (barIndex === 2 && atsScore >= 30) isActive = true;
        if (barIndex === 3 && atsScore >= 60) isActive = true;
        if (barIndex === 4 && atsScore >= 80) isActive = true;

        return isActive ? 'bar active' : 'bar';
    };

    return (
        <div className="jd-card">
            <div className="card-header">
                <div className="card-title">Target ATS Score</div>
                <div className="min-pill">
                    <span className="material-icons" style={{ fontSize: '12px' }}>tune</span>
                    Min: {atsScore}%
                </div>
            </div>
            <div className="card-subtitle">Set minimum threshold for keyword matching</div>

            <div className="ats-chart-container">
                <div className="ats-chart">
                    <div className={getBarClass(1)} style={{ height: '35%' }}></div>
                    <div className={getBarClass(2)} style={{ height: '55%' }}></div>
                    <div className={getBarClass(3)} style={{ height: '75%' }}>
                        {atsScore >= 60 && atsScore < 80 && <div className="target-badge">Target</div>}
                    </div>
                    <div className={getBarClass(4)} style={{ height: '95%' }}>
                        {atsScore >= 80 && <div className="target-badge">Target</div>}
                    </div>
                </div>
            </div>

            <div className="slider-container">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={atsScore}
                    onChange={(e) => setAtsScore(Number(e.target.value))}
                    className="custom-range"
                />
            </div>
        </div>
    );
};

export default AtsScoreSection;
