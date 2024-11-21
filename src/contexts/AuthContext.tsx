import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { mockTenants } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (userId: string, password: string) => boolean;
  logout: () => void;
  addUser: (user: Omit<User, 'id'> & { id: string }) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const initialUsers: User[] = [
  { id: 'tenantA', name: 'テナントA', tenantId: '1', role: 'tenant', password: 'A' },
  { id: 'tenantB', name: 'テナントB', tenantId: '2', role: 'tenant', password: 'B' },
  { id: 'tenantC', name: 'テナントC', tenantId: '3', role: 'tenant', password: 'C' },
  { id: 'admin', name: '管理者', tenantId: '', role: 'admin', password: 'admin' },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : initialUsers;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const login = (userId: string, password: string): boolean => {
    const user = users.find(u => u.id === userId && u.password === password);
    if (user) {
      setUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addUser = (newUser: Omit<User, 'id'> & { id: string }) => {
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(u => 
      u.id === updatedUser.id ? updatedUser : u
    ));
    if (user?.id === updatedUser.id) {
      setUser(updatedUser);
    }
  };

  const deleteUser = (userId: string) => {
    if (userId === 'admin') {
      alert('管理者アカウントは削除できません');
      return;
    }
    setUsers(prev => prev.filter(u => u.id !== userId));
    if (user?.id === userId) {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      users, 
      login, 
      logout,
      addUser,
      updateUser,
      deleteUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}