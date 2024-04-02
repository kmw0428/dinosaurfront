import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { loginUser, registerUser } from "../../services/AutoService";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getCookie } from "typescript-cookie"; // universal-cookie 라이브러리 import

// 함수 컴포넌트의 이름은 대문자로 시작해야 하며, `function` 키워드를 사용하거나 화살표 함수로 정의할 수 있습니다.
const Loginpg: React.FC = () => {
  // useState에 타입 적용
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // 비밀번호 확인을 위한 상태
  const [passwordError, setPasswordError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true); // 로그인 폼과 가입 폼을 토글하기 위한 상태
  const MySwal = withReactContent(Swal);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const passwordRegex = /^.{6,}$/;

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const validatePass = () => {
    if (!passwordRegex.test(password)) {
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }
  };

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const isEmployee = username.startsWith("emp");

    try {
      const response = await loginUser(username, password);
      // 로그인이 성공하고 서버에서 토큰을 반환한 경우
      console.log("Login successful", response);
      // 토큰을 로컬 스토리지에 저장합니다.
      console.log("로그인 성공");
      // 로그인 상태 관리 로직 실행 (예: 상태 업데이트)
      navigate(isEmployee ? "/todolist" : "/");
      window.location.reload();
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login Error...",
        confirmButtonText: "Confirm",
      });
    }
  };

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      axios
        .get("/api/auth/signin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          console.log("User profile:", response.data);
          // 여기에서 사용자 정보를 상태 변수에 설정하는 로직을 추가할 수 있습니다.
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          // 에러 처리 로직을 추가할 수 있습니다. 예를 들어, 토큰이 유효하지 않다면 로그아웃 처리 등
        });
    }
  }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시에만 실행되도록 합니다.

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (password !== confirmPassword) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match.",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      const response = await registerUser(email, username, password); // API 호출 시 객체를 전달
      console.log("Registration successful", response);
      MySwal.fire({
        icon: "success",
        title: "Registration successful!",
        text: "You can now login",
        confirmButtonText: "Ok",
      }).then(() => {
        window.location.replace("/login");
      });
    } catch (error) {
      const errorObj: Error = error as Error;
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Registration failed: " + errorObj.message,
        confirmButtonText: "Ok",
      });
    }
  };

  const toggleForm = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
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
              <input
                type="username"
                id="login-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="login-username">ID</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePass} // onBlur 이벤트 핸들러 추가
                required
              />
              {passwordErr && (
                <p className="error-message">
                  Password must be at least 6 characters long.
                </p>
              )}
              <label htmlFor="login-password">Password</label>
            </div>
            <button type="submit" className="login-button">
              LOGIN
            </button>
            <p className="message">
              Not registered?{" "}
              <a href="#" onClick={toggleForm} className="change">
                Create an account
              </a>
            </p>
          </form>
        </div>
      ) : (
        <div className="signup">
          <h2>Sign Up</h2>
          <form className="signup-form" onSubmit={handleRegister}>
            <div className="user-box">
              <input
                type="email"
                id="signup-name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="signup-name">Email</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                id="signup-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="signup-username">ID</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                id="signup-password"
                value={password}
                onBlur={validatePass} // onBlur 이벤트 핸들러 추가
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="signup-password">Password</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                id="signup-confirm-password"
                value={confirmPassword}
                onBlur={validatePass} // onBlur 이벤트 핸들러 추가
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {passwordErr && (
                <p className="error-message">
                  Password must be at least 6 characters long.
                </p>
              )}
              <label htmlFor="signup-confirm-password">Confirm Password</label>
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
            <button type="submit" className="signup-button">
              CREATE
            </button>
            <p className="message">
              Already registered?{" "}
              <a href="" onClick={toggleForm}>
                Sign In
              </a>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Loginpg;
