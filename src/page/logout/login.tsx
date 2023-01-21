import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const Login = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data: any) => {};

  return (
    <Container>
      <Title>LOGIN</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        <Input
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must have at least 6 characters',
            },
          })}
        />
        <ButtonBlock>Login</ButtonBlock>
        <Message>
          Not registered? <MessageLink to="/sign-up">Create an account</MessageLink>
        </Message>
      </Form>
    </Container>
  );
};

export default Login;
