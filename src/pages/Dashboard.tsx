import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore, useProgressStore } from '../store';
import { Card, Button, ProgressRing } from '../components/common';
import { Header, Footer } from '../components/layout';
import {
  BookOpen,
  Mic,
  Headphones,
  GraduationCap,
  Trophy,
  Flame,
  Target,
  ArrowRight,
  Play,
  TrendingUp,
  Calendar,
  Star,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, updateStreak } = useAuthStore();
  const { progress, initializeProgress } = useProgressStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { id: 'en', name: '英语', flag: '🇬🇧', color: 'blue' },
    { id: 'ja', name: '日语', flag: '🇯🇵', color: 'pink' },
    { id: 'ko', name: '韩语', flag: '🇰🇷', color: 'purple' },
  ];

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const lang = searchParams.get('language');
    if (lang) {
      setSelectedLanguage(lang);
    }

    languages.forEach((lang) => {
      if (!progress[`${user.id}_${lang.id}`]) {
        initializeProgress(lang.id);
      }
    });

    updateStreak();
  }, [user, navigate, searchParams]);

  if (!user) return null;

  const currentProgress = progress[`${user.id}_${selectedLanguage}`];

  const weeklyData = [
    { day: '周一', hours: 1.5 },
    { day: '周二', hours: 2.0 },
    { day: '周三', hours: 1.0 },
    { day: '周四', hours: 2.5 },
    { day: '周五', hours: 1.8 },
    { day: '周六', hours: 3.0 },
    { day: '周日', hours: 2.2 },
  ];

  const maxHours = Math.max(...weeklyData.map((d) => d.hours));

  const learningModules = [
    {
      id: 'vocabulary',
      icon: BookOpen,
      title: '单词记忆',
      description: '使用闪卡记忆核心词汇',
      color: 'blue',
      path: '/vocabulary',
    },
    {
      id: 'grammar',
      icon: GraduationCap,
      title: '语法练习',
      description: '掌握核心语法规则',
      color: 'green',
      path: '/grammar',
    },
    {
      id: 'speaking',
      icon: Mic,
      title: '口语跟读',
      description: 'AI辅助发音练习',
      color: 'pink',
      path: '/speaking',
    },
    {
      id: 'listening',
      icon: Headphones,
      title: '听力训练',
      description: '沉浸式听力材料',
      color: 'purple',
      path: '/listening',
    },
  ];

  const colorMap: Record<string, string> = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    pink: 'text-pink-600 bg-pink-100',
    purple: 'text-purple-600 bg-purple-100',
    yellow: 'text-yellow-600 bg-yellow-100',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            欢迎回来，{user.username}！👋
          </h1>
          <p className="text-gray-600">继续您的语言学习之旅</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">学习总览</h2>
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-orange-600 font-bold">{user.streak}天</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <ProgressRing
                progress={currentProgress ? Math.round((currentProgress.vocabulary.learned / currentProgress.vocabulary.total) * 100) : 0}
                size={100}
                color="#3B82F6"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {currentProgress ? currentProgress.vocabulary.learned : 0}
                  </div>
                  <div className="text-xs text-gray-500">已学词汇</div>
                </div>
              </ProgressRing>

              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">今日目标</span>
                  <span className="text-sm font-medium text-gray-900">50词汇</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${currentProgress ? Math.min((currentProgress.vocabulary.learned / 50) * 100, 100) : 0}%` }}
                  />
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-700">{user.totalXP} XP</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-700">{user.achievements?.length || 0} 成就</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">本周学习时长</h2>
            <div className="flex items-end justify-between space-x-2 h-32">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-400"
                    style={{ height: `${(day.hours / maxHours) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">{day.day}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">学习语言</h2>
            <div className="space-y-3">
              {languages.map((lang) => {
                const langProgress = progress[`${user.id}_${lang.id}`];
                const isSelected = selectedLanguage === lang.id;

                return (
                  <div
                    key={lang.id}
                    onClick={() => setSelectedLanguage(lang.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      isSelected ? `bg-${lang.color}-50 border-2 border-${lang.color}-300` : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <div>
                          <div className="font-medium text-gray-900">{lang.name}</div>
                          <div className="text-xs text-gray-500">
                            {langProgress ? `${langProgress.vocabulary.learned}/${langProgress.vocabulary.total} 词汇` : '未开始'}
                          </div>
                        </div>
                      </div>
                      {isSelected && <ArrowRight className="w-5 h-5 text-blue-600" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">选择学习模块</h2>
            <Link to="/community" className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
              <span>查看全部</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningModules.map((module) => (
              <Card
                key={module.id}
                hover
                onClick={() => navigate(`${module.path}?language=${selectedLanguage}`)}
                className="p-6 group"
              >
                <div className={`w-12 h-12 ${colorMap[module.color].split(' ')[1]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <module.icon className={`w-6 h-6 ${colorMap[module.color].split(' ')[0]}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{module.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                <div className={`inline-flex items-center space-x-2 text-sm font-medium ${colorMap[module.color].split(' ')[0]}`}>
                  <span>开始学习</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">今日推荐任务</h2>
              <Target className="w-5 h-5 text-blue-600" />
            </div>

            <div className="space-y-4">
              {[
                { title: '学习10个新单词', progress: 60, xp: 25, completed: false },
                { title: '完成语法练习', progress: 100, xp: 30, completed: true },
                { title: '口语跟读练习', progress: 30, xp: 20, completed: false },
              ].map((task, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl ${task.completed ? 'bg-green-50' : 'bg-gray-50'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {task.completed ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                      )}
                      <span className={`font-medium ${task.completed ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                        {task.title}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">+{task.xp} XP</span>
                  </div>
                  {!task.completed && (
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-blue-600 h-1 rounded-full"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">学习统计</h2>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {currentProgress?.vocabulary.masteryRate.toFixed(0) || 0}%
                </div>
                <div className="text-sm text-gray-600">词汇掌握度</div>
              </div>

              <div className="p-4 bg-green-50 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {currentProgress?.grammar.accuracy.toFixed(0) || 0}%
                </div>
                <div className="text-sm text-gray-600">语法正确率</div>
              </div>

              <div className="p-4 bg-pink-50 rounded-xl">
                <div className="text-3xl font-bold text-pink-600 mb-1">
                  {currentProgress?.speaking.practiced || 0}
                </div>
                <div className="text-sm text-gray-600">口语练习次数</div>
              </div>

              <div className="p-4 bg-purple-50 rounded-xl">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {currentProgress?.listening.practiced || 0}
                </div>
                <div className="text-sm text-gray-600">听力练习次数</div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};
