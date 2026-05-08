import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// 初始化社区小组数据
const defaultGroups = [
  {
    name: '英语初学者联盟',
    description: '帮助英语学习新手入门',
    language: 'en',
    memberCount: 1234,
  },
  {
    name: '日语文化探索',
    description: '一起探索日本文化',
    language: 'ja',
    memberCount: 856,
  },
  {
    name: '韩语拼音学习',
    description: '韩语四十音学习小组',
    language: 'ko',
    memberCount: 967,
  },
  {
    name: '商务英语交流',
    description: '职场英语实战交流',
    language: 'en',
    memberCount: 654,
  },
];

// 获取所有帖子
router.get('/posts', async (req, res) => {
  try {
    const { language } = req.query;

    const posts = await prisma.post.findMany({
      where: language ? { language: language as string } : {},
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(posts);
  } catch (error) {
    console.error('获取帖子错误:', error);
    res.status(500).json({ error: '获取帖子失败' });
  }
});

// 创建帖子
router.post('/posts', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { title, content, language, tags } = req.body;

    const post = await prisma.post.create({
      data: {
        authorId: req.user!.id,
        title,
        content,
        language,
        tags: tags?.join(',') || '',
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('创建帖子错误:', error);
    res.status(500).json({ error: '创建帖子失败' });
  }
});

// 点赞帖子
router.post('/posts/:id/like', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const id = req.params.id as string;

    const post = await prisma.post.update({
      where: { id },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    res.json({ likes: post.likes });
  } catch (error) {
    console.error('点赞错误:', error);
    res.status(500).json({ error: '点赞失败' });
  }
});

// 获取社区小组
router.get('/groups', async (req, res) => {
  try {
    // 检查是否已初始化
    const count = await prisma.communityGroup.count();

    if (count === 0) {
      await prisma.communityGroup.createMany({
        data: defaultGroups,
      });
    }

    const { language } = req.query;

    const groups = await prisma.communityGroup.findMany({
      where: language ? { language: language as string } : {},
    });

    res.json(groups);
  } catch (error) {
    console.error('获取小组错误:', error);
    res.status(500).json({ error: '获取小组失败' });
  }
});

export default router;
