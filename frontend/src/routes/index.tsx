import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Lazy loading pages for better performance
const LandingPage = lazy(() => import('../pages/LandingPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const GeneratePage = lazy(() => import('../pages/GeneratePage'));
const LibraryPage = lazy(() => import('../pages/LibraryPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));

// Simple loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-slate-400 font-bold animate-pulse">Chargement...</p>
    </div>
  </div>
);

const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LandingPage />
      </Suspense>
    ),
  },
  
  // Auth Routes
  {
    element: <AuthLayout />,
    children: [
      { 
        path: '/login', 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LoginPage />
          </Suspense>
        ) 
      },
      { 
        path: '/register', 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RegisterPage />
          </Suspense>
        ) 
      },
    ]
  },

  // App Routes (Protected - simplified for MVP)
  {
    element: <MainLayout />,
    children: [
      { 
        path: '/dashboard', 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DashboardPage />
          </Suspense>
        ) 
      },
      { 
        path: '/generate', 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <GeneratePage />
          </Suspense>
        ) 
      },
      { 
        path: '/generate/:id', 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <GeneratePage />
          </Suspense>
        ) 
      },
      { 
        path: '/library', 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LibraryPage />
          </Suspense>
        ) 
      },
      { 
        path: '/profile', 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ProfilePage />
          </Suspense>
        ) 
      },
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
