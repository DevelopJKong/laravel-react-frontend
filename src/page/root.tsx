import { Outlet, Link } from 'react-router-dom';
import useLogin, { ILoginCheck } from '../hooks/useLogin';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  & aside {
    width: 240px;
    background-color: #5b08a7;
    padding: 1rem;
    & > a {
      display: block;
      padding: 0.75rem 1rem;
      border-radius: 6px;
      color: white;
      text-decoration: none;
      transition: all 0.2s;
      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
`;
const Content = styled.div`
  flex: 1;
`;
const Header = styled.header`
  height: 80px;
  padding: 2rem 3rem;
  background-color: white;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MainContent = styled.main`
  padding: 2rem;
`;

const HeaderLink = styled.a`
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  color: #212121;
  transition: all 0.3s;
  border-radius: 6px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Root = () => {
  const { login, setLogin, logout } = useLogin() as ILoginCheck;
  const onLogout = () => {
    setLogin(logout);
  };
  return (
    <Container>
      {login?.token && (
        <aside>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/users">Users</Link>
        </aside>
      )}
      <Content>
        {login?.token && (
          <Header>
            <div>Header</div>
            <div>
              <span>{login.currentUser}</span>
              <HeaderLink href={'#'} onClick={onLogout}>
                Logout
              </HeaderLink>
            </div>
          </Header>
        )}
        <MainContent>
          <Outlet />
        </MainContent>
      </Content>
    </Container>
  );
};

export default Root;
