const router = require('express').Router();
const { User } = require('../models');
const path = require('path');

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

router.post('/signup', async(req, res) => {
    const { username, password, firstName, lastName } = req.body;
    
    if(!username || !password || !firstName || !lastName){
        return res.status(400).json('Please fill out entire form');
    }
    
    try {
        const dbUserData = await User.create({
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
        });
    
        req.session.save(() => {
          req.session.loggedIn = true;
          res.status(200).json(dbUserData.username);
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

router.get('/logout', async(req, res) => {
    try{
        req.session.destroy(()=>{
            res.status(204).end();
        })
    }catch(err){
        return res.status(500).json('Internal server error');
    }
})

router.get('/login', (req, res) => {
  res.render('login', {
    headerTitle: 'Login'
  });
})

module.exports = router;