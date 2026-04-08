// Mock authentication utilities
export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export const mockUsers: Record<string, User> = {
  'student@lms.com': {
    id: '1',
    name: 'Alex Johnson',
    email: 'student@lms.com',
    role: 'student',
  },
  'teacher@lms.com': {
    id: '2',
    name: 'Dr. Sarah Smith',
    email: 'teacher@lms.com',
    role: 'teacher',
  },
  'admin@lms.com': {
    id: '3',
    name: 'Admin User',
    email: 'admin@lms.com',
    role: 'admin',
  },
};

export const login = (email: string, password: string): User | null => {
  // Mock authentication - in real app, this would call an API
  const user = mockUsers[email];
  if (user && password === 'password') {
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};