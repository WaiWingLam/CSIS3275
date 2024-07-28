import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SkillList = (props) => {
    const date = props.postDate.split('T')

    return(
        <div className='skill'>
        <div className='col-sm-4'>Posted by:</div>
        <div className='col-sm-8 text-primary cursor-pointer text-left' 
            onClick = {() => window.location=`/profile/${props.postEmail}`} 
            style={{ textDecoration: 'underline', cursor: 'pointer' }}>
            {props.postEmail}
        </div>
        <div className='col-sm-4'>Skill want to learn:</div>
        <div className='col-sm-8'>{props.learn}</div>
        <div className='col-sm-4'>Learning skill level:</div>
        <div className='col-sm-8'>{props.learnLv}</div>
        <div className='col-sm-4'>Skill to teach:</div>
        <div className='col-sm-8'>{props.teach}</div>
        <div className='col-sm-4'>Teaching skill level:</div>
        <div className='col-sm-8'>{props.teachLv}</div>
        <div className='col-sm-4'>Post date:</div>
        <div className='col-sm-8'>{date[0]}</div>
        <div className='col-sm-4'>Description:</div>
        <div className='col-sm-8'>{props.description}</div>
        </div>
    )

}

const Profile = () => {

    // Get back userId and email
    const userId = localStorage.getItem('userId')
    const userEmail = localStorage.getItem('userEmail')

    const [user, setUser] = useState([]);
    const [skillList, setSkillList] = useState([]);


    const name = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ]

    if(userId){
        useEffect(() => {
            axios.get(`http://localhost:5000/api/getotherusers/${name}`)
            .then((response) => {
                const { user, skillList } = response.data.info;
                setUser(user[0]);
                setSkillList(skillList);
            })
        }, []);
    }

    console.log('skill' , skillList);


    const calculateRating = (...arr) => {

        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += parseInt(arr[i]);
        }

        return parseFloat((sum / arr.length)).toFixed(2);
    }

    let userRating = calculateRating(user.rating);

    if (userRating === 'NaN') {
        userRating = 'Not yet rated'
    }

    if(userId) {
        return(
            <div>
                <h1>About {user.name} : </h1>
                <div className='account'>
                <div className='col-sm-2'>E-mail:</div>
                <div className='col-sm-10'>{user.email}</div>
                <div className='col-sm-2'>Rating:</div>
                <div className='col-sm-10'>{userRating}</div>
                </div>
            <hr />
            <h2>Recent completed skills: </h2>
            <div className='skillcontainer'>
                {skillList.map((record) => (
                    <SkillList
                    skillId = {record._id}
                    postEmail = {record.postEmail}
                    learn = {record.learn}
                    learnLv = {record.learnLv}
                    teach = {record.teach}
                    teachLv = {record.teachLv}
                    postDate = {record.postDate}
                    description = {record.description}
                    />
                ))}
            </div>
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

export default Profile;