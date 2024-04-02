import axios from 'axios';

const API_URL = "http://localhost:8080/api/auth/";

export const loginUser = async (username, password) => {
  return await axios.post(API_URL + 'signin', {
      username,
      password
    }, { withCredentials: true })
    .then((response) => {
      if (response.data.username) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  });
};

export const registerUser = async (email, username, password) => {
  try {
    const response = await axios.post(API_URL + 'signup', {
      email,
      username,
      password 
    });
    return response.data; // 회원가입 성공 데이터 반환
  } catch (error) {
    throw error.response.data; // 에러 발생 시 에러 데이터 반환
  }
};

export const logoutUser = async () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + 'signout').then((response) => {
    return response.data;
  });
};