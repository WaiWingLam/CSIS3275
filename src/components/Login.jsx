import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [email, setOnChangeEmail] = useState(``);
    const [password, setOnChangePassword] = useState(``);

    const userId = localStorage.getItem('userId')
    const msg = document.getElementById('wrongmsg')

    const tryLogin = async (e) => {
        e.preventDefault();
        const loginData = {email: email, password: password };

        try{
            const response = await axios.post('http://localhost:5000/api/login', loginData)
            // console.log('/login: ', response.data.userId);

            if(response.data.userId) { //check if logged in
                console.log(response.data)
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('userEmail', response.data.userEmail);
                window.location = '/myaccount';
            } else {
                localStorage.clear(); // prevent bugs
                alert(`Wrong e-mail or password, please try again!`)
            }
        } catch(error) {
            console.error('Login error: ', error);
        }
    }

    return(
    <div>
        <h1>Login:</h1>
        <div className='login'>
        <form onSubmit={tryLogin}>
            E-mail:
            <input type="text" id='email' required value={email} onChange={(e) => setOnChangeEmail(e.target.value)} />
            Password:
            <input type="password" id='password' required value={password} onChange={(e) => setOnChangePassword(e.target.value)} />
            <p></p>
            <input type="submit" value="Login" />
        </form>
        </div>
        <div><NavLink to ="/register">Register</NavLink></div>
    </div>
    )
};

export default Login;