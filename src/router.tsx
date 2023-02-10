import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from './page/logout/login';
import SignUp from './page/logout/sign-up';
import Users from './page/login/users/users';
import NotFound from './page/not-found';
import Root from './page/root';
import Dashboard from './page/login/dashboard';
import UserForm from './page/login/users/user-form';

const Router = () => {
  const logoutRoute = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '',
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
      element: <Root />,
      children: [
        {
          path: '',
          element: <Navigate to="/users" />,
        },
        {
          path: 'users',
          element: <Users />,
        },
        {
          path: 'users/new',
          element: <UserForm key={'userCreate'} />,
        },
        {
          path: 'users/:id',
          element: <UserForm key={'userUpdate'} />,
        },
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: '*',
          element: <Navigate to="/" />,
        },
      ],
      errorElement: <NotFound />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return { loginRoute, logoutRoute };
};

export default Router;
