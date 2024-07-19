import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IncompletePostList = (props) => {
    const [deal, setOnChangeDeal] = useState(``)
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
        <div className='key'>Preferred locations:</div>
        <div className='value'>{props.location}</div>
        <div className='key'>Post date:</div>
        <div className='value'>{date[0]}</div>
        <div className='key'>Description:</div>
        <div className='value'>{props.description}</div>
        <div className='key'>People chosed:</div>
        <div className='value'>{props.pplChosen}</div>
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
    </div>
    );
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
        
        window.location = '/myaccount'
        // console.log(response.data)
    } else { // not match, pop up an alert window
        alert('Wrong name input! Please check again!')
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
                <h3>Name: {user.name}</h3>
                <h3>E-mail: {user.email}</h3>
                <h3>Credits available: {user.credit}</h3>
                <p></p>
                <button onClick={handleLogout}>Logout</button>
                <hr />

                <h1>Skills you post and waiting for pair up:</h1>
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

                <h1>Skills you post finished for pair up:</h1>
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
                        /> 
                    ))}
                </div>

                <hr />

                <h1>Skills you have chosen and being paired up,</h1>
                <h1>please contact your partner as soon as possible:</h1>
                <div className='skillcontainer'>
                    {completeChosenList.map((postRecord) => (
                        <CompleteChosenList
                        skillId = {postRecord._id}
                        learn = {postRecord.learn}
                        learnLv = {postRecord.learnLv}
                        teach = {postRecord.teach}
                        teachLv = {postRecord.teachLv}
                        location = {postRecord.location}
                        postDate = {postRecord.postDate}
                        description = {postRecord.description}
                        deal = {postRecord.deal}
                        /> 
                    ))}
                </div>
                
                <hr />

                <h1>Skills you have chosen and waiting for response:</h1>
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