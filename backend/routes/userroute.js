const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../schemas/userschema');
const Skill = require('../schemas/skillschema');

// Do CRUD there

// POST /login
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    console.log('POST login is called')
    console.log(req.body);

    try {
        const user = await User.authenticate(email, password);

        console.log('From POST /login', user);

        res.json({message: 'Login success!', userId: user._id, userEmail:user.email});
    } catch (error) {
        res.json({ message: 'Error occurs.'});
    }
});

// GET /myaccount/:userId
router.get('/myaccount/:userId', async (req, res) => {
    // console.log('GET /myaccount/:userId ', req.params.userId);

    const user = await User.findById(req.params.userId);

    const postList = await Skill.find(
        { postEmail: user.email }
    )

    const objectIds = user.chosenList.map(element => new mongoose.Types.ObjectId(element));

    // console.log(objectIds)

    const chosenList = await Skill.find(
        { _id: { $in: objectIds } }
    )
    // console.log(chosenList);

    const response = {
        user: user,
        chosenList: chosenList,
        postList: postList
    }
    
    res.json({message: 'Get account info success!', info: response});
    
    // console.log('res',response);
})

// POST /register
router.post('/register', async (req, res) => {
    console.log('POST register is called')
    console.log(req.body);

    // Do unique email name checking here
    const response = await User.find(
        { email : req.body.email }
    )

    if(response.length == 0) {
        const newUser = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            credit: 1   // 1 free credit for new users
        };
        User.create(newUser);
        console.log('User created');
        res.json({message: 'Registeration success!', check: true});
    } else {
        res.json({message: 'Email has been used', check: false})
    }
})

// PUT /reducecredit

router.put('/reducecredit', async (req, res) => {
    console.log('POST /reduce', req.body);
    await User.updateOne(
        {email: req.body.email},
        {$set: { 'credit' : req.body.credit -1}}
    )
})

// PUT /pickskil/:skillId/:userEmail
router.put('/pickskill/:skillId/:userEmail', async (req, res) => {
    console.log('/pickskill/:skillId/:userEmail', req.params.skillId, req.params.userEmail);
    await User.updateOne(
        { email: req.params.userEmail },
        { $push: { 'chosenList': req.params.skillId }}
    )
    await Skill.findByIdAndUpdate(req.params.skillId, 
        { $push: { 'pplChosen': req.params.userEmail}})

    res.json('You have picked up a new skill!')
})

module.exports = router;