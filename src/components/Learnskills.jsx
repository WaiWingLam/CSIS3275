import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        <div className='btn'><button onClick = {() => {props.chooseSkill(props.postEmail, props.pplChosen, props.skillId, props.userEmail)}}>Pick me!</button></div>
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

    if(userId) { // logged in
        return(
            <div>
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