const router = require('express').Router();
const { withAuth } = require('../utils/auth');
const { Post, User, Comment } = require('../models');
const { format_date } = require('../utils/helpers');

router.get('/', withAuth, async(req, res) => {
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
            headerTitle: 'The Tech Blog'
        });
    }catch(err){
        return res.status(500).json('Internal server error');
    }
})

router.get('/:id', async (req, res) => {
    if(!req.params.id){
        res.status(400).json('invalid post id');
        return;
    }

    try {
        const response = await Post.findOne({
            where: {title: req.params.id},
            include: 
            {model: Comment,
                include: {model: User,
                    attributes: ['username'],
                },
                attributes: ["content", "publishedAt"],
            }, 
            raw: true,
            plain: true
        });

        // if(!res.ok){
        //     throw new Error('uh oh');
        // }

        // const comments = res.get({ plain:true })
        res.render('post', {
            post: response,
            loggedIn: req.session.loggedIn,
            headerTitle: res.title
        })
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json('Internal server error');
    }
})

module.exports = router;