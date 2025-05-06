// src/components/auth/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/auth/useAuth';
import { useAdminAuth } from '../components/auth/useAuth';

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[]; // 'ADMIN' or 'USER'
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const { admins } = useAdminAuth();

  const role = admins?.role || user?.role;

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
