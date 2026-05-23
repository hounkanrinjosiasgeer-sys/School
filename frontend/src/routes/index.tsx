import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import GeneratePage from '../pages/GeneratePage';
import LibraryPage from '../pages/LibraryPage';
import ProfilePage from '../pages/ProfilePage';

const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <LandingPage />,
  },
  
  // Auth Routes
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ]
  },

  // App Routes (Protected - simplified for MVP)
  {
    element: <MainLayout />,
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/generate', element: <GeneratePage /> },
      { path: '/generate/:id', element: <GeneratePage /> },
      { path: '/library', element: <LibraryPage /> },
      { path: '/profile', element: <ProfilePage /> },
    ]
  },

  // 404
  {
    path: '*',
    element: <Navigate to="/" replace />,
  }
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
