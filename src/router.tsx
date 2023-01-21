import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from './page/logout/login';
import SignUp from './page/logout/sign-up';
import Users from './page/login/users';
import NotFound from './page/not-found';
import Home from './page/logout/home';
import Root from './page/root';
import Main from './page/login/main';
import Dashboard from './page/login/dashboard';
import useLogin, { ILoginCheck } from './hooks/useLogin';

const Router = () => {
  const { login } = useLogin() as ILoginCheck;
  localStorage.setItem('Login', JSON.stringify(login));
  const logoutRoute = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'sign-up',
          element: <SignUp />,
        },
      ],
      errorElement: <Navigate to="/" />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  const loginRoute = createBrowserRouter([
    {
      path: '/',
      element: login?.currentUser ? <Root /> : <Navigate to="/" />,
      children: [
        {
          path: '',
          element: <Navigate to="/main" />,
        },
        {
          path: 'main',
          element: <Main />,
        },
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'users',
          element: <Users />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return { loginRoute, logoutRoute };
};

export default Router;
