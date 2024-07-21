const express = require('express');
const router = express.Router();
const User = require('../schemas/userschema');
const Skill = require('../schemas/skillschema');

// Do CRUD there

// POST /postskills
router.post('/postskills', (req, res) => {
    console.log('POST skills is called')
    
    const date = new Date;

    const newSkill = {
        postName: req.body.name,
        postEmail: req.body.email,
        learn: req.body.learn,
        learnLv: req.body.learnLv,
        teach: req.body.teach,
        teachLv: req.body.teachLv,
        location: req.body.location,
        postDate: date,
        description: req.body.description
    };
    console.log(newSkill);
    Skill.create(newSkill);
    console.log('New skill posted');
    res.send('New skill posted!');
})

// GET /learnskills
router.get('/learnskills', (req, res) => {
    Skill.find().sort({ postDate: -1})
    .then((skills) => res.json(skills))
    .catch((error) => res.status(400).json('Error: ', error))
})

// GET /newskills
router.get('/newskills', (req, res) => {
    Skill.find().sort({ postDate: -1}).limit(10)
    .then((skills) => res.json(skills))
    .catch((error) => res.status(400).json('Error: ', error))
})


// PUT /deal/:key/:deal
router.put('/deal/:skillId/:deal', async (req, res) => {
    console.log('PUT /deal/:skillId/:deal is called', req.params.skillId, req.params.deal)
    await Skill.findByIdAndUpdate(req.params.skillId,
        { $set: { 'deal' : req.params.deal,
                    'caseDone' : true
        }}
    )
    res.json('Paired up successfully!')
})

// PUT /rate/learner/:email/:id/:ratefromlearner
router.put('/rate/learner/:email/:skillId/:ratefromlearner', async (req, res) => {

    console.log('From learner',req.params.email, req.params.skillId, req.params.ratefromlearner)

    await Skill.findByIdAndUpdate(req.params.skillId,
        { $set: {'rateFromLearner' : req.params.ratefromlearner }}
    )

    await User.updateOne(
        { email: req.params.email},
        { $push: {'rating' : req.params.ratefromlearner }}
    )
})

// put /rate/teacher/:email/:id/:ratefromteacher
router.put('/rate/teacher/:email/:skillId/:ratefromteacher', async (req, res) => {
    console.log('From teacher',req.params.email, req.params.skillId, req.params.ratefromteacher)

    await Skill.findByIdAndUpdate(req.params.skillId,
        { $set: {'rateFromTeacher' : req.params.ratefromteacher }}
    )
    await User.updateOne(
        { email: req.params.email},
        { $push: {'rating' : req.params.ratefromteacher }}
    )
})

// /DELETE /skill/:skillid
router.delete('/skill/:skillid', async (req, res) => {

    await Skill.findByIdAndDelete(req.params.skillid)
})

module.exports = router;