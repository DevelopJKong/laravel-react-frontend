import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

export interface ILogin {
  currentUser: string;
  token: string;
  refreshToken: string;
  isFetching: boolean;
  error: boolean;
}

export const loginSuccessState = atom<ILogin>({
  key: `Login${uuidv4()}`,
  default: JSON.parse(localStorage.getItem('Login') || '{}'),
});

export const loginFailureState = atom<ILogin>({
  key: `Fail${uuidv4()}`,
  default: { currentUser: '', token: '', refreshToken: '', isFetching: false, error: true },
});

export const logoutState = atom<ILogin>({
  key: `Logout${uuidv4()}`,
  default: { currentUser: '', token: '', refreshToken: '', isFetching: false, error: false },
});

export const errorMessageState = atom<string>({
  key: `Error${uuidv4()}`,
  default: '',
});
