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
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className="container-fluid">
                <a className="navbar-brand" style={{ fontSize: '2rem', fontWeight: 'bold' }} href="/">Swapify</a>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                    <a className="nav-link" href="/aboutus">About us</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/myaccount">My account</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/learnskills">Look for skills</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/postskills">Post a skill</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/addcredits">Add credits</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/messenger">Messenger</a>
                    </li>
                    </ul>
                    <button className="btn btn-outline-success" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>
        )
    } else {
        return(
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
            <a className="navbar-brand" href="/">Swapify</a>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                <a className="nav-link" href="/aboutus">About us</a>
                </li>
                </ul>
                <button className="btn btn-outline-success" onClick={() => window.location.href='/login'}>Login</button>
                </div>
            </div>
            </nav>
        )
    }
};

export default Menubar;