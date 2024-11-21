import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SalesProvider } from './contexts/SalesContext';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/admin/Dashboard';
import { TenantDashboard } from './pages/tenant/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './layouts/Layout';

export default function App() {
  return (
    <AuthProvider>
      <SalesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/tenant" element={<TenantDashboard />} />
                <Route path="/" element={<Navigate to="/tenant" replace />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </SalesProvider>
    </AuthProvider>
  );
}