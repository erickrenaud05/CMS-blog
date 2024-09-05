const router = require('express').Router();
const { Post, User, Comment } = require('../models');

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

router.post('/', async(req, res) =>{
    const { postTitle, postContent} = req.body;

    if(!postTitle || !postContent){
        res.status(400).json('Invalid request');
        return;
    }
    let user = null;
    try {
        const response = await User.findOne({
            where: {username: req.session.username},
            attributes: ['id'],
            raw: true,
        })

        user = response;
    } catch (error) {
        res.status(500).json('Internal server error');
        return;
    }

    if(!user){
        res.status(400).json('user not found');
        return
    }

    const post = {
        title: postTitle,
        content: postContent,
        authorId: user.id,
        publishedAt: Date.now(),
    }

    try {
        const response = await Post.create(post);

        res.status(200).json('Post created')
        return;
    } catch (error) {
        res.status(500).json('Internal server error');
        return;
    }
})

router.put('/', async(req, res) => {
    const { id, title, content} = req.body;

    if(!id || !title || !content){
        res.status(400).json('Invalid request');
        return;
    }

    try {
        const post = await Post.findByPk(id);

        if(!post){
            res.status(404).json('Cant find post');
            return;
        }

        await post.update({
            title,
            content
        });

        res.status(200).json('Successfully updated');
        return;
    } catch (error) {
        res.status(500).json('Invalid server error');
        return
    }
   
})

module.exports = router;