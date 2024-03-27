import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { loginUser, registerUser } from "../../services/AutoService";

// 함수 컴포넌트의 이름은 대문자로 시작해야 하며, `function` 키워드를 사용하거나 화살표 함수로 정의할 수 있습니다.
const Loginpg: React.FC = () => {
  // useState에 타입 적용
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true); // 로그인 폼과 가입 폼을 토글하기 위한 상태

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const isEmployee = username.startsWith("emp-");
    
    try {
      const response = await loginUser(username, password);
      console.log("Login successful", response);
      if (isEmployee) {
        navigate("/todolist");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };
  
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await registerUser(name, username, password); // API 호출 시 객체를 전달
      console.log("Registration successful", response);
      navigate("/login");
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  const toggleForm = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    e.preventDefault();
    setIsLoginForm(!isLoginForm);
  };
  
  return (
    <div className="login-box">
      {isLoginForm ? (
        <div className="login">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="user-box">
              <input type="email" id="login-username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <label htmlFor="login-username">Username</label>
            </div>
            <div className="user-box">
              <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <label htmlFor="login-password">Password</label>
            </div>
            <button type="submit" className="login-button">LOGIN</button>
            <p className="message">Not registered? <a href="#" onClick={toggleForm} className="change">Create an account</a></p>
          </form>
        </div>
      ) : (
        <div className="signup">
          <h2>Sign Up</h2>
          <form className="signup-form" onSubmit={handleRegister}>
            <div className="user-box">
              <input type="text" id="signup-name" value={name} onChange={(e) => setName(e.target.value)} required />
              <label htmlFor="signup-name">Name</label>
            </div>
            <div className="user-box">
              <input type="password" id="signup-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <label htmlFor="signup-password">Password</label>
            </div>
            <div className="user-box">
              <input type="email" id="signup-username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <label htmlFor="signup-username">Email address</label>
            </div>
            <button type="submit" className="signup-button">CREATE</button>
            <p className="message">Already registered? <a href="#" onClick={toggleForm}>Sign In</a></p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Loginpg;