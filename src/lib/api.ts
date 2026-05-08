const API_BASE_URL = 'http://localhost:3001/api';

class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '请求失败');
    }

    return response.json();
  }

  // 认证相关
  async register(email: string, username: string, password: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, username, password }),
    });
  }

  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getMe() {
    return this.request('/auth/me');
  }

  async updateMe(data: { username?: string; avatar?: string }) {
    return this.request('/auth/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async addXP(amount: number) {
    return this.request('/auth/xp', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  }

  async updateStreak() {
    return this.request('/auth/streak', {
      method: 'POST',
    });
  }

  // 学习进度相关
  async getProgress() {
    return this.request('/progress');
  }

  async getProgressByLanguage(language: string) {
    return this.request(`/progress/${language}`);
  }

  async updateVocabulary(language: string, learned: number) {
    return this.request(`/progress/${language}/vocabulary`, {
      method: 'POST',
      body: JSON.stringify({ learned }),
    });
  }

  async updateGrammar(language: string, completed: number, accuracy: number) {
    return this.request(`/progress/${language}/grammar`, {
      method: 'POST',
      body: JSON.stringify({ completed, accuracy }),
    });
  }

  async updateSpeaking(language: string, score: number) {
    return this.request(`/progress/${language}/speaking`, {
      method: 'POST',
      body: JSON.stringify({ score }),
    });
  }

  async updateListening(language: string, score: number) {
    return this.request(`/progress/${language}/listening`, {
      method: 'POST',
      body: JSON.stringify({ score }),
    });
  }

  async addProgressXP(language: string, amount: number) {
    return this.request(`/progress/${language}/xp`, {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  }

  // 成就相关
  async getAchievements() {
    return this.request('/achievements');
  }

  async getMyAchievements() {
    return this.request('/achievements/my');
  }

  async checkAchievements(stats: any) {
    return this.request('/achievements/check', {
      method: 'POST',
      body: JSON.stringify({ stats }),
    });
  }

  // 社区相关
  async getPosts(language?: string) {
    const query = language ? `?language=${language}` : '';
    return this.request(`/community/posts${query}`);
  }

  async createPost(title: string, content: string, language: string, tags: string[]) {
    return this.request('/community/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content, language, tags }),
    });
  }

  async likePost(postId: string) {
    return this.request(`/community/posts/${postId}/like`, {
      method: 'POST',
    });
  }

  async getGroups(language?: string) {
    const query = language ? `?language=${language}` : '';
    return this.request(`/community/groups${query}`);
  }
}

export const api = new ApiClient();
