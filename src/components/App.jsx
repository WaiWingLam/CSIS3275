import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

// App components
import Home from './Home';
import Learnskills from './Learnskills';
import Login from './Login';
import Menubar from './Menubar';
import Myaccount from './Myaccount';
import Postskills from './Postskills';
import Register from './Register';
import Admin from './Admin';
import Addcredits from './Addcredits';
import Aboutus from './Aboutus';
import Messenger from './Messenger';
import UpdateAccount from './Updateaccount';
import Error from './Error';
import Profile from './Profile'

const App = () => {

    return(
    <div className='container'>
        <Menubar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/myaccount" element={<Myaccount />} />
            <Route path="/updateaccount" element={<UpdateAccount />} />
            <Route path="/learnskills" element={<Learnskills />} />
            <Route path="/postskills" element={<Postskills />} />
            <Route path="/addcredits" element={<Addcredits />} />
            <Route path="/profile/:name" element={<Profile />} />
            {/* <Route path="messenger" element={<Messenger />} /> */}
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Error />} />
        </Routes>
    </div>
    );
};

export default App;