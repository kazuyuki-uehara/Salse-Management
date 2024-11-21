import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role === 'admin' && !location.pathname.includes('/admin')) {
    return <Navigate to="/admin" replace />;
  }

  if (user.role === 'tenant' && location.pathname.includes('/admin')) {
    return <Navigate to="/tenant" replace />;
  }

  return <Outlet />;
}