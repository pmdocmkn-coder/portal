import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';

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
import ActivityLog from './pages/admin/ActivityLog';
import AnalyticsReport from './pages/admin/AnalyticsReport';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<PublicPortal />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="portals" element={<PortalsManager />} />
            <Route path="categories" element={<Categories />} />
            <Route path="appearance" element={<AppearanceSettings />} />
            <Route path="sliders" element={<HeroSliders />} />
            <Route path="users" element={<Users />} />
            <Route path="activity" element={<ActivityLog />} />
            <Route path="analytics" element={<AnalyticsReport />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
