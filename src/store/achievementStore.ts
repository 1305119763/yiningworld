import { create } from 'zustand';
import type { Achievement } from '../types';
import { useAuthStore } from './authStore';
import { api } from '../lib/api';

const achievements: Achievement[] = [
  {
    id: 'first_step',
    title: '初次启程',
    description: '完成你的第一课学习',
    icon: 'Footprints',
    category: 'learning',
    requirement: { type: 'lessons', value: 1 },
    xpReward: 50,
  },
  {
    id: 'vocab_master_50',
    title: '词汇达人',
    description: '学习掌握50个单词',
    icon: 'BookOpen',
    category: 'mastery',
    requirement: { type: 'vocabulary', value: 50 },
    xpReward: 100,
  },
  {
    id: 'streak_7',
    title: '坚持一周',
    description: '连续学习7天',
    icon: 'Flame',
    category: 'streak',
    requirement: { type: 'streak', value: 7 },
    xpReward: 200,
  },
  {
    id: 'streak_30',
    title: '月度坚持者',
    description: '连续学习30天',
    icon: 'Trophy',
    category: 'streak',
    requirement: { type: 'streak', value: 30 },
    xpReward: 500,
  },
  {
    id: 'perfect_grammar',
    title: '语法大师',
    description: '语法练习正确率达到100%',
    icon: 'GraduationCap',
    category: 'mastery',
    requirement: { type: 'grammar_accuracy', value: 100 },
    xpReward: 150,
  },
  {
    id: 'speaking_star',
    title: '口语之星',
    description: '完成10次口语练习',
    icon: 'Mic',
    category: 'learning',
    requirement: { type: 'speaking', value: 10 },
    xpReward: 120,
  },
  {
    id: 'listening_pro',
    title: '听力专家',
    description: '完成20次听力训练',
    icon: 'Headphones',
    category: 'learning',
    requirement: { type: 'listening', value: 20 },
    xpReward: 150,
  },
  {
    id: 'xp_1000',
    title: '千经验达成',
    description: '累计获得1000点经验',
    icon: 'Star',
    category: 'learning',
    requirement: { type: 'total_xp', value: 1000 },
    xpReward: 300,
  },
  {
    id: 'social_butterfly',
    title: '社交达人',
    description: '在社区发布5篇帖子',
    icon: 'Users',
    category: 'social',
    requirement: { type: 'posts', value: 5 },
    xpReward: 100,
  },
  {
    id: 'helper',
    title: '互助天使',
    description: '回复其他学习者10次',
    icon: 'Heart',
    category: 'social',
    requirement: { type: 'comments', value: 10 },
    xpReward: 100,
  },
];

interface AchievementState {
  achievements: Achievement[];
  unlockedAchievements: Record<string, string[]>;
  myAchievements: string[];
  isLoading: boolean;
  error: string | null;
  fetchMyAchievements: () => Promise<void>;
  checkAchievements: (stats: {
    lessonsCompleted: number;
    vocabularyLearned: number;
    streak: number;
    grammarAccuracy: number;
    speakingPracticed: number;
    listeningPracticed: number;
    totalXP: number;
    posts: number;
    comments: number;
  }) => Promise<Achievement[]>;
  getUnlockedAchievements: (userId: string) => Achievement[];
  isAchievementUnlocked: (userId: string, achievementId: string) => boolean;
}

export const useAchievementStore = create<AchievementState>()((set, get) => ({
  achievements,
  unlockedAchievements: {},
  myAchievements: [],
  isLoading: false,
  error: null,

  fetchMyAchievements: async () => {
    set({ isLoading: true, error: null });
    try {
      const { achievements } = await api.getMyAchievements();
      set({ myAchievements: achievements.map((a: any) => a.achievementId), isLoading: false });
    } catch (error: any) {
      set({ error: error.message || '获取成就失败', isLoading: false });
    }
  },

  checkAchievements: async (stats) => {
    const user = useAuthStore.getState().user;
    if (!user) return [];

    try {
      const { newAchievements } = await api.checkAchievements(stats);
      
      if (newAchievements && newAchievements.length > 0) {
        set((state) => ({
          myAchievements: [...state.myAchievements, ...newAchievements.map((a: any) => a.id)],
        }));

        const authStore = useAuthStore.getState();
        if (authStore.user) {
          const totalReward = newAchievements.reduce((sum: number, a: any) => sum + a.xpReward, 0);
          await authStore.addXP(totalReward);
        }
      }

      return newAchievements || [];
    } catch (error: any) {
      console.error('检查成就失败:', error);
      return [];
    }
  },

  getUnlockedAchievements: (userId: string) => {
    const unlocked = get().unlockedAchievements[userId] || [];
    return achievements.filter((a) => unlocked.includes(a.id));
  },

  isAchievementUnlocked: (userId: string, achievementId: string) => {
    const unlocked = get().unlockedAchievements[userId] || [];
    return unlocked.includes(achievementId);
  },
}));
