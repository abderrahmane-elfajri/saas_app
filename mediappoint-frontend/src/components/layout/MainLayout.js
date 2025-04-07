import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdDashboard, MdCalendarToday, MdPeople, MdPerson, MdSchedule, MdMenu, MdLogout } from 'react-icons/md';

const MainLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { path: '/dashboard', icon: <MdDashboard className="text-xl" />, label: 'Dashboard' },
        { path: '/appointments', icon: <MdCalendarToday className="text-xl" />, label: 'Appointments' },
        { path: '/clients', icon: <MdPeople className="text-xl" />, label: 'Clients' },
        { path: '/schedule', icon: <MdSchedule className="text-xl" />, label: 'Schedule' },
        { path: '/profile', icon: <MdPerson className="text-xl" />, label: 'Profile' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-green-100">
            {/* Sidebar */}
            <aside 
                className={`fixed top-0 left-0 z-40 h-full bg-white/90 backdrop-blur-sm shadow-lg transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center h-16 border-b border-gray-200/50">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                            MediAppoint
                        </h2>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-3 py-4 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                    location.pathname === item.path
                                        ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-white/50'
                                }`}
                            >
                                {item.icon}
                                <span className="ml-3">{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Logout button */}
                    <div className="p-4 border-t border-gray-200/50">
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50/50 transition-colors"
                        >
                            <MdLogout className="text-xl" />
                            <span className="ml-3">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                {/* Top bar */}
                <header className="bg-white/80 backdrop-blur-sm shadow-sm h-16 flex items-center px-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-lg text-gray-600 hover:bg-white/50 focus:outline-none transition-colors"
                    >
                        <MdMenu className="text-2xl" />
                    </button>
                    <div className="ml-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                        {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout; 