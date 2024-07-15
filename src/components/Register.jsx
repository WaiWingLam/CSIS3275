import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const [name, setOnChangeName] = useState(``);
    const [email, setOnChangeEmail] = useState(``);
    const [password, setOnChangePassword] = useState(``);

    const handleRegister = async (e) => {
        e.preventDefault();
        const registerData = {
            name: name, 
            email: email, 
            password: password 
        };
        await axios.post('http://localhost:5000/api/register', registerData)
        window.location = '/login';
    }

    return (
    <div>
        <h1>Create an account</h1>
        <form onSubmit={handleRegister}>
            <b>Name: </b>
            <input type='text' id='name' required value={name} onChange={(e) => setOnChangeName(e.target.value)} />
            <p></p>
            <b>E-mail: </b>
            <input type='email' id='email' required value={email} onChange={(e) => setOnChangeEmail(e.target.value)} />
            <p></p>
            <b>Password: </b>
            <input type='password' id='password' required value={password} onChange={(e) => setOnChangePassword(e.target.value)} />
            <p></p>
            {/* <b>Confirm Password: </b>
            <input type='password' id='repassword' />
            <p></p> */}
            <input type='submit' value="Register" />
        </form>
        <p></p>
        <div><NavLink to ="/login">Already have an account? Login</NavLink></div>
    </div>
    )

};

export default Register;