import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Package, Users, Menu, Moon, Sun } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from './ui/button';

export default function Layout() {
    const { theme, toggleTheme, sidebarOpen, setSidebarOpen } = useAppContext();
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/', icon: Home },
        { name: 'Products', href: '/products', icon: Package },
        { name: 'Resources', href: '/resources', icon: Users },
    ];

    return (
        <div className="flex h-screen bg-background overflow-hidden relative">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center h-16 px-6 border-b border-border">
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">Redx-Dashboard</span>
                </div>
                <nav className="p-4 space-y-2">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                    }`}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="flex items-center justify-between h-16 px-6 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden mr-4"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <h1 className="text-xl font-semibold capitalize">
                            {location.pathname === '/' ? 'Dashboard' : location.pathname.slice(1)}
                        </h1>
                    </div>
                    <Button variant="ghost" size="icon" onClick={toggleTheme}>
                        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </Button>
                </header>

                <main className="flex-1 overflow-auto p-6 md:p-8 bg-muted/20">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
