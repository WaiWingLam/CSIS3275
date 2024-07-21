import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Messenger = () => {

    const userId = localStorage.getItem('userId')

    if(userId) {
        return(
            <div class="py-5 text-center">
            <h2>Messenger</h2>
            <p class="lead">Please remind the messages are not encrypted. DO NOT send any personal information.</p>
        </div>    
        )
    } else {
        return(
            <div>
                <h1>Please log in.</h1>
            </div>
        )
    }
}

export default Messenger;