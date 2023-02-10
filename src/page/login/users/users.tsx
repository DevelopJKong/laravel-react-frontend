import { useState } from 'react';
import { useQuery } from 'react-query';
import { deleteUser, getUsers } from '../../../request-method';
import { ILoginCheck } from '../../../hooks/use-login-hook';
import useLogin from '../../../hooks/use-login-hook';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IUser {
  id: number;
  email: string;
  name: string;
  created_at: string;
}

const Container = styled.div``;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2``;

const AddBtn = styled(Link).attrs(_props => {
  return {
    className: 'btn-add',
  };
})``;

const Card = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.25rem 1.5rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  // ! animated
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  // ! fadeDown
  webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
`;

const EditBtn = styled(Link).attrs(_props => {
  return {
    className: 'btn-edit',
  };
})``;

const DeleteBtn = styled.button.attrs(_props => {
  return {
    className: 'btn-delete',
  };
})``;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setLogin, logout } = useLogin() as ILoginCheck;

  const { isLoading } = useQuery(
    'getUsers',
    () =>
      getUsers().catch(error => {
        if (error.response.message.includes('401')) {
          setLogin(logout);
        }
      }),
    {
      onSuccess({ data, links, meta }) {
        1;
        // console.log(links);
        // console.log(meta);
        setUsers(data);
      },
    },
  );

  const onDelete = async (user: IUser) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    await deleteUser(user.id);
  };

  return (
    <Container>
      <Content>
        <Title></Title>
        <AddBtn to="/users/new">Add new</AddBtn>
      </Content>
      <Card>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan={5} className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {users.map((u: IUser) => (
                <tr>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at}</td>
                  <td>
                    <EditBtn to={`/users/${u.id}`}>Edit</EditBtn>
                    &nbsp;
                    <DeleteBtn onClick={() => onDelete(u)}>Delete</DeleteBtn>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </Card>
    </Container>
  );
};

export default Users;
