import { useState } from 'react';
import { useQuery } from 'react-query';
import { getUsers } from '../../request-method';
import { ILoginCheck } from '../../hooks/use-login-hook';
import useLogin from '../../hooks/use-login-hook';

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
      onSuccess(data) {
        setUsers(data);
      },
    },
  );

  return <div>users</div>;
};

export default Users;
