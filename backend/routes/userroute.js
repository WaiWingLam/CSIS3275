const express = require('express');
const router = express.Router();
const User = require('../schemas/userschema');

// Do CRUD there

// POST /login
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    console.log('POST login is called')
    console.log(req.body);

    try {
        const user = await User.authenticate(email, password);

        console.log('From POST /login', user);

        userInfo = {
            _id: user._id,
            name: user.name,
            email: user.email,
            credit: user.credit
        }

        res.json({message: 'Login success!', user: userInfo});

        // console.log('From POST /login:', req.session.user);

    } catch (error) {
        res.json({ message: 'There is error.'});
    }
});

// POST /logout (not used)
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return res.status(500).json({message: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout success'});
    })
})

// GET/ myaccount (not used)
router.get('/myaccount', (req, res) => {
    console.log('From GET /myaccount:', req.session.user);
    res.json({user: req.session.user});
})

// POST /register
router.post('/register', (req, res) => {
    console.log('POST register is called')
    console.log(req.body);
    if(req.body.name && req.body.email && req.body.password) {
        const newUser = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            credit: 1   // 1 free credit for new users
        };
        User.create(newUser);
        console.log('User created');
        res.send('Registeration success!');
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

module.exports = router;