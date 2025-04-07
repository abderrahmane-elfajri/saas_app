import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { MdPerson, MdCalendarToday, MdTrendingUp, MdAccessTime, MdCheckCircle, MdCancel } from 'react-icons/md';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        totalClients: 0,
        totalAppointments: 0,
        upcomingAppointments: 0,
        completedAppointments: 0
    });
    const [todayAppointments, setTodayAppointments] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/dashboard', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch dashboard data');
            const data = await response.json();
            setStats(data.stats);
            setTodayAppointments(data.todayAppointments);
            setUpcomingAppointments(data.upcomingAppointments);
            setError(null);
        } catch (err) {
            setError('Error loading dashboard data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ icon: Icon, title, value, gradientFrom, gradientTo }) => (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
                <div className="flex items-center">
                    <div className={`flex-shrink-0 rounded-full p-3 bg-gradient-to-r ${gradientFrom} ${gradientTo}`}>
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">{value}</h3>
                        <p className="text-sm text-gray-500">{title}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const AppointmentCard = ({ appointment, isToday }) => (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                            <MdPerson className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-3">
                            <h4 className="text-sm font-medium text-gray-900">{appointment.client?.name}</h4>
                            <p className="text-xs text-gray-500">{appointment.service}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                            {new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                            appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                        }`}>
                            {appointment.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="space-y-6">
                {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Statistics Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={MdPerson}
                        title="Total Clients"
                        value={stats.totalClients}
                        gradientFrom="from-blue-600"
                        gradientTo="to-blue-400"
                    />
                    <StatCard
                        icon={MdCalendarToday}
                        title="Total Appointments"
                        value={stats.totalAppointments}
                        gradientFrom="from-green-600"
                        gradientTo="to-green-400"
                    />
                    <StatCard
                        icon={MdTrendingUp}
                        title="Upcoming Appointments"
                        value={stats.upcomingAppointments}
                        gradientFrom="from-blue-500"
                        gradientTo="to-green-500"
                    />
                    <StatCard
                        icon={MdCheckCircle}
                        title="Completed Appointments"
                        value={stats.completedAppointments}
                        gradientFrom="from-green-500"
                        gradientTo="to-blue-500"
                    />
                </div>

                {/* Appointments Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Today's Appointments */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
                        <div className="p-6 border-b border-gray-200/50">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-medium bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                    Today's Appointments
                                </h2>
                                <span className="bg-gradient-to-r from-blue-500 to-green-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                                    {todayAppointments.length} appointments
                                </span>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            {todayAppointments.length === 0 ? (
                                <p className="text-gray-500 text-center">No appointments scheduled for today</p>
                            ) : (
                                todayAppointments.map(appointment => (
                                    <AppointmentCard
                                        key={appointment.id}
                                        appointment={appointment}
                                        isToday={true}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    {/* Upcoming Appointments */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
                        <div className="p-6 border-b border-gray-200/50">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-medium bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                    Upcoming Appointments
                                </h2>
                                <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                                    Next 7 days
                                </span>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            {upcomingAppointments.length === 0 ? (
                                <p className="text-gray-500 text-center">No upcoming appointments</p>
                            ) : (
                                upcomingAppointments.map(appointment => (
                                    <AppointmentCard
                                        key={appointment.id}
                                        appointment={appointment}
                                        isToday={false}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Weekly Schedule Overview */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
                    <div className="p-6 border-b border-gray-200/50">
                        <h2 className="text-lg font-medium bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                            Weekly Schedule Overview
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-7 gap-4">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
                                const today = new Date();
                                const currentDay = today.getDay();
                                const isToday = index === currentDay;

                                return (
                                    <div
                                        key={day}
                                        className={`p-4 rounded-lg text-center transition-all ${
                                            isToday
                                                ? 'bg-gradient-to-r from-blue-500 to-green-500 shadow-md'
                                                : 'bg-white/50 hover:bg-white/80'
                                        }`}
                                    >
                                        <p className={`text-sm font-medium ${isToday ? 'text-white' : 'text-gray-900'}`}>
                                            {day}
                                        </p>
                                        <p className={`text-2xl font-bold mt-1 ${isToday ? 'text-white' : 'text-gray-900'}`}>
                                            {today.getDate() + (index - currentDay)}
                                        </p>
                                        <p className={`text-xs mt-1 ${isToday ? 'text-white' : 'text-gray-500'}`}>
                                            {Math.floor(Math.random() * 8)} appt
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Dashboard; 