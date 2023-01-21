import { RouterProvider } from 'react-router-dom';
import Router from './router';

function App() {
  const { loginRoute, logoutRoute } = Router();
  const check = true;
  return (
    <>
      <RouterProvider router={check ? loginRoute : logoutRoute} />
    </>
  );
}

export default App;
