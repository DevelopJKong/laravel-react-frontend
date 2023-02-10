import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateUser, createUser } from '../../../request-method';
import { ILoginCheck } from '../../../hooks/use-login-hook';
import useLogin from '../../../hooks/use-login-hook';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as _ from 'lodash';
import { useSetRecoilState } from 'recoil';
import { notificationState } from '../../../atom';

interface IForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const Card = styled.div.attrs(_props => {
  return {
    className: 'card animated fadeInDown',
  };
})``;

const Loader = styled.div.attrs(_props => {
  return {
    className: 'text-center',
  };
})``;

const Alert = styled.div.attrs(_props => {
  return {
    className: 'alert',
  };
})``;

const Form = styled.form``;

const Input = styled.input``;

const EditBtn = styled.button.attrs(_props => {
  return {
    className: 'btn-edit',
  };
})``;

const UserForm = () => {
  const { logout, setLogin } = useLogin() as ILoginCheck;
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState('');
  const setNotification = useSetRecoilState(notificationState);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    id: 0,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    // setError,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onChange',
  });

  const onSubmit = async (data: IForm) => {
    if (data) {
      try {
        if (id) {
          await updateUser(Number(id), {
            id: Number(id),
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
          });
          setNotification("User's data has been updated");
        } else {
          await createUser({
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
          });
          setNotification("User's data has been created");
        }

        navigate('/users');
      } catch (error: any) {
        setErrorMessages('submit error');
      }
    }
  };
  useEffect(() => {
    setIsLoading(true);
    if (id) {
      const getUserData = async () => {
        try {
          const { data }: { data: IUser } = await getUser(Number(id));
          setUser(data);
        } catch (error: any) {
          if (error.response.message.include(401)) {
            setLogin(logout);
          }
        } finally {
          setIsLoading(false);
        }
      };
      getUserData();
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (id) {
      setValue('email', user?.email);
      setValue('name', user?.name);
    }
  }, [setValue, user]);
  return (
    <>
      {id ? ( // !
        user.id ? (
          <h1>Update User: {user.name}</h1>
        ) : (
          <div>Loading...</div>
        )
      ) : (
        <h1>New User</h1>
      )}
      <Card>
        {isLoading && <Loader>Loading...</Loader>}
        {(errors || errorMessages) && (
          <Alert style={_.isEmpty(errors) ? { display: 'none' } : {}}>
            {errors.name && <p>{errors.name.message}</p>}
            {errors.email && <p>{errors.email.message}</p>}
            {errors.password && <p>{errors.password.message}</p>}
            {errors.password_confirmation && <p>{errors.password_confirmation.message}</p>}
            {errorMessages && <p>{errorMessages}</p>}
          </Alert>
        )}

        {!isLoading && (
          <Form onSubmit={handleSubmit(onSubmit)} onClick={() => clearErrors()}>
            <Input
              placeholder={id ? (user.id ? 'Name' : 'Loading...') : 'Name'}
              type="text"
              {...register('name', { required: '이름은 필수 입니다.' })}
            />
            <Input
              placeholder={id ? (user.id ? 'Email' : 'Loading...') : 'Email'}
              type="email"
              {...register('email', {
                required: {
                  value: true,
                  message: '이메일은 필수 입니다.',
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '이메일 형식이 아닙니다.',
                },
              })}
            />
            <Input
              placeholder={id ? (user.id ? 'Password' : 'Loading...') : 'Password'}
              type="password"
              {...register('password', {
                required: {
                  value: true,
                  message: '비밀번호는 필수 입니다.',
                },
                minLength: {
                  value: 6,
                  message: '비밀번호는 6자리 이상이여야 합니다',
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/,
                  message: '비밀번호는 영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
                },
              })}
            />
            <Input
              placeholder={id ? (user.id ? 'Password Confirmation' : 'Loading...') : 'Password Confirmation'}
              type="password"
              {...register('password_confirmation', {
                required: {
                  value: true,
                  message: '확인 비밀번호는 필수 입니다.',
                },
                minLength: {
                  value: 6,
                  message: '확인 비밀번호는 6자리 이상이여야 합니다',
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/,
                  message: '확인 비밀번호는 영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
                },
              })}
            />
            <EditBtn>Save</EditBtn>
          </Form>
        )}
      </Card>
    </>
  );
};

export default UserForm;
