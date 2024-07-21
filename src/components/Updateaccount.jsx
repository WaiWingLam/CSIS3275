import React, { useState } from 'react';
import axios from 'axios';

const UpdateAccount = () => {

    const [name, setOnChangeName] = useState(``);
    const [reName, setOnChangeReName] = useState(``);
    const [password, setOnChangePassword] = useState(``);
    const [rePassword, setOnChangeRePassword] = useState(``);
    
    // Get back userId and email
    const userId = localStorage.getItem('userId')
    const userEmail = localStorage.getItem('userEmail')
    // console.log('/learnskills: ', userId, userEmail)

    const handleUpdateName = async (e) => {
        e.preventDefault();

        if(name === reName) {

            const updateData = {
                userId: userId,
                name: name
            };

            const response = await axios.put('http://localhost:5000/api/update/name', updateData)
            .then(window.location = '/myaccount');

        } else {
            alert('The names do not match!')
        } 
    }

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        if(password === rePassword) {

            const updateData = {
                userId: userId,
                password: password 
            };

            const response = await axios.put('http://localhost:5000/api/update/password', updateData)
            .then(alert('Password updated! Please login again!'))
            .then(localStorage.clear())
            .then(window.location='/login')

        } else {
            alert('The passwords do not match!')
        } 
    }

    if(userId) {
    return (
    <div>
        <h1>Update your information:</h1>
        <div className='register'>
        <form onSubmit={handleUpdateName}>
            <input type='hidden' id='userId' value={userId}/>
            Name: (Please remind the skills already posted are still remains your original name)
            <input type='text' id='name' value={name} onChange={(e) => setOnChangeName(e.target.value)} />
            Confirm name:
            <input type='text' id='rename' value={reName} onChange={(e) => setOnChangeReName(e.target.value)} />
            <input className="btn btn-primary" type='submit' value="Update Name" />
        </form>

        <br /><br />

        <form onSubmit={handleUpdatePassword}>
            <input type='hidden' id='userId' value={userId}/>
            Password:
            <input type='password' id='password' value={password} onChange={(e) => setOnChangePassword(e.target.value)} />
            Confirm Password:
            <input type='password' id='repassword' value={rePassword} onChange={(e) => setOnChangeRePassword(e.target.value)}/>
            <input className="btn btn-primary" type='submit' value="Update Password" />
        </form>
        </div>
        <p></p>
    </div>
    )
    } else { // not yet logged in
    return(
        <div>
            <h1>Please log in.</h1>
        </div>
    )
}

};

export default UpdateAccount;