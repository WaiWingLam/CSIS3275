import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = (props) => {
    const [deal, setOnChangeDeal] = useState(``)
    return(
    <div>
    <p><b>Skill want to learn: </b>{props.learn}</p>
    <p><b>Learning skill level: </b>{props.learnLv}</p>
    <p><b>Skill to teach: </b>{props.teach}</p>
    <p><b>Teaching skill level: </b>{props.teachLv}</p>
    <p><b>Preferred locations: </b>{props.location}</p>
    <p><b>Post date: </b>{props.postDate}</p>
    <p><b>Description: </b>{props.description}</p>
    <p><b>People chosed: </b>{props.pplChosen}</p>
    <p><b>Please input the name you want to pair up:</b></p>
    <form onSubmit={handleDeal}>
    <input type='hidden' id='list' value={props.pplChosen}/>
    <input type='hidden' id='skillId' value={props.skillId}/>
    <input type='text' id='deal' value={deal} onChange={(e) => setOnChangeDeal(e.target.value)}/>
    <input type='submit' value='Comfirm' />
    </form>
    <hr />
    </div>
    );
};

const ChosenList = (props) => (
    <div>
    <p><b>Skill want to learn: </b>{props.learn}</p>
    <p><b>Learning skill level: </b>{props.learnLv}</p>
    <p><b>Skill to teach: </b>{props.teach}</p>
    <p><b>Teaching skill level: </b>{props.teachLv}</p>
    <p><b>Post user: </b>{props.postName}</p>
    <p><b>E-mail: </b>{props.postEmail}</p>
    <p><b>Preferred locations: </b>{props.location}</p>
    <p><b>Post date: </b>{props.postDate}</p>
    <p><b>Description: </b>{props.description}</p>
    <hr />
</div>
);

const handleDeal = async (e) => {
    e.preventDefault();
    const deal = e.target.deal.value
    const skillId = e.target.skillId.value
    const pplChosen = e.target.list.value
    const pplChosenArray = pplChosen.split(', ')
    console.log(deal, skillId)
    // console.log(pplChosenArray)

    if(pplChosenArray.includes(deal)) { // if the name matches
        const response = await axios.put(`http://localhost:5000/api/deal/${skillId}/${deal}`)

        console.log(response.data)
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
    // console.log('/myaccount: ', userId)

    useEffect(() => {
        // Use userId to get user data
        axios.get(`http://localhost:5000/api/myaccount/${userId}`)
        .then((response) => {
            const { user, postList, chosenList } = response.data.info;
            setUser(user);
            setPostList(postList);
            setChosenList(chosenList);
        })

        // setUser(response.user);;
        // setChosenList(response.chosenList);

        // .then(setChosenListId(user.chosenList))

        // Use userId to get the list he chosen
        // axios.get(`http://localhost:5000/api/chosenList/${userId}`)
        // .then((response) => {
        //     setChosenListId(response.data.chosenListId)
        // })
        
        // Get the skill details from the chosenList

        // axios.get('http://localhost:5000/api/chosenList/item',)
        // .then((response) => {
        //     console.log('it reaches')
        //     // setChosenList(response.data.chosenList)
        // })
    }, []);

    console.log('postList:', postList)
    console.log('chosenList', chosenList)
    

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
                <h2>This is my account page. You have successfully login. </h2>
                <h2>Account details:</h2>
                <h3>Name: {user.name}</h3>
                <h3>E-mail: {user.email}</h3>
                <h3>Credits available: {user.credit}</h3>
                <p></p>
                <button onClick={handleLogout}>Logout</button>
                <hr />
                <h1>Skills you post:</h1>
                <div>
                    {postList.map((postRecord) => (
                        <PostList
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
                <h1>Skills you have chosen and waiting for response:</h1>
                <div>
                    {chosenList.map((chosenRecord) => (
                        <ChosenList
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