# 多语种在线教育平台 - 技术架构文档

## 1. 架构设计

### 1.1 系统架构图

```mermaid
graph TB
    subgraph 表现层 (Frontend)
        A[React Router] --> B[页面组件]
        B --> C[UI组件库]
        C --> D[状态管理 Context]
        D --> E[样式系统 TailwindCSS]
    end

    subgraph 业务逻辑层 (Services)
        F[认证服务] --> G[学习服务]
        G --> H[进度服务]
        H --> I[推荐服务]
        I --> J[社区服务]
    end

    subgraph 数据层 (Data)
        K[(localStorage)]
        L[(Mock JSON Data)]
    end

    subgraph 第三方服务
        M[Web Speech API - 语音合成]
        N[Audio API - 录音播放]
    end

    A --> F
    F --> K
    G --> L
    H --> K
    J --> L
    G --> M
    G --> N
```

### 1.2 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式方案**：TailwindCSS + CSS Variables
- **路由管理**：React Router DOM v6
- **状态管理**：React Context + useReducer
- **数据持久化**：localStorage (客户端)
- **Mock数据**：JSON 静态文件

---

## 2. 路由定义

| 路由路径 | 页面名称 | 功能描述 |
|---------|---------|---------|
| `/` | 首页 | 语言选择、学习入口 |
| `/login` | 登录页 | 用户登录 |
| `/register` | 注册页 | 新用户注册 |
| `/dashboard` | 学习仪表盘 | 进度概览、今日任务 |
| `/learn/:language/:level` | 学习页面 | 课程内容学习 |
| `/vocabulary` | 单词记忆 | 闪卡记忆模块 |
| `/grammar` | 语法练习 | 语法讲解和练习 |
| `/speaking` | 口语跟读 | 录音和对比练习 |
| `/listening` | 听力训练 | 听力材料和练习 |
| `/profile` | 个人中心 | 用户资料、设置 |
| `/community` | 社区页面 | 话题讨论、学习小组 |
| `/achievements` | 成就页面 | 徽章墙、排行榜 |

---

## 3. 数据模型

### 3.1 用户数据模型

```typescript
interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  nativeLanguage: string;
  learningLanguages: string[];
  currentLevel: Record<string, number>;
  totalXP: number;
  streak: number;
  joinedAt: string;
}
```

### 3.2 学习进度模型

```typescript
interface LearningProgress {
  userId: string;
  language: string;
  level: string;
  vocabulary: {
    learned: number;
    total: number;
    masteryRate: number;
  };
  grammar: {
    completed: number;
    total: number;
    accuracy: number;
  };
  speaking: {
    practiced: number;
    averageScore: number;
  };
  listening: {
    practiced: number;
    averageScore: number;
  };
  lastStudyDate: string;
}
```

### 3.3 课程数据模型

```typescript
interface Course {
  id: string;
  language: 'en' | 'ja' | 'ko';
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  title: string;
  description: string;
  units: Unit[];
}

interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  type: 'vocabulary' | 'grammar' | 'speaking' | 'listening';
  content: LessonContent;
}
```

### 3.4 成就数据模型

```typescript
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'social' | 'mastery';
  requirement: {
    type: string;
    value: number;
  };
  xpReward: number;
}
```

---

## 4. 组件架构

```
src/
├── components/
│   ├── common/          # 通用组件
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── Progress/
│   │   └── Avatar/
│   ├── layout/          # 布局组件
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── Footer/
│   │   └── Navigation/
│   ├── learning/        # 学习模块组件
│   │   ├── FlashCard/
│   │   ├── AudioPlayer/
│   │   ├── RecordingButton/
│   │   └── Quiz/
│   └── dashboard/       # 仪表盘组件
│       ├── StatsCard/
│       ├── ProgressRing/
│       └── AchievementBadge/
├── pages/               # 页面组件
├── contexts/            # React Context
├── hooks/               # 自定义Hooks
├── services/            # 业务逻辑服务
├── data/                # Mock数据
├── utils/               # 工具函数
└── types/               # TypeScript类型定义
```

---

## 5. 核心功能实现

### 5.1 用户认证

- **注册**：邮箱、用户名、密码验证
- **登录**：JWT Token (模拟) + localStorage 存储
- **状态管理**：AuthContext 提供全局认证状态

### 5.2 学习模块

#### 单词记忆 (Spaced Repetition)
- 使用间隔重复算法 (SM-2) 安排复习
- 卡片翻转动画展示释义
- 进度追踪显示记忆曲线

#### 语法练习
- 填空题、选择题、改错题
- 即时反馈系统
- 错题自动收集到错题本

#### 口语跟读
- Web Speech API 语音合成
- MediaRecorder API 录音功能
- 音频波形可视化对比

#### 听力训练
- HTML5 Audio API 播放控制
- 可调节播放速度 (0.5x - 2x)
- 听写和选择题混合练习

### 5.3 进度追踪

- localStorage 存储学习数据
- 数据结构支持多语言进度
- 环形图、折线图、热力图可视化

### 5.4 个性化推荐

- 基于用户当前水平和学习历史
- 智能推荐薄弱环节练习
- 学习路径动态调整

### 5.5 成就系统

- 徽章解锁条件检查
- XP 经验值累积
- 连续学习天数追踪
- 周榜、月榜排名

---

## 6. 样式系统

### 6.1 颜色变量

```css
:root {
  /* 主色调 */
  --color-primary-en: #3B82F6;    /* 英语 - 蓝色 */
  --color-primary-ja: #EF4444;   /* 日语 - 红色 */
  --color-primary-ko: #8B5CF6;   /* 韩语 - 紫色 */

  /* 通用色 */
  --color-text: #1F2937;
  --color-text-secondary: #6B7280;
  --color-background: #F9FAFB;
  --color-surface: #FFFFFF;
  --color-border: #E5E7EB;

  /* 功能色 */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;

  /* 成就色 */
  --color-gold: #F59E0B;
  --color-silver: #9CA3AF;
  --color-bronze: #D97706;
}
```

### 6.2 字体系统

```css
/* 标题字体 */
font-family: 'Noto Sans SC', 'Noto Sans JP', 'Noto Sans KR', sans-serif;

/* 正文字体 */
font-family: 'Inter', system-ui, sans-serif;

/* 等宽字体 (音标/代码) */
font-family: 'JetBrains Mono', monospace;
```

---

## 7. Mock 数据结构

```
public/data/
├── users.json
├── courses/
│   ├── english.json
│   ├── japanese.json
│   └── korean.json
├── achievements.json
└── community/
    ├── posts.json
    └── groups.json
```

---

## 8. 性能优化

- **代码分割**：React.lazy 实现路由级懒加载
- **状态管理**：Context 按需加载，避免全局重渲染
- **样式优化**：TailwindCSS JIT 模式，移除未使用样式
- **动画性能**：使用 CSS Transform 和 Will-change 优化
- **数据缓存**：localStorage 缓存学习进度，减少重复计算

---

## 9. 可访问性 (A11y)

- 语义化 HTML 标签
- ARIA 属性支持
- 键盘导航支持
- 足够的颜色对比度
- 焦点状态可见性
