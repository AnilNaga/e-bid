// src/components/auth/ProtectedRoute.tsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
  onlyAdmin?: boolean;
  onlyUser?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, onlyAdmin, onlyUser }) => {
  const [user, setUser] = useState<any>(null);
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);



  const [admn,setadmn]=useState()
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    const storedAdmin = localStorage.getItem('adminData');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedAdmin) {
        setadmn(JSON.parse(storedAdmin));
        console.log("admmmmmmmmmmmmmmmmmmmmmmmmmmm",admn,{admn})
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    const storedAdmin = localStorage.getItem('adminData');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
     
    }

    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
      
    }

    setLoading(false); // mark done loading
  }, []);

  if (loading) {
    return <div>Loading...</div>; // optional spinner
  }

  // Redirect if no one is logged in
  if (!user && !admin) {
    return <Navigate to="/" replace />;
  }

  // Admin-only route check
  if (onlyAdmin && !admin) {
    return <Navigate to="/not-authorized" replace />;
  }

  // User-only route check
  if (onlyUser && !user) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
