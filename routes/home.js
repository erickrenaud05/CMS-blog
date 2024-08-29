const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', (req, res) => {
    res.send('get main posts');
})

module.exports = router;