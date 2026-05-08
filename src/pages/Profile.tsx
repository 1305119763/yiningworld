import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { Card, Button, Avatar } from '../components/common';
import { Header, Footer } from '../components/layout';
import {
  User,
  Mail,
  Globe,
  BookOpen,
  Trophy,
  Flame,
  Star,
  Edit2,
  Settings,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
} from 'lucide-react';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleSave = () => {
    if (editedUsername.trim()) {
      updateUser({ username: editedUsername });
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    { label: '学习天数', value: user.streak, icon: Flame, color: 'text-orange-500' },
    { label: '总经验值', value: user.totalXP, icon: Star, color: 'text-yellow-500' },
    { label: '成就数', value: user.achievements?.length || 0, icon: Trophy, color: 'text-purple-500' },
    { label: '学习语言', value: user.learningLanguages?.length || 0, icon: Globe, color: 'text-blue-500' },
  ];

  const levelProgress = user.totalXP % 1000;
  const currentLevel = Math.floor(user.totalXP / 1000) + 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
          <div className="px-6 pb-6">
            <div className="flex items-end -mt-12 mb-4">
              <div className="relative">
                <Avatar name={user.username} size="lg" className="w-24 h-24 border-4 border-white" />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                  📷
                </button>
              </div>

              <div className="ml-4 flex-1">
                {isEditing ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editedUsername}
                      onChange={(e) => setEditedUsername(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="输入新用户名"
                    />
                    <Button size="sm" onClick={handleSave}>保存</Button>
                    <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>取消</Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
                    <button
                      onClick={() => {
                        setEditedUsername(user.username);
                        setIsEditing(true);
                      }}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                )}
                <p className="text-gray-500 flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </p>
              </div>

              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                设置
              </Button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  等级 {currentLevel}
                </span>
                <span className="text-sm text-gray-500">
                  {levelProgress} / 1000 XP
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all"
                  style={{ width: `${(levelProgress / 1000) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4 text-center">
              <div className={`${stat.color} mb-2 flex justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">学习语言</h2>
          <Card className="divide-y">
            {[
              { language: '英语', flag: '🇬🇧', level: 'A1', progress: 45 },
              { language: '日语', flag: '🇯🇵', level: 'N5', progress: 20 },
              { language: '韩语', flag: '🇰🇷', level: 'TOPIK 1', progress: 10 },
            ].map((lang, index) => (
              <div
                key={index}
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate('/dashboard')}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{lang.flag}</span>
                  <div>
                    <div className="font-medium text-gray-900">{lang.language}</div>
                    <div className="text-sm text-gray-500">等级: {lang.level}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${lang.progress}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 text-right mt-1">{lang.progress}%</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </Card>

          <h2 className="text-xl font-bold text-gray-900 mt-8">设置</h2>
          <Card className="divide-y">
            {[
              { icon: Bell, label: '通知设置', description: '管理学习提醒和通知' },
              { icon: Globe, label: '语言设置', description: '选择界面语言' },
              { icon: Shield, label: '隐私设置', description: '管理隐私和权限' },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{item.label}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </Card>

          <Button
            variant="outline"
            className="w-full mt-4 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            退出登录
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};
