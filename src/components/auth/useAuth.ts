// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';

interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  [key: string]: any;
}

interface AdminData {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  [key: string]: any;
}

// For Admin Login Session
export function useAdminAuth() {
  const [admins, setAdmins] = useState<AdminData | null>(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminData');
    if (storedAdmin) {
      setAdmins(JSON.parse(storedAdmin));
    }
  }, []);
  useEffect(()=>{
    console.log("1111111111111111111111111111111",admins)
    console.log("1111111111111111111111111111111",admins)
  })

  const isLoggedIn = !!admins;

  const logout = () => {
    localStorage.removeItem('adminData');
    setAdmins(null);
    window.location.href = '/login';
  };

  return { admins, isLoggedIn, logout };
}

// For User Login Session
export function useAuth() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(()=>{
    console.log("1111111111111111111111111111111",{user})
    console.log("1111111111111111111111111111111",{user})
  })

  const isLoggedIn = !!user;

  const logout = () => {
    localStorage.removeItem('userData');
    setUser(null);
    window.location.href = '/login';
  };

  return { user, isLoggedIn, logout };

  
}

