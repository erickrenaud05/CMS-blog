const router = require('express').Router();

const homeRoutes = require('./home');
const userRoutes = require('./user');
const dashboardRoutes = require('./dashboard');

router.use('/home', homeRoutes);
router.use('/user', userRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;