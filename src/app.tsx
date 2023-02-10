import { RouterProvider } from 'react-router-dom';
import Router from './router';
import useLogin, { ILoginCheck } from './hooks/use-login-hook';

function App() {
  const { loginRoute, logoutRoute } = Router();
  const { login } = useLogin() as ILoginCheck;
  localStorage.setItem('Login', JSON.stringify(login));
  return (
    <>
      <RouterProvider router={login?.token ? loginRoute : logoutRoute} />
    </>
  );
}

export default App;
