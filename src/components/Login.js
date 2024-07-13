import React from 'react';
import { NavLink } from 'react-router-dom';

const Login = () => (
    <div>
        <h1>Login:</h1>
        <form>
            <b>E-mail: </b>
            <input type="text" />
            <p></p>
            <b>Password: </b>
            <input type="password" />
            <p></p>
            <input type="submit" value="Login" />
        </form>
        <p></p>
        <div><NavLink to ="/register">Register</NavLink></div>
    </div>
);

export default Login;