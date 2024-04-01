import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/signin', {
      username,
      password
    });
    return response.data; // 로그인 성공 데이터 반환
  } catch (error) {
    throw error.response.data; // 에러 발생 시 에러 데이터 반환
  }
};

export const registerUser = async (email, username, password) => {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/signup', {
      email,
      username,
      password 
    });
    return response.data; // 회원가입 성공 데이터 반환
  } catch (error) {
    throw error.response.data; // 에러 발생 시 에러 데이터 반환
  }
};
