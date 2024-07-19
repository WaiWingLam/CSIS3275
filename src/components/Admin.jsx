import React, { useState } from 'react';
import axios from 'axios';

const handleLogout = () => {
    try {
        localStorage.clear();
        window.location = '/admin';
    } catch (error) {
        console.error('Logout error');
    } 
}



const Admin = () => {

    var admin = localStorage.getItem('admin')

    const [email, setOnChangeEmail] = useState(``);
    const [password, setOnChangePassword] = useState(``);
    const [userEmail, setOnChangeUserEmail] = useState(``);
    const [credit, setOnChangeCredit] = useState(``);

    const tryLogin = async(e) => {
        e.preventDefault();
        // const loginData = {email: email, password: password };

        if(email === 'admin' && password === 'admin') {
            admin = 'login'
            localStorage.setItem('admin', admin)
            window.location = '/admin'
        } else {
            msg.innerHTML='Wrong e-mail or password, please try again!'
        }
    }

    const handleUpdateCredit =  async (e) => {
        e.preventDefault();
    
        const newCredit = {
            email: userEmail,
            credit: credit
        };
    
        await axios.put('http://localhost:5000/admin/creditupdate/', newCredit)
        .then(window.location = '/admin');
    }

    if(admin === 'login') {
        return(
            <div>
                <h1>You have logged in.</h1>
                <button onClick={handleLogout}>Logout</button>
                <hr />
                <h1>Update credit: </h1>
                <form onSubmit={handleUpdateCredit}>
                    <b>User email: </b>
                    <input type='text' id='userEmail' required value={userEmail} onChange={(e) => setOnChangeUserEmail(e.target.value)} />
                    <p></p>
                    <b>New credit: </b>
                    <input type='text' id='credit' required value={credit} onChange={(e) => setOnChangeCredit(e.target.value)} />
                    <p></p>
                    <input type='submit' value="Update" />
                </form>
                
            </div>
        )
    } else {
    return(
        <div>
        <h1>Admin Login:</h1>
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
    </div>
    )
    }
}

export default Admin;