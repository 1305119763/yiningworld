# YiningWorld - 多语种在线学习平台

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-blue" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.8-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-6.4-brightgreen" alt="Vite">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38bdf8" alt="TailwindCSS">
</p>

## 📚 项目简介

YiningWorld 是一款沉浸式多语种在线学习平台，支持英语、日语、韩语等主流语言的学习。平台通过互动式学习模块、智能进度追踪和个性化学习路径，为用户打造专业、高效的语言学习体验。

### 核心特性

- 🌍 **多语言支持**：英语、日语、韩语
- 📖 **分级课程**：基于CEFR标准的A1-C2级别体系
- 🎮 **互动学习**：单词记忆、语法练习、口语跟读、听力训练
- 📊 **进度追踪**：实时学习数据可视化
- 🏆 **成就系统**：徽章收集、XP经验值、排行榜
- 👥 **社区交流**：学习小组、话题讨论

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn >= 1.22.0

### 安装步骤

```bash
# 1. 克隆项目
git clone https://github.com/1305119763/yiningworld.git
cd yiningworld

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 构建生产版本
npm run build

# 5. 预览生产版本
npm run preview
```

项目启动后访问 http://localhost:5173 或 http://localhost:5573

---

## 📁 项目结构

```
yiningworld/
├── public/                 # 静态资源
├── src/
│   ├── components/         # React组件
│   │   ├── common/        # 通用组件（Button、Card、Modal等）
│   │   └── layout/        # 布局组件（Header、Footer）
│   ├── pages/             # 页面组件
│   │   ├── Home.tsx      # 首页
│   │   ├── Login.tsx     # 登录页
│   │   ├── Register.tsx  # 注册页
│   │   ├── Dashboard.tsx  # 学习仪表盘
│   │   ├── Vocabulary.tsx # 单词记忆
│   │   ├── Grammar.tsx   # 语法练习
│   │   ├── Speaking.tsx  # 口语跟读
│   │   ├── Listening.tsx  # 听力训练
│   │   ├── Community.tsx # 社区页面
│   │   ├── Achievements.tsx # 成就页面
│   │   └── Profile.tsx   # 个人中心
│   ├── store/             # 状态管理（Zustand）
│   │   ├── authStore.ts          # 用户认证状态
│   │   ├── progressStore.ts      # 学习进度状态
│   │   ├── achievementStore.ts    # 成就系统状态
│   │   └── communityStore.ts     # 社区状态
│   ├── data/              # 课程数据
│   │   ├── english.ts    # 英语课程
│   │   ├── japanese.ts   # 日语课程
│   │   └── korean.ts    # 韩语课程
│   ├── types/             # TypeScript类型定义
│   ├── hooks/             # 自定义Hooks
│   ├── App.tsx           # 应用入口
│   ├── main.tsx          # React渲染入口
│   └── index.css         # 全局样式
├── index.html             # HTML模板
├── package.json          # 项目配置
├── vite.config.ts        # Vite配置
├── tailwind.config.js    # TailwindCSS配置
└── tsconfig.json         # TypeScript配置
```

---

## 💾 数据存储方式

本项目采用 **localStorage** 作为客户端数据持久化方案，无需后端服务器。

### 存储结构

| 存储Key | 数据内容 | 说明 |
|---------|---------|------|
| `auth-storage` | 用户认证信息 | 用户ID、用户名、邮箱、学习语言、XP、连续天数等 |
| `progress-storage` | 学习进度数据 | 各语言词汇掌握度、语法正确率、口语/听力练习记录 |
| `achievement-storage` | 成就解锁状态 | 已解锁的成就ID列表 |
| `users` | 注册用户列表 | 所有注册用户的完整信息（含密码） |

### localStorage 数据示例

```javascript
// 用户认证状态
{
  "user": {
    "id": "abc123",
    "email": "user@example.com",
    "username": "学习达人",
    "totalXP": 1500,
    "streak": 7,
    "achievements": ["first_step", "vocab_master_50"]
  },
  "isAuthenticated": true
}

// 学习进度状态
{
  "progress": {
    "abc123_en": {
      "language": "en",
      "vocabulary": { "learned": 45, "total": 100, "masteryRate": 45 },
      "grammar": { "completed": 8, "accuracy": 85 }
    }
  }
}
```

### 数据操作

所有数据操作通过 Zustand Store 进行：

```typescript
// 示例：添加经验值
const { addXP } = useAuthStore();
addXP(50);

// 示例：更新学习进度
const { updateVocabulary } = useProgressStore();
updateVocabulary('en', 5);

// 示例：检查成就解锁
const { checkAchievements } = useAchievementStore();
checkAchievements(userId, { vocabularyLearned: 50, streak: 7 });
```

### 数据迁移

如需迁移到真实数据库，只需修改 `src/store/` 目录下的Store文件，将localStorage操作替换为API调用。

---

## 🎨 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.3 | UI框架 |
| TypeScript | 5.8 | 类型安全 |
| Vite | 6.4 | 构建工具 |
| TailwindCSS | 3.4 | 样式框架 |
| React Router | 7 | 路由管理 |
| Zustand | 5 | 状态管理 |
| Lucide React | - | 图标库 |

---

## 📱 页面路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 语言选择、学习入口 |
| `/login` | 登录 | 用户登录 |
| `/register` | 注册 | 新用户注册 |
| `/dashboard` | 学习仪表盘 | 进度概览、任务推荐 |
| `/vocabulary` | 单词记忆 | 闪卡记忆模块 |
| `/grammar` | 语法练习 | 规则讲解、即时测验 |
| `/speaking` | 口语跟读 | 录音、AI评分 |
| `/listening` | 听力训练 | 音频播放、理解测试 |
| `/community` | 社区 | 话题讨论、学习小组 |
| `/achievements` | 成就中心 | 徽章墙、排行榜 |
| `/profile` | 个人中心 | 资料设置、学习统计 |

---

## 🔧 开发指南

### 添加新语言支持

1. 在 `src/data/` 创建新的语言数据文件
2. 导出课程、词汇、语法数据
3. 在相应页面的语言切换器中添加选项

```typescript
// 示例：添加法语支持
// src/data/french.ts
export const frenchCourses: Course[] = [...];
export const frenchVocabulary: VocabularyWord[] = [...];
export const frenchGrammar: GrammarRule[] = [...];
```

### 添加新学习模块

1. 在 `src/pages/` 创建新页面组件
2. 在 `src/App.tsx` 添加路由
3. 在导航栏添加入口

### 添加新成就

编辑 `src/store/achievementStore.ts` 中的 `achievements` 数组：

```typescript
{
  id: 'new_achievement',
  title: '新成就名称',
  description: '成就描述',
  icon: 'Star',  // Lucide图标名
  category: 'learning',  // learning | streak | social | mastery
  requirement: { type: 'vocabulary', value: 100 },
  xpReward: 200
}
```

---

## 🌐 部署指南

### 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录，可部署到任何静态托管服务。

### 部署到 Vercel

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 部署
vercel
```

### 部署到 Netlify

```bash
# 1. 安装 Netlify CLI
npm i -g netlify-cli

# 2. 部署
netlify deploy --prod
```

---

## 📖 学习模块说明

### 单词记忆
- 翻转卡片展示释义和例句
- 点击播放标准发音
- 标记"认识"或"不认识"
- 实时更新学习进度

### 语法练习
- 可折叠的语法规则讲解
- 即时反馈的测验系统
- 错题自动记录

### 口语跟读
- Web Speech API 语音合成
- MediaRecorder API 录音功能
- AI模拟评分（1-100分）

### 听力训练
- 可调节播放速度（0.5x - 1.5x）
- 原文可折叠显示
- 理解测试题

---

## 🔒 安全说明

⚠️ **重要提示**：当前版本使用localStorage存储数据，存在以下限制：

1. **数据安全**：密码以明文存储，仅用于演示目的
2. **数据隔离**：不同浏览器/设备数据不共享
3. **容量限制**：localStorage限制约5-10MB

**生产环境建议**：
- 使用真实后端服务
- 密码加密存储
- 实现JWT认证
- 使用数据库存储用户数据

---

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 📞 联系方式

- GitHub: https://github.com/1305119763/yiningworld
- 问题反馈: https://github.com/1305119763/yiningworld/issues

---

<p align="center">Made with ❤️ by YiningWorld Team</p>
