import React from 'react';
import { NavLink } from 'react-router-dom';

const handleLogout = () => {
    try {
        localStorage.clear();
        window.location = '/';
    } catch (error) {
        console.error('Logout error');
    } 
}

const Menubar = () => {

    const userId = localStorage.getItem('userId')

    if(userId) {
        return(
            <header>
            <ul className="menu">
                <li><NavLink to ="/">Home</NavLink></li>
                <li><NavLink to ="/myaccount">My account</NavLink></li>
                <li><NavLink to ="/learnskills">Look for a skill</NavLink></li>
                <li><NavLink to ="/postskills">Post a skill</NavLink></li>
                <li onClick={handleLogout}><b>Logout</b></li>
            </ul>
            </header>
        )
    } else {
        return(
            <header>
            <ul className="menu">
                <li><NavLink to ="/">Home</NavLink></li>
                <li><NavLink to ="/login">Login</NavLink></li>
            </ul>
            </header>
        )
    }
};

export default Menubar;