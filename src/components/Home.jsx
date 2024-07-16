import React from 'react';

const handleLogout = () => {
    try {
        localStorage.clear();
        window.location = '/';
    } catch (error) {
        console.error('Logout error');
    } 
}

const Home = () => {
    return(
        <div>
            <h1>This is home page.</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home;