const router = require('express').Router();

const homeRoutes = require('./home');
const userRoutes = require('./user');
const dashboardRoutes = require('./dashboard');
const postRoutes = require('./post')

router.use('/home', homeRoutes);
router.use('/user', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/post', postRoutes);

module.exports = router;