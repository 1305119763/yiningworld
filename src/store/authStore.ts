import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';
import { api } from '../lib/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => Promise<void>;
  addXP: (amount: number) => Promise<void>;
  updateStreak: () => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const { token, user } = await api.login(email, password);
          api.setToken(token);
          set({ user, isAuthenticated: true, isLoading: false });
          return true;
        } catch (error: any) {
          set({ error: error.message || '登录失败', isLoading: false });
          return false;
        }
      },

      register: async (email: string, username: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const { token, user } = await api.register(email, username, password);
          api.setToken(token);
          set({ user, isAuthenticated: true, isLoading: false });
          return true;
        } catch (error: any) {
          set({ error: error.message || '注册失败', isLoading: false });
          return false;
        }
      },

      logout: () => {
        api.clearToken();
        set({ user: null, isAuthenticated: false, error: null });
      },

      updateUser: async (updates: Partial<User>) => {
        try {
          const { user } = await api.updateMe(updates);
          set({ user });
        } catch (error: any) {
          console.error('更新用户失败:', error);
        }
      },

      addXP: async (amount: number) => {
        try {
          const { user } = await api.addXP(amount);
          set({ user });
        } catch (error: any) {
          console.error('添加XP失败:', error);
        }
      },

      updateStreak: async () => {
        try {
          const { user } = await api.updateStreak();
          set({ user });
        } catch (error: any) {
          console.error('更新连续学习天数失败:', error);
        }
      },

      loadUser: async () => {
        const token = api.getToken();
        if (!token) return;

        set({ isLoading: true });
        try {
          const { user } = await api.getMe();
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
          api.clearToken();
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
