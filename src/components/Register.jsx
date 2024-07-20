import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const [name, setOnChangeName] = useState(``);
    const [email, setOnChangeEmail] = useState(``);
    const [password, setOnChangePassword] = useState(``);
    const [rePassword, setOnChangeRePassword] = useState(``);

    const handleRegister = async (e) => {
        e.preventDefault();

        if(password === rePassword) {
            const registerData = {
                name: name, 
                email: email, 
                password: password 
            };
            const response = await axios.post('http://localhost:5000/api/register', registerData)
        
            if(response.data.check) {
            window.location = '/login';
            } else {
                alert('Email has been used!')
            }
        } else {
            alert('The passwords do not match!')
        } 
    }

    return (
    <div>
        <h1>Create an account</h1>
        <div className='register'>
        <form onSubmit={handleRegister}>
            Name:
            <input type='text' id='name' required value={name} onChange={(e) => setOnChangeName(e.target.value)} />
            E-mail:
            <input type='email' id='email' required value={email} onChange={(e) => setOnChangeEmail(e.target.value)} />
            Password:
            <input type='password' id='password' required value={password} onChange={(e) => setOnChangePassword(e.target.value)} />
            Confirm Password:
            <input type='password' id='repassword' required value={rePassword} onChange={(e) => setOnChangeRePassword(e.target.value)}/>
            <input type='submit' value="Register" />
        </form>
        </div>
        <p></p>
        <div><NavLink to ="/login">Already have an account? Login</NavLink></div>
    </div>
    )

};

export default Register;