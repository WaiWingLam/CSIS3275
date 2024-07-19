import React, { useState, useEffect } from 'react';
import axios from 'axios';

const handleLogout = () => {
    try {
        localStorage.clear();
        window.location = '/';
    } catch (error) {
        console.error('Logout error');
    } 
}

const LearnList = (props) => {
    const date = props.postDate.split('T')
    return(
    <div className='skill'>
        <div className='key'>Skill want to learn:</div>
        <div className='value'>{props.learn}</div>
        <div className='key'>Learning skill level:</div>
        <div className='value'>{props.learnLv}</div>
        <div className='key'>Skill to teach:</div>
        <div className='value'>{props.teach}</div>
        <div className='key'>Teaching skill level:</div>
        <div className='value'>{props.teachLv}</div>
        <div className='key'>Post user:</div>
        <div className='value'>{props.postName}</div>
        <div className='key'>E-mail:</div>
        <div className='value'>{props.postEmail}</div>
        <div className='key'>Preferred locations:</div>
        <div className='value'>{props.location}</div>
        <div className='key'>Post date:</div>
        <div className='value'>{date[0]}</div>
        <div className='key'>Description:</div>
        <div className='value'>{props.description}</div>
    </div>
    )
};

const Home = () => {

    const [learnList, setLearnList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/newskills')
        .then((response) => {
            setLearnList(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    return(
        <div>
            <button onClick={handleLogout}>Logout</button>
            <h1>New skills recently:</h1>
            <div className='skillcontainer'>
                    {learnList.map((learnRecord) => (
                        <LearnList 
                            key = {learnRecord._id}
                            skillId = {learnRecord._id}
                            postName = {learnRecord.postName}
                            postEmail = {learnRecord.postEmail}
                            learn = {learnRecord.learn}
                            learnLv = {learnRecord.learnLv}
                            teach = {learnRecord.teach}
                            teachLv = {learnRecord.teachLv}
                            location = {learnRecord.location}
                            postDate = {learnRecord.postDate}
                            description = {learnRecord.description}
                        />
                    ))}
                </div>             
        </div>
    )
}

export default Home;