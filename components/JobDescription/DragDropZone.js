import React from 'react';

const DragDropZone = ({ selectedRole, setSelectedRole, selectedSkills, setSelectedSkills, selectedEducation, setSelectedEducation, selectedLocation, setSelectedLocation, onClear }) => {

    // ... drag handlers handleDragOver, handleDragEnter, handleDragLeave stay same ...
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragEnter = (e) => {
        e.currentTarget.classList.add("drag-active");
    };

    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove("drag-active");
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove("drag-active");

        const dataString = e.dataTransfer.getData("application/json");
        if (!dataString) return;

        try {
            const data = JSON.parse(dataString);
            const { type, label } = data;

            if (type === 'role') {
                setSelectedRole({ id: Date.now(), label });
            } else if (type === 'skill') {
                setSelectedSkills((prev) => {
                    if (prev.find(s => s.label === label)) return prev;
                    return [...prev, { id: Date.now(), label }];
                });
            } else if (type === 'education') {
                setSelectedEducation((prev) => {
                    if (prev.find(e => e.label === label)) return prev;
                    return [...prev, { id: Date.now(), label }];
                });
            } else if (type === 'location') {
                setSelectedLocation({ id: Date.now(), label });
            }
        } catch (err) {
            console.error("Failed to parse drop data", err);
        }
    };

    const removeSkill = (id) => {
        setSelectedSkills(prev => prev.filter(s => s.id !== id));
    };

    const removeEducation = (id) => {
        setSelectedEducation(prev => prev.filter(e => e.id !== id));
    };

    return (
        <div className="jd-card">
            <div className="card-header">
                <div className="card-title">Create Your Own</div>
                <span
                    style={{ cursor: 'pointer', fontSize: '13px', color: '#818cf8' }}
                    onClick={onClear}
                >
                    Clear
                </span>
            </div>

            <div
                className="drop-zone"
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                    position: 'relative',
                    minHeight: '280px',
                    border: '2px dashed #475569',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px',
                    transition: 'all 0.3s ease'
                }}
            >
                <div className="tags-container" style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    right: '16px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    zIndex: 2
                }}>
                    {/* Render Role */}
                    {selectedRole && (
                        <div className="floating-tag purple">
                            Role: {selectedRole.label}
                            <span className="close-icon" onClick={() => setSelectedRole(null)}>
                                ✕
                            </span>
                        </div>
                    )}

                    {/* Render Location */}
                    {selectedLocation && (
                        <div className="floating-tag green">
                            Loc: {selectedLocation.label}
                            <span className="close-icon" onClick={() => setSelectedLocation(null)}>
                                ✕
                            </span>
                        </div>
                    )}

                    {/* Render Skills */}
                    {selectedSkills.map(skill => (
                        <div key={skill.id} className="floating-tag blue">
                            {skill.label}
                            <span className="close-icon" onClick={() => removeSkill(skill.id)}>
                                ✕
                            </span>
                        </div>
                    ))}

                    {/* Render Education */}
                    {selectedEducation && selectedEducation.map(edu => (
                        <div key={edu.id} className="floating-tag pink" style={{ background: 'rgba(244, 114, 182, 0.15)', color: '#f472b6', border: '1px solid rgba(244, 114, 182, 0.3)' }}>
                            {edu.label}
                            <span className="close-icon" onClick={() => removeEducation(edu.id)}>
                                ✕
                            </span>
                        </div>
                    ))}
                </div>

                {/* Only show center content if no items are dropped */}
                {!selectedRole && !selectedLocation && selectedSkills.length === 0 && (!selectedEducation || selectedEducation.length === 0) && (
                    <div className="drop-center" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px'
                    }}>
                        <div className="plus-circle" style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: '#818cf8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(129, 140, 248, 0.4)'
                        }}>
                            <span className="material-icons" style={{
                                color: 'white',
                                fontSize: '28px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>add</span>
                        </div>
                        <div className="drop-label" style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#e2e8f0',
                            textAlign: 'center'
                        }}>Drag Role or Skills Here</div>
                        <div className="drop-subtext" style={{
                            fontSize: '13px',
                            color: '#818cf8',
                            textAlign: 'center'
                        }}>Drop here to add tag</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DragDropZone;
