const router = require('express').Router();
const { User } = require('../models');

router.post('/login', async(req, res) =>{
    if(!req.body.username || !req.body.password){
        return res.status(400).json('Please fill out form');
    };

    try {
        const dbUserData = await User.findOne({
          where: {
            username: req.body.username,
          },
        });
    
        if (!dbUserData) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password. Please try again!' });
          return;
        }
    
        const validPassword = dbUserData.checkPassword(req.body.password);
    
        if (!validPassword) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password. Please try again!' });
          return;
        }
    
        req.session.save(() => {
          req.session.loggedIn = true;
          req.session.username = dbUserData.username;
          res
            .status(200)
            .json({ user: dbUserData, message: 'You are now logged in!' });
        });

      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

router.post('/signup', (req, res) => {
    res.send('POST SIGNUP');
});

module.exports = router;