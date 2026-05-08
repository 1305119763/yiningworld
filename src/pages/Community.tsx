import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useCommunityStore } from '../store';
import { Card, Button, Avatar } from '../components/common';
import { Header, Footer } from '../components/layout';
import { Heart, MessageCircle, Users, MessageSquare, Plus, TrendingUp, Star } from 'lucide-react';

export const Community: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { posts, groups, addPost, likePost } = useCommunityStore();

  const [activeTab, setActiveTab] = useState<'posts' | 'groups'>('posts');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const filteredPosts = selectedLanguage === 'all' 
    ? posts 
    : posts.filter(post => post.language === selectedLanguage);

  const filteredGroups = selectedLanguage === 'all'
    ? groups
    : groups.filter(group => group.language === selectedLanguage);

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !user) return;

    addPost({
      authorId: user.id,
      authorName: user.username,
      language: selectedLanguage === 'all' ? 'en' : selectedLanguage,
      title: newPostTitle,
      content: newPostContent,
      tags: ['新帖子'],
    });

    setNewPostTitle('');
    setNewPostContent('');
    setShowCreatePost(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return '今天';
    if (days === 1) return '昨天';
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  const languageFlags: Record<string, string> = {
    en: '🇬🇧',
    ja: '🇯🇵',
    ko: '🇰🇷',
    all: '🌍',
  };

  const languageColors: Record<string, string> = {
    en: 'text-blue-600 bg-blue-50',
    ja: 'text-pink-600 bg-pink-50',
    ko: 'text-purple-600 bg-purple-50',
    all: 'text-gray-600 bg-gray-50',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">学习社区</h1>
            <p className="text-gray-600">与志同道合的学习者一起交流</p>
          </div>
          <Button
            onClick={() => setShowCreatePost(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            <Plus className="w-5 h-5 mr-2" />
            发布帖子
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex space-x-2 bg-white rounded-xl p-1 shadow-sm">
            {[
              { id: 'all', label: '全部', icon: '🌍' },
              { id: 'en', label: '英语', icon: '🇬🇧' },
              { id: 'ja', label: '日语', icon: '🇯🇵' },
              { id: 'ko', label: '韩语', icon: '🇰🇷' },
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  selectedLanguage === lang.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{lang.icon}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex space-x-4 border-b mb-6">
          <button
            onClick={() => setActiveTab('posts')}
            className={`pb-3 px-2 flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === 'posts'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>帖子</span>
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`pb-3 px-2 flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === 'groups'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>学习小组</span>
          </button>
        </div>

        {activeTab === 'posts' && (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar name={post.authorName} size="md" />
                    <div>
                      <div className="font-medium text-gray-900">{post.authorName}</div>
                      <div className="text-sm text-gray-500 flex items-center space-x-2">
                        <span>{languageFlags[post.language]}</span>
                        <span>·</span>
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.content}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${languageColors[post.language]}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-6 text-gray-500 text-sm">
                  <button
                    onClick={() => likePost(post.id)}
                    className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span>{post.likes}</span>
                  </button>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} hover className="p-6 group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${
                    group.language === 'en' 
                      ? 'from-blue-500 to-blue-600' 
                      : group.language === 'ja'
                      ? 'from-pink-500 to-red-500'
                      : 'from-purple-500 to-violet-600'
                  }`}>
                    {languageFlags[group.language]}
                  </div>
                  <Button variant="outline" size="sm">
                    加入
                  </Button>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{group.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{group.description}</p>

                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{group.memberCount} 位成员</span>
                </div>
              </Card>
            ))}
          </div>
        )}

        {showCreatePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowCreatePost(false)}
            />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">发布新帖子</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    标题
                  </label>
                  <input
                    type="text"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="输入帖子标题"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    内容
                  </label>
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="分享你的学习心得..."
                  />
                </div>

                <div className="flex items-center justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                    取消
                  </Button>
                  <Button onClick={handleCreatePost}>
                    发布
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
