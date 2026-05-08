import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { Card, Button } from '../components/common';
import { Header, Footer } from '../components/layout';
import {
  Globe,
  GraduationCap,
  Award,
  Users,
  BookOpen,
  Mic,
  Headphones,
  ArrowRight,
  Star,
  Play,
  CheckCircle,
} from 'lucide-react';

export const Home: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const languages = [
    {
      id: 'en',
      name: '英语',
      nativeName: 'English',
      flag: '🇬🇧',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      learners: '1.2亿+',
      description: '全球通用语言，开启无限可能',
    },
    {
      id: 'ja',
      name: '日语',
      nativeName: '日本語',
      flag: '🇯🇵',
      color: 'from-pink-500 to-red-500',
      bgColor: 'bg-pink-50',
      learners: '1500万+',
      description: '探索动漫、科技与传统文化',
    },
    {
      id: 'ko',
      name: '韩语',
      nativeName: '한국어',
      flag: '🇰🇷',
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50',
      learners: '800万+',
      description: '韩流文化与商务沟通桥梁',
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: '科学课程体系',
      description: '基于CEFR标准，分级递进学习',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Mic,
      title: '智能口语练习',
      description: 'AI评分，即时反馈发音',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
    {
      icon: Headphones,
      title: '沉浸式听力',
      description: '真实语境，循序渐进的训练',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Award,
      title: '成就激励系统',
      description: '徽章收集，激发学习动力',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  const stats = [
    { value: '500+', label: '学习单元' },
    { value: '10,000+', label: '词汇量' },
    { value: '98%', label: '用户满意度' },
    { value: '50+', label: '国家用户' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">超过100万学习者的选择</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  沉浸式多语种学习
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                从英语、日语到韩语，开启您的语言学习之旅。科学的课程体系，智能的学习工具，让语言学习变得简单有趣。
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                {isAuthenticated ? (
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                    onClick={() => navigate('/dashboard')}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    继续学习
                  </Button>
                ) : (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                        免费开始学习
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline">
                        已有账户登录
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">选择您的学习语言</h2>
            <p className="text-xl text-gray-600">支持多种主流语言，课程内容持续更新</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {languages.map((lang) => (
              <Card
                key={lang.id}
                hover
                onClick={() => {
                  if (isAuthenticated) {
                    navigate(`/dashboard?language=${lang.id}`);
                  } else {
                    navigate('/register');
                  }
                }}
                className="relative overflow-hidden group"
              >
                <div className={`absolute inset-0 ${lang.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-6xl">{lang.flag}</span>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Globe className="w-4 h-4" />
                      <span>{lang.learners} 学习者</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{lang.name}</h3>
                  <p className="text-gray-500 mb-4">{lang.nativeName}</p>
                  <p className="text-gray-600 mb-6">{lang.description}</p>

                  <div className={`inline-flex items-center space-x-2 text-sm font-medium bg-gradient-to-r ${lang.color} bg-clip-text text-transparent`}>
                    <span>开始学习</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${lang.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </Card>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">为什么选择 YiningWorld</h2>
            <p className="text-xl text-gray-600">专业的教学团队，科学的学习方法</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">准备好开始您的语言学习之旅了吗？</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              加入我们，每天只需15分钟，循序渐进掌握一门新语言
            </p>
            {isAuthenticated ? (
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => navigate('/dashboard')}
              >
                <Play className="w-5 h-5 mr-2" />
                开始学习
              </Button>
            ) : (
              <Link to="/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  免费注册
                </Button>
              </Link>
            )}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">学习成果展示</h2>
            <p className="text-xl text-gray-600">看看其他学习者怎么说</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: '张同学',
                role: '英语学习者',
                avatar: '👨‍🎓',
                content: '通过YiningWorld学习英语半年，从零基础达到了B1水平。课程设计很有趣，每天学习都不会觉得枯燥。',
                rating: 5,
              },
              {
                name: '李同学',
                role: '日语学习者',
                avatar: '👩‍💻',
                content: '特别喜欢日语课程的发音练习功能，可以实时听到自己的发音并获得反馈，对口语提升帮助很大。',
                rating: 5,
              },
              {
                name: '王同学',
                role: '韩语学习者',
                avatar: '🧑‍🎨',
                content: '追韩剧学韩语的梦想终于实现了！这里的韩语课程内容丰富，还能和其他学习者一起交流。',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{testimonial.content}</p>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
