import { BASE_URL, HTTP_STATUS } from './components/common/constants/global.constants';
import axios from 'axios';

export const authClient = axios.create({
  baseURL: BASE_URL,
});

export const unAuthClient = axios.create({
  baseURL: BASE_URL,
});

authClient.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('Login');

    if (!token) throw new Error('LocalStorage is empty');

    const userToken = JSON.parse(token)?.token;
    const userRefreshToken = JSON.parse(token)?.refreshToken;

    // ! Authorization vs token
    if (userToken) {
      if (config.headers) {
        config.headers.token = `Bearer ${userToken}`;
        config.headers.refresh_token = `Bearer ${userRefreshToken}`; // eslint-disable-line
      }
      return config;
    } else {
      throw new Error('Token is empty');
    }
  },
  error => {
    return Promise.reject(error);
  },
);

authClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === HTTP_STATUS.UNAUTHORIZED) {
      localStorage.removeItem('Login');
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);
