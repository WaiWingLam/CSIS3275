const router = require('express').Router();
const User = require('../schemas/userschema');

// Do CRUD there
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email: email});
        if(user && user.password === password) {
            // Login success
            res.json({ user: { id: user.id, username: user.name, useremail: user.email, userbalance: user.balance }, message: 'Login success!'});
        } else {
            // Login fail
            res.status(401).send('Wrong email or password');
        }
    } catch(error) {
        res.status(500).send('Some errors there');
    }
});

module.exports = router;