const router = require('express').Router();

const homeRoutes = require('./home');
const userRoutes = require('./user');

router.use('/home', homeRoutes);
router.use('/user', userRoutes);

module.exports = router;