import { create } from 'zustand';
import type { LearningProgress } from '../types';
import { useAuthStore } from './authStore';
import { api } from '../lib/api';

interface ProgressState {
  progress: Record<string, LearningProgress>;
  isLoading: boolean;
  error: string | null;
  getProgress: (language: string) => LearningProgress | undefined;
  fetchProgress: () => Promise<void>;
  fetchProgressByLanguage: (language: string) => Promise<LearningProgress | undefined>;
  updateProgress: (language: string, updates: Partial<LearningProgress>) => void;
  initializeProgress: (language: string) => void;
  addXP: (language: string, amount: number) => Promise<void>;
  updateVocabulary: (language: string, learned: number) => Promise<void>;
  updateGrammar: (language: string, completed: number, accuracy: number) => Promise<void>;
  updateSpeaking: (language: string, score: number) => Promise<void>;
  updateListening: (language: string, score: number) => Promise<void>;
}

export const useProgressStore = create<ProgressState>()((set, get) => ({
  progress: {},
  isLoading: false,
  error: null,

  getProgress: (language: string) => {
    const user = useAuthStore.getState().user;
    if (!user) return undefined;
    return get().progress[`${user.id}_${language}`];
  },

  fetchProgress: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const progressList = await api.getProgress();
      const progressMap: Record<string, LearningProgress> = {};
      progressList.forEach((p: LearningProgress) => {
        progressMap[`${user.id}_${p.language}`] = p;
      });
      set({ progress: progressMap, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || '获取学习进度失败', isLoading: false });
    }
  },

  fetchProgressByLanguage: async (language: string) => {
    const user = useAuthStore.getState().user;
    if (!user) return undefined;

    try {
      const progress = await api.getProgressByLanguage(language);
      set((state) => ({
        progress: {
          ...state.progress,
          [`${user.id}_${language}`]: progress,
        },
      }));
      return progress;
    } catch (error: any) {
      console.error('获取语言进度失败:', error);
      return undefined;
    }
  },

  initializeProgress: (language: string) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const key = `${user.id}_${language}`;
    const existing = get().progress[key];

    if (!existing) {
      set((state) => ({
        progress: {
          ...state.progress,
          [key]: {
            userId: user.id,
            language,
            level: 'A1',
            vocabulary: { learned: 0, total: 100, masteryRate: 0 },
            grammar: { completed: 0, total: 20, accuracy: 0 },
            speaking: { practiced: 0, averageScore: 0 },
            listening: { practiced: 0, averageScore: 0 },
            lastStudyDate: new Date().toISOString(),
            xp: 0,
          },
        },
      }));
    }
  },

  updateProgress: (language: string, updates: Partial<LearningProgress>) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const key = `${user.id}_${language}`;
    set((state) => ({
      progress: {
        ...state.progress,
        [key]: {
          ...state.progress[key],
          ...updates,
        } as LearningProgress,
      },
    }));
  },

  addXP: async (language: string, amount: number) => {
    try {
      const updated = await api.addProgressXP(language, amount);
      const user = useAuthStore.getState().user;
      if (user) {
        set((state) => ({
          progress: {
            ...state.progress,
            [`${user.id}_${language}`]: updated,
          },
        }));
      }
    } catch (error: any) {
      console.error('添加XP失败:', error);
    }
  },

  updateVocabulary: async (language: string, learned: number) => {
    try {
      const updated = await api.updateVocabulary(language, learned);
      const user = useAuthStore.getState().user;
      if (user) {
        set((state) => ({
          progress: {
            ...state.progress,
            [`${user.id}_${language}`]: updated,
          },
        }));
      }
    } catch (error: any) {
      console.error('更新词汇进度失败:', error);
    }
  },

  updateGrammar: async (language: string, completed: number, accuracy: number) => {
    try {
      const updated = await api.updateGrammar(language, completed, accuracy);
      const user = useAuthStore.getState().user;
      if (user) {
        set((state) => ({
          progress: {
            ...state.progress,
            [`${user.id}_${language}`]: updated,
          },
        }));
      }
    } catch (error: any) {
      console.error('更新语法进度失败:', error);
    }
  },

  updateSpeaking: async (language: string, score: number) => {
    try {
      const updated = await api.updateSpeaking(language, score);
      const user = useAuthStore.getState().user;
      if (user) {
        set((state) => ({
          progress: {
            ...state.progress,
            [`${user.id}_${language}`]: updated,
          },
        }));
      }
    } catch (error: any) {
      console.error('更新口语进度失败:', error);
    }
  },

  updateListening: async (language: string, score: number) => {
    try {
      const updated = await api.updateListening(language, score);
      const user = useAuthStore.getState().user;
      if (user) {
        set((state) => ({
          progress: {
            ...state.progress,
            [`${user.id}_${language}`]: updated,
          },
        }));
      }
    } catch (error: any) {
      console.error('更新听力进度失败:', error);
    }
  },
}));
