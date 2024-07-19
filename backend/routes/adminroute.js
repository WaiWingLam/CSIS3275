const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../schemas/userschema');
const Skill = require('../schemas/skillschema');

// Do CRUD there

// /GET /allskills
router.get('/allskills', (req, res) => {
    Skill.find()
    .then((skills) => res.json(skills))
})

// /GET /allusers
router.get('/allusers', async (req, res) => {
    await User.find()
    .then((users) => res.json(users))
})

// /GET /specificuser/:email
router.get('/specificuser/:email', async (req, res) => {
    await User.find( { email: req.params.email })
    .then((specificUser) => res.json(specificUser))
})

// /GET /specificskill/:email/:learn
router.get('/specificskill/:email/:date', async (req, res) => {

    await Skill.find(
        { $and: [ { postEmail: req.params.email }, 
                    { postDate: ISODate(req.params.date)}
                ]}
    )
    .then((skill) => res.json(skill))
})

// /PUT /userupdate/:name/:email
router.put('/userupdate/:name/:email', async (req, res) => {
    await User.updateOne(
        { email: req.params.email},
        { $set: { name: req.params.name}}
    )
})

// /PUT /creditupdate
router.put('/creditupdate', async (req, res) => {
    await User.updateOne(
        { email: req.body.email},
        { $set: { credit: req.body.credit}}
    )
})

// /PUT /skillupdate/:postemail/:learn
router.put('/skillupdate/:postemail/:date', async (req, res) => {
    await Skill.updateOne(
        { $and: [ {postEmail: req.params.postemail},
                    { postDate: ISODate(req.params.date)}
        ]},
        { $set: {
            learn: req.body.learn,
            learnlv: req.body.learnlv,
            teach: req.body.teach,
            teachlv: req.body.teachlv,
            location: req.body.location,
            description: req.body.description
        }}
    )
})

module.exports = router;