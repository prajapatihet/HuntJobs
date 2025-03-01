import { Form, redirect, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration Successful');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow
          type="text"
          name="name"
          placeholder="Enter First Name"
          labelText="First Name"
        />
        <FormRow
          type="text"
          name="lastName"
          placeholder="Enter Last Name"
          labelText="Last Name"
        />
        <FormRow
          type="text"
          name="location"
          placeholder="Enter Location"
          labelText="Location"
        />
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
        <SubmitBtn text="Register" load="Please wait..." />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
