import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NotFound from './page/not-found';
import useLogin, { ILoginCheck } from './hooks/use-login-hook';
import Home from './page/logout/home';
import Login from './page/logout/login';
import SignUp from './page/logout/sign-up';
import Root from './page/root';

interface IRouteElement {
  path: string;
  element: React.ReactNode;
}

const Router = () => {
  const { login } = useLogin() as ILoginCheck;
  localStorage.setItem('Login', JSON.stringify(login));
  // ! 로그인을 하지 않았을때 route
  const logoutRoutes = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: login?.currentUser ? <Navigate to="/" /> : <Login />,
    },
    {
      path: '/join',
      element: login?.currentUser ? <Navigate to="/" /> : <SignUp />,
    },
  ];

  const BASIC_RENDER_ELEMENT = 'BASIC_RENDER_ELEMENT';
  /**
   * @title 라우팅 컴포넌트 랜더 api
   * @description 라우팅 컴포넌트가 map api로 돌때 첫번째 랜더와 나머지를 구분해주는 api 입니다
   * @param {IRouteElement} route
   * @param {number} index
   * @returns {React.ReactElement} Route Element
   */
  const routeElementShow = (route: IRouteElement, index: number): React.ReactElement =>
    route.path === BASIC_RENDER_ELEMENT ? (
      <Route key={index} index element={route.element} />
    ) : (
      <Route key={index} path={route.path} element={route.element} />
    );

  return (
    <BrowserRouter>
      <Routes>
        {/** 로그인을 하지 않았을시 리스트 */}
        {logoutRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}

        {/** 로그인 성공 후 user-routes 리스트 */}
        <Route path="/users" element={login?.currentUser ? <Root /> : <Navigate to="/" />}>
          {userRoutes.map((route, index) => routeElementShow(route, index))}
        </Route>

        {/** 모든 라우팅 실패시 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
