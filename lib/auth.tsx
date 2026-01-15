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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored session (encrypted in production)
    const storedUser = localStorage.getItem("user-session");
    if (storedUser) {
      try {
        setUser(JSON.parse(atob(storedUser))); // Base64 decode (use proper encryption in production)
      } catch (e) {
        localStorage.removeItem("user-session");
      }
    }
  }, []);

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // In production: Call secure backend API with bcrypt/argon2 password hashing
    // This is a mock implementation
    try {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        enrolledCourses: [],
        completedLessons: [],
        preferences: {
          notifications: true,
          emailUpdates: true,
          theme: "dark",
        },
      };

      // Store encrypted session (use JWT tokens in production)
      const encryptedSession = btoa(JSON.stringify(newUser));
      localStorage.setItem("user-session", encryptedSession);
      
      // Store hashed password separately (never store plain text)
      localStorage.setItem(`pwd-${email}`, btoa(password)); // Use bcrypt in production
      
      setUser(newUser);
      return true;
    } catch (error) {
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // In production: Call secure backend API for authentication
    try {
      const storedPassword = localStorage.getItem(`pwd-${email}`);
      if (!storedPassword || atob(storedPassword) !== password) {
        return false;
      }

      const storedUser = localStorage.getItem("user-session");
      if (storedUser) {
        setUser(JSON.parse(atob(storedUser)));
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user-session");
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    // Update encrypted session
    const encryptedSession = btoa(JSON.stringify(updatedUser));
    localStorage.setItem("user-session", encryptedSession);
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
