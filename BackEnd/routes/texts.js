const express = require('express');
const router = express.Router();
const Text = require('../models/Text');

//Get all the text files
router.get('/', async (req, res) => {
    try{
        const posts = await Text.find();
        res.json(posts);
    }catch(err){
        res.json({ message:err });
    }
});

//Make a new post
router.post('/', (req, res) => {
    console.log(req.file);
    const post = new Text({
        title: req.body.title,
        description: req.body.description
    });

    const savedPost = post.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({ message: err });
    })
});

//get specific post
router.get('/:postId', async (req, res) => {
    try{
        const post = await Text.findById(req.params.postId);
        res.json(post);
    }catch (err) {
        res.json({message:err});
    }
});

//Delete Post
router.delete('/:postId', async (req,res) => {
    try{
        const removedPost = await Text.remove({_id: req.params.postId })
        res.json(removedPost);
    }catch(err){
        res.json({message:err}); 
    }
});

//Update Post
router.patch('/:postId', async (req,res) => {
    try{
        const updatedPost = await Text.updateOne(
            {_id: req.params.postId }, 
            {$set: {title: req.body.title}}
            );
            res.json(updatedPost);
    }catch(err){
        res.json({message:err}); 
    }
});

module.exports = router;