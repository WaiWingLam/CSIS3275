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

    const boostedList = learnList.filter(skill => skill.boost === true).filter(skill => skill.caseDone === false)

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    function getRandomUniqueItems(arr) {
        if (4 >= arr.length) {
            return arr;
        }
        const shuffled = shuffleArray([...arr]);
        return shuffled.slice(0, 4);
    }
    
    const randomBoostedList = getRandomUniqueItems(boostedList);

    return(
        <div>
            <h1>Featured Suggestions:</h1>
            <div className='skillcontainer'>
                {randomBoostedList.map((learnRecord) => (
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