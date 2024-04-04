import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from './services/AutoService'; // getCurrentUser 함수가 위치한 경로를 정확히 지정해야 합니다.

const ProtectedRoute = ({ roles }) => {
  const currentUser = getCurrentUser(); // 현재 사용자 정보 가져오기

  // 사용자가 로그인하지 않았다면 로그인 페이지로 리다이렉션
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // 사용자가 필요한 역할 중 하나 이상을 가지고 있다면 해당 페이지 접근 허용 (Outlet 렌더링)
  if (roles.some(role => currentUser.roles.includes(role))) {
    return <Outlet />;
  } else {
    // 사용자가 필요한 역할을 가지고 있지 않다면 홈페이지로 리다이렉션
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
