import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

const Register = () => {
    let [email, setEmail] = useState();
    let [password, setPassword] = useState();

    const handleRegister = e => {
        e.preventDefault();
        Axios({
            method: "POST",
            data: {
              email,
              password
            },
            withCredentials: true,
            url: "http://node-env.eba-dmhujuta.us-west-2.elasticbeanstalk.com/register:8080",
          }).then((res) => console.log(res));
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <br></br>
            <br></br>
            <form onSubmit={handleRegister}>
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
        </div>
    );
}
 
export default Register;