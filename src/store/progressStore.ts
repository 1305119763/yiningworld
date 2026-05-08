import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LearningProgress } from '../types';
import { useAuthStore } from './authStore';

interface ProgressState {
  progress: Record<string, LearningProgress>;
  getProgress: (language: string) => LearningProgress | undefined;
  updateProgress: (language: string, updates: Partial<LearningProgress>) => void;
  initializeProgress: (language: string) => void;
  addXP: (language: string, amount: number) => void;
  updateVocabulary: (language: string, learned: number) => void;
  updateGrammar: (language: string, completed: number, accuracy: number) => void;
  updateSpeaking: (language: string, score: number) => void;
  updateListening: (language: string, score: number) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: {},

      getProgress: (language: string) => {
        const user = useAuthStore.getState().user;
        if (!user) return undefined;
        return get().progress[`${user.id}_${language}`];
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

      addXP: (language: string, amount: number) => {
        const key = Object.keys(get().progress).find(k => k.endsWith(`_${language}`));
        if (key) {
          const currentProgress = get().progress[key];
          get().updateProgress(language, {
            xp: currentProgress.xp + amount,
            lastStudyDate: new Date().toISOString(),
          });
        }
      },

      updateVocabulary: (language: string, learned: number) => {
        const key = Object.keys(get().progress).find(k => k.endsWith(`_${language}`));
        if (key) {
          const currentProgress = get().progress[key];
          const totalLearned = currentProgress.vocabulary.learned + learned;
          const masteryRate = (totalLearned / currentProgress.vocabulary.total) * 100;
          get().updateProgress(language, {
            vocabulary: {
              ...currentProgress.vocabulary,
              learned: totalLearned,
              masteryRate,
            },
          });
        }
      },

      updateGrammar: (language: string, completed: number, accuracy: number) => {
        const key = Object.keys(get().progress).find(k => k.endsWith(`_${language}`));
        if (key) {
          const currentProgress = get().progress[key];
          const newAccuracy = (currentProgress.grammar.accuracy * currentProgress.grammar.completed + accuracy) / (currentProgress.grammar.completed + completed);
          get().updateProgress(language, {
            grammar: {
              ...currentProgress.grammar,
              completed: currentProgress.grammar.completed + completed,
              accuracy: newAccuracy,
            },
          });
        }
      },

      updateSpeaking: (language: string, score: number) => {
        const key = Object.keys(get().progress).find(k => k.endsWith(`_${language}`));
        if (key) {
          const currentProgress = get().progress[key];
          const newAverage = (currentProgress.speaking.averageScore * currentProgress.speaking.practiced + score) / (currentProgress.speaking.practiced + 1);
          get().updateProgress(language, {
            speaking: {
              practiced: currentProgress.speaking.practiced + 1,
              averageScore: newAverage,
            },
          });
        }
      },

      updateListening: (language: string, score: number) => {
        const key = Object.keys(get().progress).find(k => k.endsWith(`_${language}`));
        if (key) {
          const currentProgress = get().progress[key];
          const newAverage = (currentProgress.listening.averageScore * currentProgress.listening.practiced + score) / (currentProgress.listening.practiced + 1);
          get().updateProgress(language, {
            listening: {
              practiced: currentProgress.listening.practiced + 1,
              averageScore: newAverage,
            },
          });
        }
      },
    }),
    {
      name: 'progress-storage',
    }
  )
);
