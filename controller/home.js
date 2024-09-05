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
            include: [
            {model: Comment,
                include: {model: User,
                    attributes: ['username'],
                },
                attributes: ["content", "publishedAt"],
            }, 
            {model: User, 
                attributes: ['username'],
            },
        ]
        });

        const posts = await response.toJSON()
        res.render('post', {
            post: posts,
            loggedIn: req.session.loggedIn,
            headerTitle: 'The Tech Blog'
        })
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json('Internal server error');
    }
});

router.delete('/:id', async (req, res) =>{
    if(!req.params.id){
        res.status(400).json('invalid post id');
        return;
    }

    let user = null;
    try {
        user = await User.findOne({
            where: {username: req.session.username},
            attributes: ['id'],
            raw: true,
        });

        if(!user){
            throw new Error('Weird');
        }
        
    } catch (error) {
        res.status(500).json('Internal server error');
        return;
    }

    try {
        const post = await Post.findOne({
            where: {id: req.params.id},
            raw: true,
        })
        

        if(!post.authorId === user.id){
            res.status(401).json('Cannot delete post you do not own');
            return;
        }

        const response = await Post.destroy({
            where: {id: post.id},
            force: true,
        });
        
        if(!response){
            throw new Error('Weird');
        }

        res.status(200).json('Successfully deleted post');
        return;
    } catch (error) {
        res.status(500).json('Internal server error');
        return;
    }
})

router.post('/comment', async (req, res) => {
    if(!req.body){
        res.status(400).json('bad request');
        return;
    }

    let foreignKeys = {
        userId: null,
        postId: null,
    };

    try {
        var response = await User.findOne({
            where: {username: req.session.username},
            attributes: ['id'],
            raw: true,
            plain: true,
        });

        foreignKeys.userId = response.id;

        response = await Post.findOne({
            where: {title: req.body.postTitle},
            attributes: ['id'],
            raw: true,
            plain: true
        });

        foreignKeys.postId = response.id;

        if(!foreignKeys.userId || !foreignKeys.postId){
            res.status(404).json('user not found');
            return;
        }
    } catch (error) {
        res.status(500).json('internal server error');
        return;
    }

    try {
        const newComment = Comment.create({
            content: req.body.comment,
            authorId: foreignKeys.userId,
            postId: foreignKeys.postId,
            publishedAt: Date.now()
        });

        res.status(200).json(newComment);
        return;
    } catch (error) {
        res.status(500).json('Internal server error')
        return;
    }
})

module.exports = router;