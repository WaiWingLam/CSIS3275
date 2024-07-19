import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

// App components
import Home from './Home';
import Learnskills from './Learnskills';
import Login from './Login';
import Menubar from './Menubar';
import Myaccount from './Myaccount';
import Postskills from './Postskills';
import Register from './Register';
import Admin from './Admin';

const App = () => {

    return(
    <div className='container'>
        <Menubar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/myaccount" element={<Myaccount />} />
            <Route path="/learnskills" element={<Learnskills />} />
            <Route path="/postskills" element={<Postskills />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    </div>
    );
};

export default App;