import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/guards/ProtectedRoute';

// Public pages - loaded eagerly
import PublicPortal from './pages/PublicPortal';

// Admin pages - lazy loaded (not downloaded by public visitors)
const AdminLogin = React.lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = React.lazy(() => import('./pages/admin/AdminLayout'));
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const PortalsManager = React.lazy(() => import('./pages/admin/PortalsManager'));
const Categories = React.lazy(() => import('./pages/admin/Categories'));
const AppearanceSettings = React.lazy(() => import('./pages/admin/AppearanceSettings'));
const HeroSliders = React.lazy(() => import('./pages/admin/HeroSliders'));
const Users = React.lazy(() => import('./pages/admin/Users'));
const PermissionManager = React.lazy(() => import('./pages/admin/PermissionManager'));
const ActivityLog = React.lazy(() => import('./pages/admin/ActivityLog'));
const AnalyticsReport = React.lazy(() => import('./pages/admin/AnalyticsReport'));
const Profile = React.lazy(() => import('./pages/admin/Profile'));

const AdminLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-[#1B3A6B] rounded-full animate-spin" />
      <p className="text-slate-500 text-sm font-medium">Memuat...</p>
    </div>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<PublicPortal />} />
          <Route path="/admin/login" element={<Suspense fallback={<AdminLoadingFallback />}><AdminLogin /></Suspense>} />
          <Route path="/admin" element={<Suspense fallback={<AdminLoadingFallback />}><ProtectedRoute><AdminLayout /></ProtectedRoute></Suspense>}>
            <Route index element={<ProtectedRoute pageKey="dashboard"><Dashboard /></ProtectedRoute>} />
            <Route path="portals" element={<ProtectedRoute pageKey="portals"><PortalsManager /></ProtectedRoute>} />
            <Route path="categories" element={<ProtectedRoute pageKey="categories"><Categories /></ProtectedRoute>} />
            <Route path="appearance" element={<ProtectedRoute pageKey="appearance"><AppearanceSettings /></ProtectedRoute>} />
            <Route path="sliders" element={<ProtectedRoute pageKey="sliders"><HeroSliders /></ProtectedRoute>} />
            <Route path="users" element={<ProtectedRoute pageKey="users"><Users /></ProtectedRoute>} />
            <Route path="permissions" element={<ProtectedRoute pageKey="permissions"><PermissionManager /></ProtectedRoute>} />
            <Route path="activity" element={<ProtectedRoute pageKey="activity"><ActivityLog /></ProtectedRoute>} />
            <Route path="analytics" element={<ProtectedRoute pageKey="dashboard"><AnalyticsReport /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute pageKey="profile"><Profile /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
