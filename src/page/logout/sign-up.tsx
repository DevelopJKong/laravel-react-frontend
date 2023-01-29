import { useNavigate } from 'react-router-dom';
import { unAuthClient } from '../../request-method';
import { ButtonBlock, Container, Form, Input, Message, MessageLink, Title, ErrorText } from './login';
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
            required: '이름을 작성 해 주세요.',
          })}
        />
        {errors?.name?.message && <ErrorText>{errors.name.message}</ErrorText>}
        <Input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: '이메일을 작성 해 주세요.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '이메일 형식이 아닙니다.',
            },
          })}
        />
        {errors?.email?.message && <ErrorText>{errors.email.message}</ErrorText>}
        <Input
          type="password"
          placeholder="Password"
          {...register('password', {
            required: '비밀번호를 작성 해 주세요.',
            minLength: {
              value: 6,
              message: '6자리 이상 작성 해 주세요.',
            },
          })}
        />
        {errors?.password?.message && <ErrorText>{errors.password.message}</ErrorText>}
        <Input
          type="password"
          placeholder="Confirm Password"
          {...register('confirmPassword', {
            required: '확인 비밀번호를 작성 해 주세요.',
            minLength: {
              value: 6,
              message: '6자리 이상 작성 해 주세요.',
            },
          })}
        />
        {errors?.confirmPassword?.message && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
        <ButtonBlock>Sign up</ButtonBlock>
        <Message>
          Already Registered? <MessageLink to="/login">Sign in</MessageLink>
        </Message>
      </Form>
    </Container>
  );
};

export default SignUp;
