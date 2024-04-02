import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginUser = (username, password) => {
        // 로그인 로직 구현
        setIsLoggedIn(true);
    };

    const logoutUser = () => {
        // 로그아웃 로직 구현
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
