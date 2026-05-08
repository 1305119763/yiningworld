import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import progressRoutes from './routes/progress';
import achievementsRoutes from './routes/achievements';
import communityRoutes from './routes/community';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/community', communityRoutes);

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 错误处理
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: '服务器内部错误' });
});

app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
  console.log(`📚 API 文档:`);
  console.log(`   - POST   /api/auth/register     用户注册`);
  console.log(`   - POST   /api/auth/login        用户登录`);
  console.log(`   - GET    /api/auth/me           获取当前用户`);
  console.log(`   - GET    /api/progress          获取学习进度`);
  console.log(`   - GET    /api/achievements      获取成就列表`);
  console.log(`   - GET    /api/community/posts   获取社区帖子`);
});
