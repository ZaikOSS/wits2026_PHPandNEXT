"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  adminUsername: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUsername, setAdminUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedAuth = localStorage.getItem("wits_admin_auth");
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setAdminUsername(authData.username);
    }
    setLoading(false);
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        "http://localhost/witsReact/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setAdminUsername(data.admin_username);
        localStorage.setItem(
          "wits_admin_auth",
          JSON.stringify({ username: data.admin_username })
        );
        return true;
      } else {
        console.error("Login failed:", data.message);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost/witsReact/api/auth/logout", {
        method: "POST",
        headers: {
          "X-API-Key":
            "b0b4e0d7c9f8a1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6",
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    setIsAuthenticated(false);
    setAdminUsername(null);
    localStorage.removeItem("wits_admin_auth");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, adminUsername, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
