const express = require('express');
const router = express.Router();
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
    Skill.find()
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

module.exports = router;