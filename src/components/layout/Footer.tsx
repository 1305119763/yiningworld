import React from 'react';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-white border-t border-gray-200 mt-auto ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LW</span>
              </div>
              <span className="text-lg font-bold text-gray-900">YiningWorld</span>
            </div>
            <p className="text-sm text-gray-600">
              沉浸式多语种学习平台，让语言学习变得简单有趣。
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">学习资源</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">英语课程</a></li>
              <li><a href="#" className="hover:text-blue-600">日语课程</a></li>
              <li><a href="#" className="hover:text-blue-600">韩语课程</a></li>
              <li><a href="#" className="hover:text-blue-600">学习工具</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">关于我们</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">公司介绍</a></li>
              <li><a href="#" className="hover:text-blue-600">加入团队</a></li>
              <li><a href="#" className="hover:text-blue-600">联系我们</a></li>
              <li><a href="#" className="hover:text-blue-600">用户反馈</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">法律信息</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">服务条款</a></li>
              <li><a href="#" className="hover:text-blue-600">隐私政策</a></li>
              <li><a href="#" className="hover:text-blue-600">Cookie政策</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © 2024 YiningWorld. 保留所有权利。
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              微博
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              微信
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              抖音
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
