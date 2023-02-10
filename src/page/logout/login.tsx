import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { unAuthClient } from '../../request-method';
import { useState } from 'react';
import { ILoginCheck } from '../../hooks/use-login-hook';
import useLogin from '../../hooks/use-login-hook';

interface IForm {
  email: string;
  password: string;
  wrongInfo?: string;
  extraServerError?: string;
}

export const Container = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Form = styled.form`
  width: 360px;
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  padding: 34px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);
`;

export const Title = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Input = styled.input``;

export const Button = styled.button`
  font-family: 'Roboto', sans-serif;
  outline: 0;
  background: #5b08a7;
  border: 0;
  text-decoration: none;
  padding: 15px;
  color: #ffffff;
  font-size: 16px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
`;

export const ButtonBlock = styled(Button)`
  width: 100%;
`;

export const Message = styled.p`
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 16px;
  text-align: center;
`;

export const MessageLink = styled(Link)`
  color: #5b08a7;
  text-decoration: none;
`;

export const ErrorText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10px;
  margin-bottom: 20px;
  color: red;
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onChange',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { setLogin } = useLogin() as ILoginCheck;
  const onValid = async (data: IForm) => {
    try {
      const { email, password } = data;
      const { data: userData } = await unAuthClient.post('/login', { email, password });
      if (!userData.ok) {
        throw new Error(userData.error);
      }
      setLogin({
        currentUser: userData.user.email,
        token: userData.token,
        refreshToken: '',
        isFetching: false,
        error: false,
      });
    } catch (error) {
      const { message }: any = error;
      switch (message) {
        case 'wrongInfo':
          setError('wrongInfo', { message });
          break;

        default:
          setError('extraServerError', { message });
          break;
      }
    }
  };

  return (
    <Container>
      <Title>LOGIN</Title>
      <Form onSubmit={handleSubmit(onValid)} onClick={() => clearErrors()}>
        <Input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: '이메일을 입력 해 주세요.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '이메일 형식이 아닙니다.',
            },
          })}
        />
        {errors?.email?.message && <ErrorText>{errors?.email?.message}</ErrorText>}
        <Input
          type="password"
          placeholder="Password"
          {...register('password', {
            required: '비밀번호를 입력 해 주세요.',
            minLength: {
              value: 6,
              message: '6자리 이상 입력 해 주세요.',
            },
          })}
        />
        {errors?.password?.message && <ErrorText>{errors?.password?.message}</ErrorText>}
        {errors?.extraServerError?.message && <ErrorText>{errors?.extraServerError?.message}</ErrorText>}
        <ButtonBlock>Login</ButtonBlock>
        <Message>
          Not registered? <MessageLink to="/sign-up">Create an account</MessageLink>
        </Message>
      </Form>
    </Container>
  );
};

export default Login;
