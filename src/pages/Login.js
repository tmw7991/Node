import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

const Login = () => {
    let [email, setEmail] = useState();
    let [password, setPassword] = useState();

    const handleLogin = e => {
        e.preventDefault();
        Axios({
            method: "POST",
            data: {
              email,
              password
            },
            withCredentials: true,
            url: "http://localhost:5000/login",
          }).then((res) => console.log(res));
    }

    const getUser = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/user",
          }).then((res) => console.log(res));
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <br></br>
            <br></br>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email: </label>
                <input name="email" type="email" onChange={e => setEmail(e.target.value)} />
                <br></br>
                <br></br>
                <label htmlFor="password">Password: </label>
                <input name="password" type="text" onChange={e => setPassword(e.target.value)} />
                <br></br>
                <br></br>
                <button type="submit">Submit</button>
            </form>
        <br></br>
            <button onClick={getUser}>Get User</button>
        </div>
    );
}
 
export default Login;