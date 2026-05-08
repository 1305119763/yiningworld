import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useAchievementStore } from '../store';
import { Card } from '../components/common';
import { Header, Footer } from '../components/layout';
import {
  Trophy,
  Star,
  Flame,
  GraduationCap,
  BookOpen,
  Mic,
  Headphones,
  Users,
  Heart,
  Check,
  Lock,
} from 'lucide-react';

export const Achievements: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { achievements, getUnlockedAchievements } = useAchievementStore();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const unlockedAchievements = getUnlockedAchievements(user.id);

  const categoryIcons: Record<string, any> = {
    learning: BookOpen,
    streak: Flame,
    social: Users,
    mastery: GraduationCap,
  };

  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    learning: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
    streak: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' },
    social: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
    mastery: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
  };

  const stats = [
    { label: '获得成就', value: unlockedAchievements.length, icon: Trophy, color: 'text-yellow-600' },
    { label: '总经验值', value: user.totalXP, icon: Star, color: 'text-blue-600' },
    { label: '连续学习', value: `${user.streak}天`, icon: Flame, color: 'text-orange-600' },
    { label: '解锁课程', value: user.learningLanguages?.length || 0, icon: GraduationCap, color: 'text-green-600' },
  ];

  const leaderboard = [
    { rank: 1, name: '学习达人', xp: 12500, avatar: '👑' },
    { rank: 2, name: user.username, xp: user.totalXP, avatar: '🎯', isCurrentUser: true },
    { rank: 3, name: '语言爱好者', xp: 8200, avatar: '🌟' },
    { rank: 4, name: '日语小王子', xp: 7600, avatar: '🎌' },
    { rank: 5, name: '韩流明星', xp: 7100, avatar: '💫' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">成就中心</h1>
          <p className="text-gray-600">查看您的学习成就和荣誉</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4 text-center">
              <div className={`${stat.color} mb-2 flex justify-center`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4">成就徽章</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {achievements.map((achievement) => {
                const isUnlocked = unlockedAchievements.some((a) => a.id === achievement.id);
                const colors = categoryColors[achievement.category];
                const IconComponent = categoryIcons[achievement.category] || Trophy;

                return (
                  <Card
                    key={achievement.id}
                    className={`p-4 text-center transition-all ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-white to-yellow-50'
                        : 'bg-gray-50 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-3 ${
                        isUnlocked
                          ? `bg-gradient-to-br ${colors.bg} ${colors.text}`
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {isUnlocked ? (
                        <IconComponent className="w-8 h-8" />
                      ) : (
                        <Lock className="w-6 h-6" />
                      )}
                    </div>

                    <h3 className="font-bold text-gray-900 mb-1">{achievement.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">{achievement.description}</p>

                    <div className="flex items-center justify-center space-x-1">
                      <Star className={`w-4 h-4 ${isUnlocked ? 'text-yellow-500' : 'text-gray-400'}`} />
                      <span className={`text-sm font-medium ${isUnlocked ? 'text-yellow-600' : 'text-gray-400'}`}>
                        +{achievement.xpReward} XP
                      </span>
                    </div>

                    {isUnlocked && (
                      <div className="mt-2">
                        <span className="inline-flex items-center text-xs text-green-600">
                          <Check className="w-3 h-3 mr-1" />
                          已解锁
                        </span>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">排行榜</h2>
            <Card className="p-4">
              <div className="space-y-3">
                {leaderboard.map((userData, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      userData.isCurrentUser
                        ? 'bg-blue-50 border-2 border-blue-300'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{userData.avatar}</div>
                      <div>
                        <div className="font-medium text-gray-900 flex items-center space-x-2">
                          <span>{userData.name}</span>
                          {userData.rank === 1 && <span className="text-yellow-500">👑</span>}
                        </div>
                        <div className="text-xs text-gray-500">{userData.xp.toLocaleString()} XP</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy
                        className={`w-5 h-5 ${
                          userData.rank === 1
                            ? 'text-yellow-500'
                            : userData.rank === 2
                            ? 'text-gray-400'
                            : userData.rank === 3
                            ? 'text-orange-400'
                            : 'text-gray-300'
                        }`}
                      />
                      <span className="font-bold text-gray-700">#{userData.rank}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 mt-4 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">您的排名</div>
                <div className="text-4xl font-bold text-gray-900 mb-2">#{2}</div>
                <div className="text-sm text-gray-500">
                  再获得 {(12500 - user.totalXP).toLocaleString()} XP 可登顶！
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span>成就系统说明</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-medium mb-2">🏆 学习成就</h4>
              <p>完成课程学习、掌握词汇量可获得此类成就</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">🔥 连续学习</h4>
              <p>保持连续学习天数可获得坚持徽章</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">👥 社交达人</h4>
              <p>参与社区互动可获得社交类成就</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">🎓 大师级</h4>
              <p>达到高正确率或高水平可获得大师徽章</p>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
