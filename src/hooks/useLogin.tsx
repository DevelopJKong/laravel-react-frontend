import { useRecoilState, useRecoilValue, SetterOrUpdater } from 'recoil';
import { ILogin, loginSuccessState, logoutState } from '../atom';

export interface ILoginCheck {
  login: ILogin;
  setLogin: SetterOrUpdater<ILogin>;
  logout: ILogin;
}

const useLogin = () => {
  const [login, setLogin] = useRecoilState(loginSuccessState);
  const logout = useRecoilValue(logoutState);

  return { login, setLogin, logout };
};

export default useLogin;
