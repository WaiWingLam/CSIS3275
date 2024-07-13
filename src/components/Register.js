import React from 'react';
import { NavLink } from 'react-router-dom';

const Register = () => (
    <div>
        <h1>Create an account</h1>
        <form>
            <b>Name: </b>
            <input type="text" />
            <p></p>
            <b>E-mail: </b>
            <input type="text" />
            <p></p>
            <b>Password: </b>
            <input type="password" />
            <p></p>
            <b>Confirm Password: </b>
            <input type="password" />
            <p></p>
            <input type="submit" value="Register" />
        </form>
        <p></p>
        <div><NavLink to ="/login">Already have an account? Login</NavLink></div>
    </div>
);

export default Register;