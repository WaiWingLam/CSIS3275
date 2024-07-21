import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LearnList = (props) => {
    const date = props.postDate.split('T')
    return(
        <div className='skill'>
        <div className='col-sm-4'>Want to learn:</div>
        <div className='col-sm-8'>{props.learn}</div>
        <p></p>
        <div className='col-sm-4'>Level:</div>
        <div className='col-sm-8'>{props.learnLv}</div>
        <p></p>
        <div className='col-sm-4'>Can teach:</div>
        <div className='col-sm-8'>{props.teach}</div>
        <p></p>
        <div className='col-sm-4'>Level:</div>
        <div className='col-sm-8'>{props.teachLv}</div>
        <p></p>
        <div className='col-sm-4'>Post user:</div>
        <div className='col-sm-8'>{props.postName}</div>
        <p></p>
        <div className='col-sm-4'>E-mail:</div>
        <div className='col-sm-8'>{props.postEmail}</div>
        <p></p>
        <div className='col-sm-4'>Preferred locations:</div>
        <div className='col-sm-8'>{props.location}</div>
        <p></p>
        <div className='col-sm-4'>Post date:</div>
        <div className='col-sm-8'>{date[0]}</div>
        <p></p>
        <div className='col-sm-4'>Description:</div>
        <div className='col-sm-8'>{props.description}</div>
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