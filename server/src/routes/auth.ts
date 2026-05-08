import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 注册
router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // 检查用户是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: '该邮箱已被注册' });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        username: true,
        totalXP: true,
        streak: true,
        joinedAt: true,
        achievements: {
          include: {
            achievement: true,
          },
        },
        learningLanguages: true,
      },
    });

    // 生成JWT令牌
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        ...user,
        achievements: user.achievements.map((ua) => ua.achievement.id),
      },
    });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ error: '注册失败' });
  }
});

// 登录
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        achievements: {
          include: {
            achievement: true,
          },
        },
        learningLanguages: true,
      },
    });

    if (!user) {
      return res.status(400).json({ error: '邮箱或密码错误' });
    }

    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: '邮箱或密码错误' });
    }

    // 生成JWT令牌
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 更新最后学习时间
    await prisma.user.update({
      where: { id: user.id },
      data: { lastStudyDate: new Date() },
    });

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      token,
      user: {
        ...userWithoutPassword,
        achievements: user.achievements.map((ua) => ua.achievement.id),
      },
    });
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ error: '登录失败' });
  }
});

// 获取当前用户信息
router.get('/me', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: {
        achievements: {
          include: {
            achievement: true,
          },
        },
        learningLanguages: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      ...userWithoutPassword,
      achievements: user.achievements.map((ua) => ua.achievement.id),
    });
  } catch (error) {
    console.error('获取用户信息错误:', error);
    res.status(500).json({ error: '获取用户信息失败' });
  }
});

// 更新用户信息
router.patch('/me', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { username, avatar } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: { username, avatar },
      include: {
        achievements: {
          include: {
            achievement: true,
          },
        },
        learningLanguages: true,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      ...userWithoutPassword,
      achievements: user.achievements.map((ua) => ua.achievement.id),
    });
  } catch (error) {
    console.error('更新用户信息错误:', error);
    res.status(500).json({ error: '更新用户信息失败' });
  }
});

// 更新连续学习天数
router.post('/streak', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
    });

    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }

    const today = new Date();
    const lastStudy = user.lastStudyDate;

    let newStreak = user.streak;

    if (lastStudy) {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastStudy.toDateString() === yesterday.toDateString()) {
        newStreak += 1;
      } else if (lastStudy.toDateString() !== today.toDateString()) {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        streak: newStreak,
        lastStudyDate: today,
      },
      select: {
        streak: true,
        lastStudyDate: true,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('更新连续学习天数错误:', error);
    res.status(500).json({ error: '更新失败' });
  }
});

// 添加经验值
router.post('/xp', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { amount } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        totalXP: {
          increment: amount,
        },
      },
      select: {
        totalXP: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.error('添加经验值错误:', error);
    res.status(500).json({ error: '添加经验值失败' });
  }
});

export default router;
