import { createContext, useContext, useState, type ReactNode } from 'react';

interface AppContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    sidebarOpen: boolean;
    setSidebarOpen: (isOpen: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light'); // default to light as per user's "black and white theme" implicit request? Shadcn's Zinc is very clean in light mode. Let's start with light.
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <AppContext.Provider value={{ theme, toggleTheme, sidebarOpen, setSidebarOpen }}>
            {children}
        </AppContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
