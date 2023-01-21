import { useNavigate } from 'react-router-dom';
import { authClient, unAuthClient } from '../../request-method';
import { ButtonBlock, Container, Form, Input, Message, MessageLink, Title } from './login';
import { useForm } from 'react-hook-form';

interface IForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  wrongInfo?: string;
  extraServerError?: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const onValid = async (data: IForm) => {
    try {
      const { name, email, password, confirmPassword } = data;
      if (password !== confirmPassword) {
        setError('confirmPassword', {
          message: 'Password and Confirm Password do not match',
        });
        return;
      }

      const { data: userData } = await unAuthClient.post('/sign-up', { name, email, password, confirmPassword });
      if (!userData.ok) {
        const { error } = userData;
        switch (error) {
          case 'wrongInfo':
            throw new Error('wrongInfo');

          default:
            throw new Error('extraServerError');
        }
      }
      if (userData.ok) {
        navigate('/');
      }
    } catch (error) {
      const { message }: any = error; // TODO: message type 설정 필요
      switch (message) {
        case 'wrongInfo':
          setError('wrongInfo', { message: '이메일이나 비밀번호가 잘못 되었습니다' });
          break;
        default:
          setError('extraServerError', { message: 'extraServerError' });
          break;
      }
    }
  };

  return (
    <Container>
      <Title>SIGN UP</Title>
      <Form onSubmit={handleSubmit(onValid)} onClick={() => clearErrors()}>
        <Input
          type="text"
          placeholder="Full Name"
          {...register('name', {
            required: 'Full Name is required',
          })}
        />
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
        <Input
          type="password"
          placeholder="Confirm Password"
          {...register('confirmPassword', {
            required: 'Confirm Password is required',
            minLength: {
              value: 6,
              message: 'Confirm Password must have at least 6 characters',
            },
          })}
        />
        <ButtonBlock>Sign up</ButtonBlock>
        <Message>
          Already Registered? <MessageLink to="/login">Sign in</MessageLink>
        </Message>
      </Form>
    </Container>
  );
};

export default SignUp;
