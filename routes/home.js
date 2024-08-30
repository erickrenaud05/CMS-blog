const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async(req, res) => {
    try{
        const post = await Post.findAndCountAll({
            limit: 10,
            include: {model: Comment, model: User},
        });

        if(post.count === 0){
            return res.status(404).json('No post found');
        }

        return res.status(200).json(post.rows);

    }catch(err){
        return res.status(500).json('Internal server error');
    }
})

module.exports = router;