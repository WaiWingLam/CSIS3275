import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IncompletePostList = (props) => {
    const [deal, setOnChangeDeal] = useState(``)
    const [ratingList, setRatingList] = useState([]);
    const date = props.postDate.split('T')

    const pplChosenArray = props.pplChosen.split(', ').filter(ppl => ppl !== '')

    console.log('renew',pplChosenArray)

    const pplChosenJson = { ppl: pplChosenArray}

    const calculateRating = (...arr) => {

        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += parseInt(arr[i]);
        }

        return parseFloat((sum / arr.length)).toFixed(2);
    }


    useEffect(() => {

    if(pplChosenArray.length > 0) {
        axios.get(`http://localhost:5000/api/getrate`, 
            { params: pplChosenJson } )
        .then((response) => {
            const ratingList = response.data.response;
            setRatingList(ratingList);
        })}
    }, []);

    // console.log(pplChosenArray, ratingList)

    let ratingArray = []

    ratingList.map((rating) =>{
        if(rating.length == 0) {
            ratingArray.push('Not yet')
        } else {
            ratingArray.push(calculateRating(rating))
        }})

    // console.log(ratingArray)

    let pplStr = '';

    for (let i = 0; i < pplChosenArray.length; i++) {
        pplStr += `Email: ${pplChosenArray[i]} <br> Rating: ${ratingArray[i]}<br><br> `
    }

    // console.log(pplStr)

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
        <div className='key'>Preferred locations:</div>
        <div className='value'>{props.location}</div>
        <div className='key'>Post date:</div>
        <div className='value'>{date[0]}</div>
        <div className='key'>Description:</div>
        <div className='value'>{props.description}</div>
        <div className='key'>People chosed:</div>
        <div className='value' dangerouslySetInnerHTML={{ __html: pplStr }} />
        <div className='key'>You want to pair with:</div>
        <div className='value'>
            <form onSubmit={handleDeal}>
            <input type='hidden' id='list' value={props.pplChosen}/>
            <input type='hidden' id='skillId' value={props.skillId}/>
            <input type='text' id='deal' value={deal} onChange={(e) => setOnChangeDeal(e.target.value)}/>
            <input type='submit' value='Comfirm' />
            </form>
        </div>
    </div>
    );
};

const CompletePostList = (props) => {
    const date = props.postDate.split('T')
    const [score, setOnChangeScore] = useState(``)

    if(props.rate) {
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
        <div className='key'>Preferred locations:</div>
        <div className='value'>{props.location}</div>
        <div className='key'>Post date:</div>
        <div className='value'>{date[0]}</div>
        <div className='key'>Description:</div>
        <div className='value'>{props.description}</div>
        <div className='key'>Paired up with:</div>
        <div className='value'>{props.deal}</div>
        <div className='key'>You rated:</div>
        <div className='value'>{props.rate}</div>
    </div>
    );
    } else {
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
            <div className='key'>Preferred locations:</div>
            <div className='value'>{props.location}</div>
            <div className='key'>Post date:</div>
            <div className='value'>{date[0]}</div>
            <div className='key'>Description:</div>
            <div className='value'>{props.description}</div>
            <div className='key'>Paired up with:</div>
            <div className='value'>{props.deal}</div>
            <div className='key'>Rate your partner (1-5):</div>
            <div className='value'>
            <form onSubmit={handleRateFromLearner}>
            <input type='hidden' id='email' value={props.deal}/>
            <input type='hidden' id='skillId' value={props.skillId}/>
            <input type='text' id='score' value={score} onChange={(e) => setOnChangeScore(e.target.value)}/>
            <input type='submit' value='Comfirm' />
            </form>
            </div>
        </div>
        )
    }
};

const IncompleteChosenList = (props) => {
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

const CompleteChosenList = (props) => {
    const date = props.postDate.split('T')
    const [score, setOnChangeScore] = useState(``)

    if(props.rate) {
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
        <div className='key'>You rated:</div>
        <div className='value'>{props.rate}</div>
    </div>
    )
    } else {
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
            <div className='key'>Rate your partner (1-5):</div>
            <div className='value'>
            <form onSubmit={handleRateFromTeacher}>
            <input type='hidden' id='email' value={props.postEmail}/>
            <input type='hidden' id='skillId' value={props.skillId}/>
            <input type='text' id='score' value={score} onChange={(e) => setOnChangeScore(e.target.value)}/>
            <input type='submit' value='Comfirm' />
            </form>
            </div>
        </div>
        )
    }
};

const handleDeal = async (e) => {
    e.preventDefault();
    const deal = e.target.deal.value
    const skillId = e.target.skillId.value
    const pplChosen = e.target.list.value
    const pplChosenArray = pplChosen.split(', ')
    // console.log(deal, skillId)
    // console.log(pplChosenArray)

    if(pplChosenArray.includes(deal)) { // if the name matches
        const response = await axios.put(`http://localhost:5000/api/deal/${skillId}/${deal}`)
        .then(window.location = '/myaccount')
        // console.log(response.data)
    } else { // not match, pop up an alert window
        alert('Wrong name input! Please check again!')
    }
}

const handleRateFromLearner = async(e) => {
    e.preventDefault();
    const score = parseInt(e.target.score.value);
    const skillId = e.target.skillId.value;
    const email = e.target.email.value;

    if(score >= 1 && score <= 5 ) {
        const response = await axios.put(`http://localhost:5000/api/rate/learner/${email}/${skillId}/${score}`)
        .then(window.location = '/myaccount')
    } else {
        alert('Please rate between 1 - 5 !')
    }
}

const handleRateFromTeacher = async(e) => {
    e.preventDefault();
    const score = parseInt(e.target.score.value);
    const skillId = e.target.skillId.value;
    const email = e.target.email.value;

    if(score >= 1 && score <= 5 ) {
        const response = await axios.put(`http://localhost:5000/api/rate/teacher/${email}/${skillId}/${score}`)
        .then(window.location = '/myaccount')
    } else {
        alert('Please rate between 1 - 5 !')
    }

}



const Myaccount = () => {

    const [user, setUser] = useState([]);
    const [postList, setPostList] = useState([]);
    const [chosenList, setChosenList] = useState([]);


    // Get back userId and email
    const userId = localStorage.getItem('userId')
    const userEmail = localStorage.getItem('userEmail')
    // console.log('/myaccount: ', userId, userEm)

    if(userId) { // check if logged in
        useEffect(() => {
            // Use userId to get user data
            axios.get(`http://localhost:5000/api/myaccount/${userId}`)
            .then((response) => {
                const { user, postList, chosenList } = response.data.info;
                setUser(user);
                setPostList(postList);
                setChosenList(chosenList);
            })
        }, []);
    }


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
    
    // console.log('rate',userRating);

    // console.log('postList:', postList)
    // console.log('chosenList', chosenList)

    // split the skill cases into 2 jsons: done and on progress here

    // show the skills you have chosen and not yet paired
    const incompleteChosenList = chosenList.filter(skill => skill.caseDone === false)

    // show the skills you have chosen and being picked up
    const completeChosenList = chosenList.filter(skill => skill.caseDone === true).filter(skill => skill.deal === userEmail)

    // show the skills posted by user and paired up
    const completeList = postList.filter(skill => skill.caseDone === true)

    // show the skills posted by user and paired up
    const incompleteList = postList.filter(skill => skill.caseDone === false)

    const handleLogout = async () => {
        try {
            localStorage.clear();
            window.location = '/';
        } catch (error) {
            console.error('Logout error: ', error);
        } 
    }

    if(userId) {
        return(
            <div>
                <h1>Hi, {user.name}</h1>
                <h2>Account details:</h2>
                <div className='accountcontainer'>
                    <div className='account'>
                    <div className='key'>Name</div>
                    <div className='value'>{user.name}</div>
                    <div className='key'>E-mail</div>
                    <div className='value'>{user.email}</div>
                    <div className='key'>Credits available:</div>
                    <div className='value'>{user.credit}</div>
                    <div className='key'>Your rating:</div>
                    <div className='value'>{userRating}</div>
                    <div className='btn'><button onClick={handleLogout}>Logout</button></div>
                    </div>
                </div>
                <hr />

                <h2>Skills you post and waiting for pair up:</h2>
                <div className='skillcontainer'>
                    {incompleteList.map((postRecord) => (
                        <IncompletePostList
                        skillId = {postRecord._id}
                        learn = {postRecord.learn}
                        learnLv = {postRecord.learnLv}
                        teach = {postRecord.teach}
                        teachLv = {postRecord.teachLv}
                        location = {postRecord.location}
                        postDate = {postRecord.postDate}
                        description = {postRecord.description}
                        pplChosen = {postRecord.pplChosen.join(', ')}
                        /> 
                    ))}
                </div>

                <hr />

                <h2>Skills you post finished for pair up:</h2>
                <div className='skillcontainer'>
                    {completeList.map((postRecord) => (
                        <CompletePostList
                        skillId = {postRecord._id}
                        learn = {postRecord.learn}
                        learnLv = {postRecord.learnLv}
                        teach = {postRecord.teach}
                        teachLv = {postRecord.teachLv}
                        location = {postRecord.location}
                        postDate = {postRecord.postDate}
                        description = {postRecord.description}
                        deal = {postRecord.deal}
                        rate = {postRecord.rateFromLearner}
                        /> 
                    ))}
                </div>

                <hr />

                <h2>The poster has chosen you!</h2>
                <h2>Please response as soon as possible:</h2>
                <div className='skillcontainer'>
                    {completeChosenList.map((postRecord) => (
                        <CompleteChosenList
                        skillId = {postRecord._id}
                        postName = {postRecord.postName}
                        postEmail = {postRecord.postEmail}
                        learn = {postRecord.learn}
                        learnLv = {postRecord.learnLv}
                        teach = {postRecord.teach}
                        teachLv = {postRecord.teachLv}
                        location = {postRecord.location}
                        postDate = {postRecord.postDate}
                        description = {postRecord.description}
                        deal = {postRecord.deal}
                        rate = {postRecord.rateFromTeacher}
                        /> 
                    ))}
                </div>
                
                <hr />

                <h2>Skills you have chosen and waiting for response:</h2>
                <div className='skillcontainer'>
                    {incompleteChosenList.map((chosenRecord) => (
                        <IncompleteChosenList
                            key = {chosenRecord._id}
                            skillId = {chosenRecord._id}
                            postName = {chosenRecord.postName}
                            postEmail = {chosenRecord.postEmail}
                            learn = {chosenRecord.learn}
                            learnLv = {chosenRecord.learnLv}
                            teach = {chosenRecord.teach}
                            teachLv = {chosenRecord.teachLv}
                            location = {chosenRecord.location}
                            postDate = {chosenRecord.postDate}
                            description = {chosenRecord.description}
                        />
                    ))}
                </div>
            </div>
        );
    } else {
        return(
            <div>
                <h1>Please log in.</h1>
            </div>
        )
    }
};

export default Myaccount;