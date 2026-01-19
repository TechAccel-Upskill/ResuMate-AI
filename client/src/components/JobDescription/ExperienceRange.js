import React from 'react';

const ExperienceRange = ({ experienceRange, setExperienceRange }) => {
    // Specific requested ranges by user
    const presets = [
        { label: '0 - 1 Years', min: 0, max: 1 },
        { label: '1 - 2 Years', min: 1, max: 2 },
        { label: '1 - 3 Years', min: 1, max: 3 },
        { label: '1 - 4 Years', min: 1, max: 4 },
        { label: '2 - 3 Years', min: 2, max: 3 },
        { label: '2 - 4 Years', min: 2, max: 4 },
        { label: '5+ Years', min: 5, max: 10 },
    ];

    const handlePresetClick = (preset) => {
        setExperienceRange({ min: preset.min, max: preset.max });
    };

    return (
        <div className="jd-card">
            <div className="card-header">
                <div className="card-title">Experience Range</div>
                <button
                    className="reset-btn"
                    onClick={() => setExperienceRange({ min: 1, max: 4 })}
                    style={{ fontSize: '11px', color: '#818cf8', background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                    Reset
                </button>
            </div>
            <div className="card-subtitle">Visualize and select experience levels</div>

            <div className="exp-visual-container">
                <div className="current-range-bubble">
                    {experienceRange.min} - {experienceRange.max} Years
                </div>

                {/* Slider Track Visualization */}
                <div className="dual-slider-track" style={{ marginBottom: '20px' }}>
                    <div className="track-bg"></div>
                    <div className="track-fill" style={{
                        left: `${(experienceRange.min / 10) * 100}%`,
                        width: `${((experienceRange.max - experienceRange.min) / 10) * 100}%`
                    }}></div>

                    {/* Visual Handles */}
                    <div className="thumb start" style={{ left: `${(experienceRange.min / 10) * 100}%` }}></div>
                    <div className="thumb end" style={{ left: `${(experienceRange.max / 10) * 100}%` }}></div>
                </div>

                {/* Visible Presets Chips */}
                <div className="presets-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {presets.map(p => (
                        <div
                            key={p.label}
                            onClick={() => handlePresetClick(p)}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '20px',
                                fontSize: '11px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                border: '1px solid',
                                background: (experienceRange.min === p.min && experienceRange.max === p.max)
                                    ? 'rgba(99, 102, 241, 0.2)'
                                    : 'transparent',
                                borderColor: (experienceRange.min === p.min && experienceRange.max === p.max)
                                    ? '#818cf8'
                                    : '#334155',
                                color: (experienceRange.min === p.min && experienceRange.max === p.max)
                                    ? '#818cf8'
                                    : '#94a3b8'
                            }}
                        >
                            {p.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExperienceRange;
