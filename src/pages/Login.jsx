import { Link } from "react-router-dom"
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components'

const Login = () => {
    return (
        <Wrapper>
            <form className="form">
                <Logo />
                <h4>Login</h4>
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
                <button type="submit" className="btn btn-block">Login</button>
                <button type="button" className="btn btn-block">Explore the app</button>
                <p>
                    Not a member yet?
                    <Link to="/register" className="member-btn">Register</Link>
                </p>
            </form>
        </Wrapper>
    )
}

export default Login
