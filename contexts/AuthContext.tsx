'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  address: string;
  role: 'employer' | 'freelancer';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  connectWallet: () => Promise<void>;
  disconnect: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = useCallback(async () => {
    setIsLoading(true);
    try {
      // Mock wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({
        address: '0x' + Math.random().toString(16).slice(2, 42),
        role: Math.random() > 0.5 ? 'employer' : 'freelancer',
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, connectWallet, disconnect }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}