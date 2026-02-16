"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  enrolledCourses: string[];
  completedLessons: string[];
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    theme: "dark" | "light";
  };
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API Base URL - use environment variable or default to production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored JWT token
    const token = localStorage.getItem("auth-token");
    if (token) {
      // Verify token is still valid by fetching user profile
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      // Decode JWT to get user info (basic client-side decode)
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      // Set user from token payload
      setUser({
        id: payload.id,
        email: payload.email,
        name: payload.name,
        enrolledCourses: [],
        completedLessons: [],
        preferences: {
          notifications: true,
          emailUpdates: true,
          theme: "dark",
        },
      });
    } catch (error) {
      console.error("Failed to decode token:", error);
      localStorage.removeItem("auth-token");
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Signup failed:", error);
        return false;
      }

      const data = await response.json();
      
      // Store JWT token
      localStorage.setItem("auth-token", data.token);
      
      // Set user with extended properties
      setUser({
        ...data.user,
        enrolledCourses: [],
        completedLessons: [],
        preferences: {
          notifications: true,
          emailUpdates: true,
          theme: "dark",
        },
      });
      
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Login failed:", error);
        return false;
      }

      const data = await response.json();
      
      // Store JWT token
      localStorage.setItem("auth-token", data.token);
      
      // Set user with extended properties
      setUser({
        ...data.user,
        enrolledCourses: [],
        completedLessons: [],
        preferences: {
          notifications: true,
          emailUpdates: true,
          theme: "dark",
        },
      });
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    // In production: Call API to update user profile on server
    // For now, just update local state
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
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
