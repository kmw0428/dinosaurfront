// token.js
const getAccessToken = () => {
    const accessToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('dinosaurpark='))
      ?.split('=')[1];
    return accessToken;
  };
  
  const getRefreshToken = () => {
    const refreshToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('dinosaurpark-refresh='))
      ?.split('=')[1];
    return refreshToken;
  };
  
  export { getAccessToken, getRefreshToken };
  