import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LearnList = (props) => {
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
        <div className='col-sm-8'>{props.postDate}</div>
        <div className='col-sm-4'>Description:</div>
        <div className='col-sm-8'>{props.description}</div>
        <br></br>
        <br></br>
        <button className="btn btn-danger" onClick = {() => {props.deleteSkill(props.skillId)}}>Delete Skill</button>
    </div>
    )
};

const handleLogout = () => {
    try {
        localStorage.clear();
        window.location = '/admin';
    } catch (error) {
        console.error('Logout error');
    } 
}

const deleteSkill = async (skillId) => {

    const confirmDelete = window.confirm('Are you sure to delete the skill?')

    if(confirmDelete) {
        await axios.delete(`http://localhost:5000/admin/skill/${skillId}`)
        .then(window.location='/admin');
    }

}

const Admin = () => {

    var admin = localStorage.getItem('admin')

    const [email, setOnChangeEmail] = useState(``);
    const [password, setOnChangePassword] = useState(``);
    const [userEmail, setOnChangeUserEmail] = useState(``);
    const [credit, setOnChangeCredit] = useState(``);
    const [learnList, setLearnList] = useState([]);

    const tryLogin = async(e) => {
        e.preventDefault();
        // const loginData = {email: email, password: password };

        if(email === 'admin' && password === 'admin') {
            admin = 'login'
            localStorage.setItem('admin', admin)
            window.location = '/admin'
        } else {
            msg.innerHTML='Wrong e-mail or password, please try again!'
        }
    }

    const handleUpdateCredit =  async (e) => {
        e.preventDefault();
    
        const newCredit = {
            email: userEmail,
            credit: credit
        };
    
        await axios.put('http://localhost:5000/admin/creditupdate/', newCredit)
        .then(window.location = '/admin');
    }

    // Get whole learn list
    useEffect(() => {
        axios.get('http://localhost:5000/api/learnskills')
        .then((response) => {
            setLearnList(response.data)
        })
        .catch((error) => {
                onsole.log(error);
        })
    }, []);

    if(admin === 'login') {
        return(
            <div>
                <h2>You have logged in as admin.</h2>
                <button onClick={handleLogout}>Admin Logout</button>
                <hr />
                <h2>Update user credit: </h2>
                <form onSubmit={handleUpdateCredit}>
                    User email:<br></br>
                    <input type='text' id='userEmail' required value={userEmail} onChange={(e) => setOnChangeUserEmail(e.target.value)} />
                    <p></p>
                    New credit:
                    <br></br>
                    <input type='text' id='credit' required value={credit} onChange={(e) => setOnChangeCredit(e.target.value)} />
                    <p></p>
                    <input type='submit' value="Update" />
                </form>
                <hr />
                <h2>All skills list: </h2>
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
                    deleteSkill = {deleteSkill}
                    pplChosen = {learnRecord.pplChosen.join(', ')}
                    />
                ))}
                </div>  





            </div>
        )
    } else {
    return(
        <div>
            <h1>Admin Login:</h1>
            <div className='login'>
            <form onSubmit={tryLogin}>
                E-mail: 
                <input type="text" id='email' required value={email} onChange={(e) => setOnChangeEmail(e.target.value)} />
                Password:
                <input type="password" id='password' required value={password} onChange={(e) => setOnChangePassword(e.target.value)} />
                <p></p>
                <input type="submit" value="Login" />
            </form>
            </div>
        <p></p>
        <div id='wrongmsg'></div>
    </div>
    )
    }
}

export default Admin;