import { Link } from "react-router-dom"
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components'

const Register = () => {
    return (
        <Wrapper>
            <form className="form">
                <Logo />
                <h4>Register</h4>
                <FormRow
                    type="text"
                    name="firstName"
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
                <button type="submit" className="btn btn-block">Register</button>
                <p>
                    Already a member?
                    <Link to="/login" className="member-btn">Login</Link>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register
