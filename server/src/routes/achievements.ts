import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// 初始化成就数据
const defaultAchievements = [
  {
    title: '初次启程',
    description: '完成你的第一课学习',
    icon: 'Footprints',
    category: 'learning',
    requirementType: 'lessons',
    requirementValue: 1,
    xpReward: 50,
  },
  {
    title: '词汇达人',
    description: '学习掌握50个单词',
    icon: 'BookOpen',
    category: 'mastery',
    requirementType: 'vocabulary',
    requirementValue: 50,
    xpReward: 100,
  },
  {
    title: '坚持一周',
    description: '连续学习7天',
    icon: 'Flame',
    category: 'streak',
    requirementType: 'streak',
    requirementValue: 7,
    xpReward: 200,
  },
  {
    title: '月度坚持者',
    description: '连续学习30天',
    icon: 'Trophy',
    category: 'streak',
    requirementType: 'streak',
    requirementValue: 30,
    xpReward: 500,
  },
  {
    title: '语法大师',
    description: '语法练习正确率达到100%',
    icon: 'GraduationCap',
    category: 'mastery',
    requirementType: 'grammar_accuracy',
    requirementValue: 100,
    xpReward: 150,
  },
  {
    title: '口语之星',
    description: '完成10次口语练习',
    icon: 'Mic',
    category: 'learning',
    requirementType: 'speaking',
    requirementValue: 10,
    xpReward: 120,
  },
  {
    title: '听力专家',
    description: '完成20次听力训练',
    icon: 'Headphones',
    category: 'learning',
    requirementType: 'listening',
    requirementValue: 20,
    xpReward: 150,
  },
  {
    title: '千经验达成',
    description: '累计获得1000点经验',
    icon: 'Star',
    category: 'learning',
    requirementType: 'total_xp',
    requirementValue: 1000,
    xpReward: 300,
  },
  {
    title: '社交达人',
    description: '在社区发布5篇帖子',
    icon: 'Users',
    category: 'social',
    requirementType: 'posts',
    requirementValue: 5,
    xpReward: 100,
  },
  {
    title: '互助天使',
    description: '回复其他学习者10次',
    icon: 'Heart',
    category: 'social',
    requirementType: 'comments',
    requirementValue: 10,
    xpReward: 100,
  },
];

// 获取所有成就
router.get('/', async (req, res) => {
  try {
    // 检查是否已初始化
    const count = await prisma.achievement.count();
    
    if (count === 0) {
      // 初始化成就数据
      await prisma.achievement.createMany({
        data: defaultAchievements,
      });
    }

    const achievements = await prisma.achievement.findMany();
    res.json(achievements);
  } catch (error) {
    console.error('获取成就错误:', error);
    res.status(500).json({ error: '获取成就失败' });
  }
});

// 获取用户已解锁的成就
router.get('/my', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId: req.user!.id },
      include: { achievement: true },
    });

    res.json(userAchievements.map((ua) => ua.achievement));
  } catch (error) {
    console.error('获取用户成就错误:', error);
    res.status(500).json({ error: '获取用户成就失败' });
  }
});

// 检查并解锁成就
router.post('/check', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { stats } = req.body;

    // 获取所有成就
    const achievements = await prisma.achievement.findMany();

    // 获取用户已解锁的成就
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId: req.user!.id },
    });

    const unlockedIds = new Set(userAchievements.map((ua) => ua.achievementId));
    const newlyUnlocked = [];

    for (const achievement of achievements) {
      if (unlockedIds.has(achievement.id)) continue;

      const { requirementType, requirementValue } = achievement;
      let conditionMet = false;

      switch (requirementType) {
        case 'lessons':
          conditionMet = (stats.lessonsCompleted || 0) >= requirementValue;
          break;
        case 'vocabulary':
          conditionMet = (stats.vocabularyLearned || 0) >= requirementValue;
          break;
        case 'streak':
          conditionMet = (stats.streak || 0) >= requirementValue;
          break;
        case 'grammar_accuracy':
          conditionMet = (stats.grammarAccuracy || 0) >= requirementValue;
          break;
        case 'speaking':
          conditionMet = (stats.speakingPracticed || 0) >= requirementValue;
          break;
        case 'listening':
          conditionMet = (stats.listeningPracticed || 0) >= requirementValue;
          break;
        case 'total_xp':
          conditionMet = (stats.totalXP || 0) >= requirementValue;
          break;
        case 'posts':
          conditionMet = (stats.posts || 0) >= requirementValue;
          break;
        case 'comments':
          conditionMet = (stats.comments || 0) >= requirementValue;
          break;
      }

      if (conditionMet) {
        await prisma.userAchievement.create({
          data: {
            userId: req.user!.id,
            achievementId: achievement.id,
          },
        });

        // 给用户添加XP奖励
        await prisma.user.update({
          where: { id: req.user!.id },
          data: {
            totalXP: {
              increment: achievement.xpReward,
            },
          },
        });

        newlyUnlocked.push(achievement);
      }
    }

    res.json({
      newlyUnlocked,
      totalUnlocked: userAchievements.length + newlyUnlocked.length,
    });
  } catch (error) {
    console.error('检查成就错误:', error);
    res.status(500).json({ error: '检查成就失败' });
  }
});

export default router;
