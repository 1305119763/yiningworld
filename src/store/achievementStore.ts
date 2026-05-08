import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Achievement } from '../types';
import { useAuthStore } from './authStore';

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
  checkAchievements: (userId: string, stats: {
    lessonsCompleted: number;
    vocabularyLearned: number;
    streak: number;
    grammarAccuracy: number;
    speakingPracticed: number;
    listeningPracticed: number;
    totalXP: number;
    posts: number;
    comments: number;
  }) => Achievement[];
  getUnlockedAchievements: (userId: string) => Achievement[];
  isAchievementUnlocked: (userId: string, achievementId: string) => boolean;
}

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      achievements,
      unlockedAchievements: {},

      checkAchievements: (userId: string, stats) => {
        const unlocked = get().unlockedAchievements[userId] || [];
        const newUnlocked: Achievement[] = [];

        achievements.forEach((achievement) => {
          if (unlocked.includes(achievement.id)) return;

          const { type, value } = achievement.requirement;
          let conditionMet = false;

          switch (type) {
            case 'lessons':
              conditionMet = stats.lessonsCompleted >= value;
              break;
            case 'vocabulary':
              conditionMet = stats.vocabularyLearned >= value;
              break;
            case 'streak':
              conditionMet = stats.streak >= value;
              break;
            case 'grammar_accuracy':
              conditionMet = stats.grammarAccuracy >= value;
              break;
            case 'speaking':
              conditionMet = stats.speakingPracticed >= value;
              break;
            case 'listening':
              conditionMet = stats.listeningPracticed >= value;
              break;
            case 'total_xp':
              conditionMet = stats.totalXP >= value;
              break;
            case 'posts':
              conditionMet = stats.posts >= value;
              break;
            case 'comments':
              conditionMet = stats.comments >= value;
              break;
          }

          if (conditionMet) {
            newUnlocked.push(achievement);
            unlocked.push(achievement.id);
          }
        });

        if (newUnlocked.length > 0) {
          set((state) => ({
            unlockedAchievements: {
              ...state.unlockedAchievements,
              [userId]: unlocked,
            },
          }));

          const authStore = useAuthStore.getState();
          if (authStore.user) {
            const totalReward = newUnlocked.reduce((sum, a) => sum + a.xpReward, 0);
            authStore.addXP(totalReward);
            authStore.updateUser({
              achievements: [...(authStore.user.achievements || []), ...newUnlocked.map(a => a.id)],
            });
          }
        }

        return newUnlocked;
      },

      getUnlockedAchievements: (userId: string) => {
        const unlocked = get().unlockedAchievements[userId] || [];
        return achievements.filter((a) => unlocked.includes(a.id));
      },

      isAchievementUnlocked: (userId: string, achievementId: string) => {
        const unlocked = get().unlockedAchievements[userId] || [];
        return unlocked.includes(achievementId);
      },
    }),
    {
      name: 'achievement-storage',
    }
  )
);
