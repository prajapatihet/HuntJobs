import {
  Link,
  redirect,
  Form,
  useActionData,
  useNavigate,
} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const errors = { msg: '' };
    if (data.password.length < 6) {
      errors.msg = 'Password is too short';
      return errors;
    }
    try {
      await customFetch.post('/auth/login', data);
      queryClient.invalidateQueries();
      toast.success('Login Successful');
      return redirect('/dashboard');
    } catch (error) {
      // toast.error(error?.response?.data?.msg);
      errors.msg = error?.response?.data?.msg;
      // console.log(error);
      return errors;
    }
  };

const Login = () => {
  const errors = useActionData();
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const tempData = {
      email: 'test@gmail.com',
      password: 'secret123',
    };
    try {
      await customFetch.post('/auth/login', tempData);
      toast.success('Explore the Application');
      navigate('/dashboard');
    } catch (error) {
      // toast.error(error?.response?.data?.msg);
      errors.msg = error?.response?.data?.msg;

      return errors;
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        {errors?.msg && <div style={{ color: 'red' }}>{errors.msg}</div>}
        <FormRow
          type="email"
          name="email"
          placeholder="e.g. xyz@gmail.com"
          labelText="Email"
        />
        <FormRow
          type="password"
          name="password"
          placeholder="Enter Password"
          labelText="Password"
        />
        <SubmitBtn text="Login" load="Please wait..." />
        {/* <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          Explore the app
        </button> */}
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
