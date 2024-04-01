import React, { createContext, useContext, ReactNode, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}

// 초기값에 해당하는 객체를 정의합니다.
const authContextDefaultValues: AuthContextType = {
  isLoggedIn: false,
  username: null,
  login: () => {},
  logout: () => {}
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const login = (username: string) => {
    setIsLoggedIn(true);
    setUsername(username);
    // 추가적인 로그인 처리 로직
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    // 추가적인 로그아웃 처리 로직
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
