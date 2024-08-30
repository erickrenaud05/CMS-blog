const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

router.get('/', async(req, res) => {
    try{
        const post = await Post.findAndCountAll({
            attributes: ['title', 'content', 'published_at'],
            limit: 10,
            include: [
                {model: Comment,
                    include: {model: User,
                        attributes: ['username'],
                    },
                    attributes: ["content", "publishedAt"],
                }, 
                {model: User, 
                    attributes: ['username'],
                }
            ],
        });
        const postData = post.rows.map((post) => post.get({ plain:true }))
        res.render('homepage', {
            post: postData,
            loggedIn: req.session.loggedIn,
        });

    }catch(err){
        return res.status(500).json('Internal server error');
    }
})

module.exports = router;