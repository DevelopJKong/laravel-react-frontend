import { RouterProvider } from 'react-router-dom';
import Router from './router';
import useLogin, { ILoginCheck } from './hooks/useLogin';

function App() {
  const { login } = useLogin() as ILoginCheck;
  const { loginRoute, logoutRoute } = Router();
  return (
    <>
      <RouterProvider router={login?.token ? loginRoute : logoutRoute} />
    </>
  );
}

export default App;
