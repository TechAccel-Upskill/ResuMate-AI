import React from 'react';

const PasteDescription = ({ rawJD, setRawJD, onTagsGenerated }) => {
    // Structured state for grouped tags
    const [tags, setTags] = React.useState({
        role: [],
        skills: [],
        location: [],
        experience: [],
        education: []
    });

    const [isLoading, setIsLoading] = React.useState(false);

    const handleGenerateTags = (currentText) => {
        if (!currentText || !currentText.trim()) return;

        // Start loading
        setIsLoading(true);

        // Simulate 3 seconds delay
        setTimeout(() => {
            generateTagsLogic(currentText);
            setIsLoading(false);
        }, 2000);
    };

    const generateTagsLogic = (currentText) => {
        // Create fresh empty state
        const newTags = {
            role: [],
            skills: [],
            location: [],
            experience: [],
            education: []
        };

        const text = currentText.toLowerCase();

        // --- 1. ROLE (Violet) ---
        // Regex to find common role patterns
        const roleRegex = /(senior|lead|principal|junior|sr\.|jr\.)?[\s-]*(software|frontend|backend|fullstack|react|node|java|python|ui\/ux|mobile|android|ios|devops|data)\s*(developer|engineer|architect|designer)/g;
        const roleMatches = text.match(roleRegex);
        if (roleMatches) {
            // Take top 1 for cleaner UI
            const uniqueRoles = [...new Set(roleMatches)];
            if (uniqueRoles.length > 0) {
                const formattedRole = uniqueRoles[0].replace(/\b\w/g, c => c.toUpperCase());
                newTags.role.push(formattedRole);
            }
        }
        else if (text.includes('manager') || text.includes('director')) {
            if (text.includes('product manager')) newTags.role.push("Product Manager");
            else if (text.includes('project manager')) newTags.role.push("Project Manager");
        }

        // --- 2. SKILLS (Blue) - Grouped ---
        const skillKeywords = [
            'react', 'javascript', 'node.js', 'node', 'python', 'java', 'sql', 'typescript',
            'docker', 'aws', 'html', 'css', 'redux', 'angular', 'vue', 'mongodb', 'postgresql',
            'git', 'kubernetes', 'c++', 'c#', '.net', 'django', 'flask', 'spring boot'
        ];

        const foundSkills = new Set();
        skillKeywords.forEach(skill => {
            const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');

            if (regex.test(text)) {
                let niceLabel = skill;
                if (skill === 'node' || skill === 'node.js') niceLabel = 'Node.js';
                else if (skill === 'react') niceLabel = 'React';
                else if (['sql', 'aws', 'html', 'css', 'git'].includes(skill)) niceLabel = skill.toUpperCase();
                else niceLabel = skill.charAt(0).toUpperCase() + skill.slice(1);

                foundSkills.add(niceLabel);
            }
        });
        if (foundSkills.size > 0) {
            newTags.skills = [...foundSkills].slice(0, 8); // Limit to top 8 skills
        }

        // --- 3. LOCATION (Green) ---
        const cities = [
            'bangalore', 'bengaluru', 'hyderabad', 'pune', 'chennai', 'mumbai', 'delhi', 'noida',
            'gurgaon', 'gurugram', 'kolkata', 'remote', 'work from home', 'on-site', 'hybrid'
        ];

        for (const city of cities) {
            if (text.includes(city)) {
                let niceCity = city.charAt(0).toUpperCase() + city.slice(1);
                if (city === 'bengaluru' || city === 'bangalore') niceCity = 'Bengaluru';
                if (city === 'gurgaon' || city === 'gurugram') niceCity = 'Gurugram';
                if (city === 'work from home') niceCity = 'Remote';

                newTags.location.push(niceCity);
                break; // Single primary location
            }
        }

        // --- 4. EXPERIENCE (Orange) ---
        const expRegex = /(\d+)(\+)?\s*(-)?\s*(\d+)?\s*years?/;
        const expMatch = text.match(expRegex);
        if (expMatch) {
            newTags.experience.push(`${expMatch[0]}`); // "3+ years"
        } else if (text.includes('fresher') || text.includes('entry level')) {
            newTags.experience.push("Fresher");
        }

        // --- 5. EDUCATION (Purple) ---
        if (text.includes('bachelor') || text.includes('degree') || text.includes('b.tech') || text.includes('bs') || text.includes('computer science')) {
            newTags.education.push("Bachelor's Degree");
        }
        if (text.includes('master') || text.includes('ms') || text.includes('m.tech')) {
            newTags.education.push("Master's Degree");
        }
        if (text.includes('phd')) {
            newTags.education.push("PhD");
        }

        // Update state with new tags (completely replacing old state)
        setTags(newTags);
        if (onTagsGenerated) {
            onTagsGenerated(newTags);
        }
    };

    const hasAnyTags = Object.values(tags).some(arr => arr.length > 0);

    return (
        <div className="jd-card">
            <div className="card-header">
                <div className="card-title">
                    <div className="card-icon" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#c084fc' }}>
                        <span className="material-icons" style={{ fontSize: '18px' }}>content_paste</span>
                    </div>
                    Paste Description
                    <span className="sub-label">Auto-parsing enabled</span>
                </div>
                <button
                    className="generate-btn"
                    onClick={() => handleGenerateTags(rawJD)}
                    disabled={!rawJD.trim() || isLoading}
                    style={{
                        background: !rawJD.trim() || isLoading ? '#334155' : '#818cf8',
                        color: !rawJD.trim() || isLoading ? '#94a3b8' : 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: !rawJD.trim() || isLoading ? 'not-allowed' : 'pointer',
                        fontWeight: 600,
                        transition: 'background 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner"></span>
                            Generating...
                        </>
                    ) : (
                        "Generate Tags"
                    )}
                </button>
            </div>

            <textarea
                className="text-editor"
                placeholder="Paste your raw job description here (Ctrl+V)..."
                value={rawJD}
                onChange={(e) => setRawJD(e.target.value)}
            ></textarea>

            <div className="auto-tags-section">
                <div className="auto-label">AUTO-DETECTED TAGS</div>
                <div className="auto-tags">
                    {!hasAnyTags && (
                        <span style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>
                            Paste text and click Generate.
                        </span>
                    )}

                    {/* Role Tag (Violet) */}
                    {tags.role.length > 0 && (
                        <div className="tag-group violet">
                            <span className="group-label">Role:</span>
                            <span className="group-value">{tags.role.join(', ')}</span>
                        </div>
                    )}

                    {/* Location Tag (Green) */}
                    {tags.location.length > 0 && (
                        <div className="tag-group green">
                            <span className="group-label">Loc:</span>
                            <span className="group-value">{tags.location.join(', ')}</span>
                        </div>
                    )}

                    {/* Skills Tag (Blue) - Grouped */}
                    {tags.skills.length > 0 && (
                        <div className="tag-group blue">
                            <span className="group-label">Skills:</span>
                            <span className="group-value">{tags.skills.join(', ')}</span>
                        </div>
                    )}

                    {/* Experience Tag (Orange) */}
                    {tags.experience.length > 0 && (
                        <div className="tag-group orange">
                            <span className="group-label">Exp:</span>
                            <span className="group-value">{tags.experience.join(', ')}</span>
                        </div>
                    )}

                    {/* Education Tag (Purple) */}
                    {tags.education.length > 0 && (
                        <div className="tag-group purple">
                            <span className="group-label">Edu:</span>
                            <span className="group-value">{tags.education.join(', ')}</span>
                        </div>
                    )}

                    {/* Always allow manual add */}
                    <span className="tag-pill dashed">+ Add Tag</span>
                </div>
            </div>
        </div>
    );
};

export default PasteDescription;
