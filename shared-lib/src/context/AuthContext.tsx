import React, { createContext, useContext, useState } from "react";
import { User, Role } from "../types";

interface AuthContextValue {
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  hasRole: (role: Role) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const MOCK_USERS: User[] = [
  {
    id: "u1",
    name: "Dr. Priya Sharma",
    email: "priya@apollo.com",
    role: "doctor",
    tenantId: "1",
  },
  {
    id: "u2",
    name: "Rajan Mehta",
    email: "rajan@apollo.com",
    role: "admin",
    tenantId: "1",
  },
  {
    id: "u3",
    name: "Sneha Iyer",
    email: "sneha@apollo.com",
    role: "receptionist",
    tenantId: "1",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(MOCK_USERS[0]);

  const login = (user: User) => setCurrentUser(user);
  const logout = () => setCurrentUser(null);

  const hasRole = (role: Role): boolean => {
    return currentUser?.role === role;
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
