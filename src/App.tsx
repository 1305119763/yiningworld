import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore, useProgressStore, useAchievementStore, useCommunityStore } from './store';
import {
  Home,
  Login,
  Register,
  Dashboard,
  Vocabulary,
  Grammar,
  Speaking,
  Listening,
  Community,
  Achievements,
  Profile,
} from './pages';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const { loadUser, isAuthenticated } = useAuthStore();
  const { fetchProgress } = useProgressStore();
  const { fetchMyAchievements } = useAchievementStore();
  const { fetchPosts, fetchGroups } = useCommunityStore();

  // 应用启动时加载用户数据
  useEffect(() => {
    const initApp = async () => {
      await loadUser();
    };
    initApp();
  }, [loadUser]);

  // 用户登录后加载相关数据
  useEffect(() => {
    if (isAuthenticated) {
      fetchProgress();
      fetchMyAchievements();
      fetchPosts();
      fetchGroups();
    }
  }, [isAuthenticated, fetchProgress, fetchMyAchievements, fetchPosts, fetchGroups]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vocabulary"
          element={
            <ProtectedRoute>
              <Vocabulary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/grammar"
          element={
            <ProtectedRoute>
              <Grammar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/speaking"
          element={
            <ProtectedRoute>
              <Speaking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listening"
          element={
            <ProtectedRoute>
              <Listening />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          }
        />
        <Route
          path="/achievements"
          element={
            <ProtectedRoute>
              <Achievements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
