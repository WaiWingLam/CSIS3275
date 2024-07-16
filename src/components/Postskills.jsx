import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Postskills = () => {

    const [user, setUser] = useState([]);
    const [learn, setOnChangeLearn] = useState(``);
    const [learnLv, setOnChangeLearnLv] = useState(``);
    const [teach, setOnChangeTeach] = useState(``);
    const [teachLv, setOnChangeTeachLv] = useState(``);
    const [location, setOnChangeLocation] = useState(``);
    const [description, setOnChangeDescription] = useState(``);

    // Get back userId
    const userId = localStorage.getItem('userId')
    console.log('/myaccount: ', userId)

    // Use userId to get user
    useEffect(() => {
        axios.get(`http://localhost:5000/api/myaccount/${userId}`)
        .then((response) => {
            setUser(response.data.info.user)
        })
    }, []);

    const handlePostSkill = async (e) => {
        e.preventDefault();

        const newSkill = { 
            name: user.name, 
            email: user.email, 
            learn: learn, 
            learnLv: learnLv, 
            teach: teach, 
            teachLv: teachLv, 
            location: location, 
            description: description,
        };

        const creditUpdate = {
            email: user.email,
            credit: user.credit
        }; 

        await axios.post('http://localhost:5000/api/postskills', newSkill)
        await axios.put('http://localhost:5000/api/reducecredit', creditUpdate)

        // window.location = '/learnskills';
    }

    if(userId) {
        if(user.credit > 0) { // logged in + enough balance
            return(
                <div>
                    <h1>This is post skills page.</h1>
                    <h1>Post a skill:</h1>
                    <form onSubmit={handlePostSkill}>
                        <b>Skill you look for: </b>
                        <input type='text' id='learn' required value={learn} onChange={(e) => setOnChangeLearn(e.target.value)} />
                        <p></p>
                        <b>The skill level you want to learn: </b>
                        <input type='text' id='learnLv' required value={learnLv} onChange={(e) => setOnChangeLearnLv(e.target.value)} />
                        <p></p>
                        <b>Skill you can teach: </b>
                        <input type='text' id='teach' required value={teach} onChange={(e) => setOnChangeTeach(e.target.value)} />
                        <p></p>
                        <b>The skill level you can teach: </b>
                        <input type='text' id='teachLv' required value={teachLv} onChange={(e) => setOnChangeTeachLv(e.target.value)} />
                        <p></p>
                        <b>Your available location: </b>
                        <input type='text' id='location' required value={location} onChange={(e) => setOnChangeLocation(e.target.value)} />
                        <p></p>
                        <b>Tell us more about you:</b>
                        <p></p>
                        <textarea id='description' value={description} onChange={(e) => setOnChangeDescription(e.target.value)}/>
                        <p></p>
                        <input type='submit' value="Post" />
                </form>
            </div>
            );
        } else { // logged in but 0 balance
            return (
                <div>
                    <h1>You have no credit balance. Please add credits before posting.</h1>
                </div>
            );
        }
    } else { // not yet logged in
        return(
            <div>
                <h1>Please log in.</h1>
            </div>
        )
    }
};

export default Postskills;