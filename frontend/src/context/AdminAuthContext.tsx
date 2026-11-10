"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  roles: string[];
  must_change_password?: boolean;
  permissions?: string[];
  last_login_at?: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: AdminUser) => void;
  updateUser: (userUpdates: Partial<AdminUser>) => void;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const TOKEN_KEY = "tci_admin_token";
const USER_KEY = "tci_admin_user";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedToken = localStorage.getItem(TOKEN_KEY);
        const savedUser = localStorage.getItem(USER_KEY);
        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        }
      } catch {
        // Ignore storage errors
      } finally {
        setIsLoading(false);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const login = (newToken: string, newUser: AdminUser) => {
    setToken(newToken);
    setUser(newUser);
    try {
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    } catch {
      // Ignore storage errors
    }
  };

  const updateUser = (userUpdates: Partial<AdminUser>) => {
    if (!user) return;
    const updated = { ...user, ...userUpdates };
    setUser(updated);
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const hasRole = (role: string) => {
    if (!user || !user.roles) return false;
    return user.roles.includes("super_admin") || user.roles.includes(role);
  };

  const hasPermission = (permission: string) => {
    if (!user) return false;
    if (user.roles?.includes("super_admin")) return true;
    if (user.permissions?.includes(permission) || user.permissions?.includes("*")) return true;
    return false;
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        updateUser,
        logout,
        isAuthenticated: !!token && !!user,
        hasRole,
        hasPermission,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
