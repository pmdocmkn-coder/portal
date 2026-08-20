import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/guards/ProtectedRoute';

// Pages
import PublicPortal from './pages/PublicPortal';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import PortalsManager from './pages/admin/PortalsManager';
import Categories from './pages/admin/Categories';
import AppearanceSettings from './pages/admin/AppearanceSettings';
import HeroSliders from './pages/admin/HeroSliders';
import Users from './pages/admin/Users';
import PermissionManager from './pages/admin/PermissionManager';
import ActivityLog from './pages/admin/ActivityLog';
import AnalyticsReport from './pages/admin/AnalyticsReport';
import Profile from './pages/admin/Profile';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<PublicPortal />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
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
