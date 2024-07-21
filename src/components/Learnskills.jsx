import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LearnList = (props) => {
    const date = props.postDate.split('T')
    return(
    <div className='skill'>
        <div className='col-sm-4'>Skill want to learn:</div>
        <div className='col-sm-8'>{props.learn}</div>
        <div className='col-sm-4'>Learning skill level:</div>
        <div className='col-sm-8'>{props.learnLv}</div>
        <div className='col-sm-4'>Skill to teach:</div>
        <div className='col-sm-8'>{props.teach}</div>
        <div className='col-sm-4'>Teaching skill level:</div>
        <div className='col-sm-8'>{props.teachLv}</div>
        <div className='col-sm-4'>Post user:</div>
        <div className='col-sm-8'>{props.postName}</div>
        <div className='col-sm-4'>E-mail:</div>
        <div className='col-sm-8'>{props.postEmail}</div>
        <div className='col-sm-4'>Preferred locations:</div>
        <div className='col-sm-8'>{props.location}</div>
        <div className='col-sm-4'>Post date:</div>
        <div className='col-sm-8'>{date[0]}</div>
        <div className='col-sm-4'>Description:</div>
        <div className='col-sm-8'>{props.description}</div>
        <br></br>
        <br></br>
        <button className="btn btn-primary" onClick = {() => {props.chooseSkill(props.postEmail, props.pplChosen, props.skillId, props.userEmail)}}>Pick me!</button>
    </div>
    )
};

const chooseSkill = async (postEmail, pplChosen, skillId, userEmail) => {

    const pplChosenArray = pplChosen.split(', ')

    if(postEmail === userEmail) { // check if the skill is posted by user
        alert('Please do not pick the skill you post!')
    } else if(pplChosenArray.includes(userEmail)) { // check if the user already picked up the same skill
        alert('Please do not repeatly pick the same post!')
    } else {
        const response = await axios.put(`http://localhost:5000/api/pickskill/${skillId}/${userEmail}`);

        // console.log(skillId,userEmail)
        // console.log(response.data)
    
        window.location = '/myaccount'
    }
}

const Learnskills = () => {

    const [user, setUser] = useState([]);
    const [learnList, setLearnList] = useState([]);

    // Get back userId and email
    const userId = localStorage.getItem('userId')
    const userEmail = localStorage.getItem('userEmail')
    // console.log('/learnskills: ', userId, userEmail)

    if(userId) { // check if logged in
    // Use userId to get user
        useEffect(() => {
            axios.get(`http://localhost:5000/api/myaccount/${userId}`)
            .then((response) => {
                setUser(response.data.info.user)
            })
        }, []);
    }

    // Get whole learn list
    useEffect(() => {
        axios.get('http://localhost:5000/api/learnskills')
        .then((response) => {
            setLearnList(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    // only show skilled not yet paired
    const incompleteList = learnList.filter(skill => skill.caseDone === false)

    // console.log('Filtered',incompleteList)

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

    if(userId) { // logged in
        return(
            <div>
                <h1>Featured Suggestions:</h1>
                <div className='skillcontainer'>
                {randomBoostedList.map((learnRecord) => (
                    <LearnList 
                    key = {learnRecord._id}
                    userEmail = {userEmail}
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
                    chooseSkill = {chooseSkill}
                    pplChosen = {learnRecord.pplChosen.join(', ')}
                    />
                ))}
                </div>  
                <h1>People are looking for: </h1>
                <div className='skillcontainer'>
                    {incompleteList.map((learnRecord) => (
                        <LearnList 
                            key = {learnRecord._id}
                            userEmail = {userEmail}
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
                            chooseSkill = {chooseSkill}
                            pplChosen = {learnRecord.pplChosen.join(', ')}
                        />
                    ))}
                </div>                
            </div>
        );
    } else { // not yet logged in
        return(
            <div>
                <h1>Please log in.</h1>
            </div>
        )
    }
}

export default Learnskills;