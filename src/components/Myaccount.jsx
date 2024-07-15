import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Myaccount = () => {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);



    useEffect(() => {
        const checkSession = async () => {
            try {
                var isLoggedIn = localStorage.getItem('loggedIn') === 'true';
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                // console.log(userInfo);
                // console.log(userInfo.name);
                setLoggedIn(isLoggedIn);
                setUser(userInfo);

                // if(isLoggedIn) {
                //     const response = await axios.get('http://localhost:5000/api/myaccount');
                //     console.log(response.data.user);
                //     setUser(response.data);
                // }

            } catch (error) {
                console.error('Session check fail:', error?.response?.data || error.message);
                setLoggedIn(false);
                setUser(null);
            }
        }
        checkSession();
    }, []);

    const handleLogout = async () => {
        try {
            // await axios.post('http://localhost:5000/api/logout');
            setLoggedIn(false);
            // localStorage.removeItem('loggedIn');
            localStorage.clear();
            window.location = '/';
        } catch (error) {
            console.error('Logout error:', error.response.data);
        } 
    }

    if(isLoggedIn) {
        return(
            <div>
                <h1>Hi, {user.name}</h1>
                <h2>This is my account page. You have successfully login. </h2>
                <h2>Account details:</h2>
                <h3>Name: {user.name}</h3>
                <h3>E-mail: {user.email}</h3>
                <h3>Credits available: {user.credit}</h3>
                <p></p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    } else {
        return(
            <div>
                <h1>Please log in.</h1>
            </div>
        )
    }
};

export default Myaccount;