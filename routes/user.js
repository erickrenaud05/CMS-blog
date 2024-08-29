const router = require('express').Router();
const { User } = require('../models');

router.get('/login', (req, res) =>{
    res.send('GET LOGIN')
});

router.post('/signup', (req, res) => {
    res.send('POST SIGNUP')
});

module.exports = router;