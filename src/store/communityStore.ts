import { create } from 'zustand';
import type { CommunityPost, CommunityGroup } from '../types';
import { api } from '../lib/api';

interface CommunityState {
  posts: CommunityPost[];
  groups: CommunityGroup[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: (language?: string) => Promise<void>;
  fetchGroups: (language?: string) => Promise<void>;
  addPost: (post: Omit<CommunityPost, 'id' | 'createdAt' | 'likes' | 'comments'>) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  getPostsByLanguage: (language: string) => CommunityPost[];
}

export const useCommunityStore = create<CommunityState>()((set, get) => ({
  posts: [],
  groups: [],
  isLoading: false,
  error: null,

  fetchPosts: async (language?: string) => {
    set({ isLoading: true, error: null });
    try {
      const posts = await api.getPosts(language);
      set({ posts, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || '获取帖子失败', isLoading: false });
    }
  },

  fetchGroups: async (language?: string) => {
    set({ isLoading: true, error: null });
    try {
      const groups = await api.getGroups(language);
      set({ groups, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || '获取群组失败', isLoading: false });
    }
  },

  addPost: async (post) => {
    set({ isLoading: true, error: null });
    try {
      const newPost = await api.createPost(post.title, post.content, post.language, post.tags || []);
      set((state) => ({ 
        posts: [newPost, ...state.posts],
        isLoading: false 
      }));
    } catch (error: any) {
      set({ error: error.message || '发布帖子失败', isLoading: false });
    }
  },

  likePost: async (postId) => {
    try {
      await api.likePost(postId);
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        ),
      }));
    } catch (error: any) {
      console.error('点赞失败:', error);
    }
  },

  getPostsByLanguage: (language) => {
    if (language === 'all') return get().posts;
    return get().posts.filter((post) => post.language === language);
  },
}));
