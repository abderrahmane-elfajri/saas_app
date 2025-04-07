import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Clients from './pages/Clients';
import Schedule from './pages/Schedule';
import Profile from './pages/Profile';
import { useAuth } from './context/AuthContext';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/appointments',
    element: <Appointments />,
  },
  {
    path: '/clients',
    element: <Clients />,
  },
  {
    path: '/schedule',
    element: <Schedule />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/',
    element: <Dashboard />,
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
