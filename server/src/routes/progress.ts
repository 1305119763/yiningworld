import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// 获取用户所有学习进度
router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const progress = await prisma.learningProgress.findMany({
      where: { userId: req.user!.id },
    });

    const progressMap = progress.reduce((acc, p) => {
      acc[p.language] = {
        userId: p.userId,
        language: p.language,
        level: p.level,
        vocabulary: {
          learned: p.vocabLearned,
          total: p.vocabTotal,
          masteryRate: p.masteryRate,
        },
        grammar: {
          completed: p.grammarCompleted,
          total: p.grammarTotal,
          accuracy: p.grammarAccuracy,
        },
        speaking: {
          practiced: p.speakingPracticed,
          averageScore: p.speakingAvgScore,
        },
        listening: {
          practiced: p.listeningPracticed,
          averageScore: p.listeningAvgScore,
        },
        lastStudyDate: p.lastStudyDate,
        xp: p.xp,
      };
      return acc;
    }, {} as Record<string, any>);

    res.json(progressMap);
  } catch (error) {
    console.error('获取学习进度错误:', error);
    res.status(500).json({ error: '获取学习进度失败' });
  }
});

// 获取特定语言的学习进度
router.get('/:language', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const language = req.params.language as string;

    let progress = await prisma.learningProgress.findUnique({
      where: {
        userId_language: {
          userId: req.user!.id,
          language,
        },
      },
    });

    // 如果不存在，创建新的进度记录
    if (!progress) {
      progress = await prisma.learningProgress.create({
        data: {
          userId: req.user!.id,
          language,
          level: 'A1',
        },
      });
    }

    res.json({
      userId: progress.userId,
      language: progress.language,
      level: progress.level,
      vocabulary: {
        learned: progress.vocabLearned,
        total: progress.vocabTotal,
        masteryRate: progress.masteryRate,
      },
      grammar: {
        completed: progress.grammarCompleted,
        total: progress.grammarTotal,
        accuracy: progress.grammarAccuracy,
      },
      speaking: {
        practiced: progress.speakingPracticed,
        averageScore: progress.speakingAvgScore,
      },
      listening: {
        practiced: progress.listeningPracticed,
        averageScore: progress.listeningAvgScore,
      },
      lastStudyDate: progress.lastStudyDate,
      xp: progress.xp,
    });
  } catch (error) {
    console.error('获取学习进度错误:', error);
    res.status(500).json({ error: '获取学习进度失败' });
  }
});

// 更新词汇学习进度
router.post('/:language/vocabulary', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const language = req.params.language as string;
    const { learned } = req.body;

    const progress = await prisma.learningProgress.findUnique({
      where: {
        userId_language: {
          userId: req.user!.id,
          language,
        },
      },
    });

    if (!progress) {
      return res.status(404).json({ error: '学习进度不存在' });
    }

    const newLearned = progress.vocabLearned + learned;
    const masteryRate = (newLearned / progress.vocabTotal) * 100;

    const updated = await prisma.learningProgress.update({
      where: {
        userId_language: {
          userId: req.user!.id,
          language,
        },
      },
      data: {
        vocabLearned: newLearned,
        masteryRate,
        lastStudyDate: new Date(),
      },
    });

    res.json({
      vocabulary: {
        learned: updated.vocabLearned,
        total: updated.vocabTotal,
        masteryRate: updated.masteryRate,
      },
    });
  } catch (error) {
    console.error('更新词汇进度错误:', error);
    res.status(500).json({ error: '更新词汇进度失败' });
  }
});

// 更新语法学习进度
router.post('/:language/grammar', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const language = req.params.language as string;
    const { completed, accuracy } = req.body;

    const progress = await prisma.learningProgress.findUnique({
      where: {
        userId_language: {
          userId: req.user!.id,
          language,
        },
      },
    });

    if (!progress) {
      return res.status(404).json({ error: '学习进度不存在' });
    }

    const newCompleted = progress.grammarCompleted + completed;
    const newAccuracy =
      (progress.grammarAccuracy * progress.grammarCompleted + accuracy) /
      newCompleted;

    const updated = await prisma.learningProgress.update({
      where: {
        userId_language: {
          userId: req.user!.id,
          language,
        },
      },
      data: {
        grammarCompleted: newCompleted,
        grammarAccuracy: newAccuracy,
        lastStudyDate: new Date(),
      },
    });

    res.json({
      grammar: {
        completed: updated.grammarCompleted,
        total: updated.grammarTotal,
        accuracy: updated.grammarAccuracy,
      },
    });
  } catch (error) {
    console.error('更新语法进度错误:', error);
    res.status(500).json({ error: '更新语法进度失败' });
  }
});

// 更新口语练习进度
router.post('/:language/speaking', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const language = req.params.language as string;
    const { score } = req.body;

    const progress = await prisma.learningProgress.findUnique({
      where: {
        userId_language: {
          userId: req.user!.id,
          language,
        },
      },
    });

    if (!progress) {
      return res.status(404).json({ error: '学习进度不存在' });
    }

    const newPracticed = progress.speakingPracticed + 1;
    const newAvgScore =
      (progress.speakingAvgScore * progress.speakingPracticed + score) /
      newPracticed;

    const updated = await prisma.learningProgress.update({
      where: {
        userId_language: {
          userId: req.user!.id,
          language,
        },
      },
      data: {
        speakingPracticed: newPracticed,
        speakingAvgScore: newAvgScore,
        lastStudyDate: new Date(),
      },
    });

    res.json({
      speaking: {
        practiced: updated.speakingPracticed,
        averageScore: updated.speakingAvgScore,
      },
    });
  } catch (error) {
    console.error('更新口语进度错误:', error);
    res.status(500).json({ error: '更新口语进度失败' });
  }
});

// 更新听力练习进度
router.post('/:language/listening', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const language = req.params.language as string;
    const { score } = req.body;

    const progress = await prisma.learningProgress.findUnique({
      where: {
        userId_language: {
          userId: req.user!.id,
          language,
        },
      },
    });

    if (!progress) {
      return res.status(404).json({ error: '学习进度不存在' });
    }

    const newPracticed = progress.listeningPracticed + 1;
    const newAvgScore =
      (progress.listeningAvgScore * progress.listeningPracticed + score) /
      newPracticed;

    const updated = await prisma.learningProgress.update({
      where: {
        userId_language: {
          userId: req.user!.id,
          language,
        },
      },
      data: {
        listeningPracticed: newPracticed,
        listeningAvgScore: newAvgScore,
        lastStudyDate: new Date(),
      },
    });

    res.json({
      listening: {
        practiced: updated.listeningPracticed,
        averageScore: updated.listeningAvgScore,
      },
    });
  } catch (error) {
    console.error('更新听力进度错误:', error);
    res.status(500).json({ error: '更新听力进度失败' });
  }
});

// 添加XP
router.post('/:language/xp', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const language = req.params.language as string;
    const { amount } = req.body;

    const progress = await prisma.learningProgress.update({
      where: {
        userId_language: {
          userId: req.user!.id,
          language,
        },
      },
      data: {
        xp: {
          increment: amount,
        },
        lastStudyDate: new Date(),
      },
    });

    res.json({ xp: progress.xp });
  } catch (error) {
    console.error('添加XP错误:', error);
    res.status(500).json({ error: '添加XP失败' });
  }
});

export default router;
