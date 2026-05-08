import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface StoredUser extends User {
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addXP: (amount: number) => void;
  updateStreak: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: StoredUser) => u.email === email && u.password === password);
        
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({ user: userWithoutPassword, isAuthenticated: true });
          return true;
        }
        return false;
      },

      register: async (email: string, username: string, password: string) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.find((u: StoredUser) => u.email === email)) {
          return false;
        }

        const newUser: User = {
          id: generateId(),
          email,
          username,
          nativeLanguage: 'zh',
          learningLanguages: [],
          currentLevel: {},
          totalXP: 0,
          streak: 0,
          joinedAt: new Date().toISOString(),
          achievements: [],
        };

        users.push({ ...newUser, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        set({ user: newUser, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          const updatedUser = { ...user, ...updates };
          set({ user: updatedUser });
          
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const index = users.findIndex((u: StoredUser) => u.id === user.id);
          if (index !== -1) {
            users[index] = { ...users[index], ...updates };
            localStorage.setItem('users', JSON.stringify(users));
          }
        }
      },

      addXP: (amount: number) => {
        const { user } = get();
        if (user) {
          get().updateUser({ totalXP: user.totalXP + amount });
        }
      },

      updateStreak: () => {
        const { user } = get();
        if (user) {
          const lastStudy = localStorage.getItem(`lastStudy_${user.id}`);
          const today = new Date().toDateString();
          
          if (lastStudy !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastStudy === yesterday.toDateString()) {
              get().updateUser({ streak: user.streak + 1 });
            } else if (lastStudy !== today) {
              get().updateUser({ streak: 1 });
            }
            
            localStorage.setItem(`lastStudy_${user.id}`, today);
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
