import React from 'react';

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
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div class="container-fluid">
                <a class="navbar-brand" href="/">Swapify</a>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                    <a class="nav-link" href="/aboutus">About us</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/myaccount">My account</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/learnskills">Look for skills</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/postskills">Post a skill</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/addcredits">Add credits</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/messenger">Messenger</a>
                    </li>
                    </ul>
                    <button class="btn btn-outline-success" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>
        )
    } else {
        return(
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div class="container-fluid">
            <a class="navbar-brand" href="/">Swapify</a>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                <a class="nav-link" href="/aboutus">About us</a>
                </li>
                </ul>
                <button class="btn btn-outline-success" onClick={() => window.location.href='/login'}>Login</button>
                </div>
            </div>
            </nav>
        )
    }
};

export default Menubar;