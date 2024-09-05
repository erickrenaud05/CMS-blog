const router = require('express').Router();
const { withAuth } = require('../utils/auth');
const { Post, User, Comment } = require('../models');
const { format_date } = require('../utils/helpers');

router.get('/', (req, res) => {
    res.send('Hello world');
});

module.exports = router;