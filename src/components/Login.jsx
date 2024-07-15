import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setOnChangeEmail] = useState(``);
    const [password, setOnChangePassword] = useState(``);

    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const msg = document.getElementById('wrongmsg')

    if(isLoggedIn) {
        window.location = '/myaccount'
    }

    const tryLogin = async (e) => {
        e.preventDefault();
        const loginData = {email: email, password: password };

        try{
            const response = await axios.post('http://localhost:5000/api/login', loginData)
            console.log(response.data.user);
            if(response.data.user) {
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('userInfo', JSON.stringify(response.data.user));
            window.location = '/myaccount';
            } else {
                msg.innerHTML='Wrong e-mail or password, please try again!'
            }
        } catch(error) {
            console.error('Login error:', error);
        }

    }

    return(
    <div>
        <h1>Login:</h1>
        <form onSubmit={tryLogin}>
            <b>E-mail: </b>
            <input type="text" id='email' required value={email} onChange={(e) => setOnChangeEmail(e.target.value)} />
            <p></p>
            <b>Password: </b>
            <input type="password" id='password' required value={password} onChange={(e) => setOnChangePassword(e.target.value)} />
            <p></p>
            <input type="submit" value="Login" />
        </form>
        <p></p>
        <div id='wrongmsg'></div>
        <p></p>
        <div><NavLink to ="/register">Register</NavLink></div>
    </div>
    )
};

export default Login;