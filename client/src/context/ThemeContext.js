import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // 1. Check local storage
        const savedTheme = localStorage.getItem('app-theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            // Default to dark logic if we wanted, but requirment says Default Light probably or user didn't specify default but "Light Mode Design (must match reference image style)" suggests it might be the new default or just an option. 
            // User said "press dark mode it should be my present normal ui". Present UI is dark. 
            // Let's check system preference or default to 'dark' since that's the "current" app state, 
            // BUT user wants to build "Universal Light / Dark Mode system", usually light is default for SaaS.
            // Let's default to 'dark' to preserve current experience for existing users if we didn't have persistence yet?
            // Actually user says "Clicking the toggle should instantly switch... Persist...".
            // Let's match the "Reference Image" which is Light. 
            // I will default to 'dark' initially so the first load looks like the "present normal ui" until they toggle?
            // "when i click light mode my ui should change to light mode... when i press dark mode it should be my present normal ui"
            // This implies start state is Dark (present normal UI).
            setTheme('dark');
        }
    }, []);

    useEffect(() => {
        // Update data-theme attribute
        document.documentElement.setAttribute('data-theme', theme);

        // Sync with Tailwind dark mode class
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        localStorage.setItem('app-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
