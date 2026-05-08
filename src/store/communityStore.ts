import { create } from 'zustand';
import type { CommunityPost, CommunityGroup } from '../types';

interface CommunityState {
  posts: CommunityPost[];
  groups: CommunityGroup[];
  addPost: (post: Omit<CommunityPost, 'id' | 'createdAt' | 'likes' | 'comments'>) => void;
  likePost: (postId: string) => void;
  getPostsByLanguage: (language: string) => CommunityPost[];
}

const mockGroups: CommunityGroup[] = [
  {
    id: 'en_beginners',
    name: '英语初学者联盟',
    description: '帮助英语学习新手入门',
    language: 'en',
    memberCount: 1234,
  },
  {
    id: 'ja_culture',
    name: '日语文化探索',
    description: '一起探索日本文化',
    language: 'ja',
    memberCount: 856,
  },
  {
    id: 'ko_hangle',
    name: '韩语拼音学习',
    description: '韩语四十音学习小组',
    language: 'ko',
    memberCount: 967,
  },
  {
    id: 'en_business',
    name: '商务英语交流',
    description: '职场英语实战交流',
    language: 'en',
    memberCount: 654,
  },
];

const mockPosts: CommunityPost[] = [
  {
    id: '1',
    authorId: 'user1',
    authorName: '英语爱好者',
    language: 'en',
    title: '分享我的英语学习计划',
    content: '坚持每天学习2小时，用三个月达到流利沟通...',
    likes: 45,
    comments: 12,
    createdAt: '2024-01-15T10:30:00Z',
    tags: ['学习计划', '经验分享'],
  },
  {
    id: '2',
    authorId: 'user2',
    authorName: '日语学习者',
    language: 'ja',
    title: 'JLPT N2备考心得',
    content: '词汇量是基础，听力练习最重要...',
    likes: 78,
    comments: 23,
    createdAt: '2024-01-14T15:20:00Z',
    tags: ['JLPT', '备考'],
  },
  {
    id: '3',
    authorId: 'user3',
    authorName: '韩语达人',
    language: 'ko',
    title: '韩语发音技巧分享',
    content: 'ㅇ和ㅎ的发音区别，ㅂㅈㄷㄱ的发音规则...',
    likes: 156,
    comments: 45,
    createdAt: '2024-01-13T09:15:00Z',
    tags: ['发音', '技巧'],
  },
];

export const useCommunityStore = create<CommunityState>()((set, get) => ({
  posts: mockPosts,
  groups: mockGroups,

  addPost: (post) => {
    const newPost: CommunityPost = {
      ...post,
      id: Math.random().toString(36).substring(2, 15),
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ posts: [newPost, ...state.posts] }));
  },

  likePost: (postId) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ),
    }));
  },

  getPostsByLanguage: (language) => {
    if (language === 'all') return get().posts;
    return get().posts.filter((post) => post.language === language);
  },
}));
