import { BASE_URL, HTTP_STATUS } from './components/common/constants/global.constants';
import axios from 'axios';

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

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
    // const userRefreshToken = JSON.parse(token)?.refreshToken;

    // ! Authorization vs token
    if (userToken) {
      if (config.headers) {
        config.headers['Authorization'] = `Bearer ${userToken}`;
        // config.headers.refresh_token = `Bearer ${userRefreshToken}`; // eslint-disable-line
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

export const getUsers = async () => {
  const { data } = await authClient.get('/users');
  return data;
};

export const getUser = async (id: number) => {
  const { data } = await authClient.get(`/users/${id}`);
  return data;
};

export const deleteUser = async (id: number) => {
  return await authClient.delete(`/users/${id}`);
};

export const updateUser = async (id: number, user: IUser) => {
  return await authClient.put(`/users/${id}`, user);
};

export const createUser = async (user: ICreateUser) => {
  return await authClient.post('/users', user);
};
