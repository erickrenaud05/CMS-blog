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
            .status(401)
            .json({ message: 'Incorrect email or password. Please try again!' });
          return;
        }
    
        const validPassword = await dbUserData.checkPassword(req.body.password);
    
        if (!validPassword) {
          res
            .status(401)
            .json({ message: 'Incorrect email or password. Please try again!' });
          return;
        }
    
        req.session.save(() => {
          req.session.loggedIn = true;
          req.session.username = dbUserData.username;
          res
            .status(200)
            .json({ user: dbUserData, message: 'You are now logged in!' });
          return;
          });

      } catch (err) {
        res.status(500).json(err);
      }
});

router.post('/signup', async(req, res) => {
    const { username, password} = req.body;
    
    if(!username || !password){
        return res.status(400).json('Please fill out entire form');
    }
    
    try {
        const dbUserData = await User.create({
          username: username,
          password: password,
        });

        req.session.save(() => {
          req.session.loggedIn = true;
          res.status(200).json(dbUserData.username);
        });
        
        return;
      } catch (err) {
        res.status(500).json('Internal server error')
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

router.get('/:id', (req, res) => {
  /*
    State is a property of the form swap button and allows
    for a single view and get request for both sign
    up and login and doesn't require the page to 
    refresh to change form
  */
  const state = req.params.id;

  if(state === '1'){
    res.render('login', {
      headerTitle: 'Login',
      formTitle: 'Login',
      buttonText: 'Login',
      signUp: false,
    });
    
  } else{
    res.render('login', {
      headerTitle: 'Sign Up',
      formTitle: 'Sign Up',
      buttonText: 'Sign Up',
      signUp: true,
    });
  }

})

module.exports = router;