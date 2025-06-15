import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'professional';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('clinictime_token');
    const userData = localStorage.getItem('clinictime_user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const mockUser: User = {
        id: '1',
        email,
        name: email === 'admin@clinictime.com' ? 'Administrator' : 'Dr. João Silva',
        role: email === 'admin@clinictime.com' ? 'admin' : 'professional'
      };

      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email === 'admin@clinictime.com' && password === 'admin123') {
        localStorage.setItem('clinictime_token', 'mock-token');
        localStorage.setItem('clinictime_user', JSON.stringify(mockUser));
        setUser(mockUser);
      } else if (email === 'doctor@clinictime.com' && password === 'doctor123') {
        const doctorUser = { ...mockUser, role: 'professional' as const };
        localStorage.setItem('clinictime_token', 'mock-token');
        localStorage.setItem('clinictime_user', JSON.stringify(doctorUser));
        setUser(doctorUser);
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('clinictime_token');
    localStorage.removeItem('clinictime_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
