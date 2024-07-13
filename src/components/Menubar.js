import React from 'react';
import { NavLink } from 'react-router-dom';

const Menubar = () => (
    <header>
        <ul className="menu">
            <li><NavLink to ="/">Home</NavLink></li>
            <li><NavLink to ="/login">Login</NavLink></li>
            <li><NavLink to ="/myaccount">My account</NavLink></li>
            <li><NavLink to ="/learnskills">Look for a skill</NavLink></li>
            <li><NavLink to ="/postskills">Teach a skill</NavLink></li>
        </ul>
    </header>
);

export default Menubar;