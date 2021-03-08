const express = require('express');
const router = express.Router();
const Image = require('../models/Image');
const multer = require('multer');               //multer is neede with image storaging

//stuff for storing images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

//get back all the images
router.get('/', async (req, res) => {
    try{
        const images = await Image.find();
        res.json(images);
    }catch(err){
        res.json({ message:err });
    }
});

//submit a post
router.post('/', upload.single('image'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    const post = new Image({
        title: req.body.title,
        description: req.body.description,
        image: req.file.path
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
        const post = await Image.findById(req.params.postId);
        res.json(post);
    }catch (err) {
        res.json({message:err});
    }
});

//Delete Post
router.delete('/:postId', async (req,res) => {
    try{
        const removedPost = await Image.remove({_id: req.params.postId })
        res.json(removedPost);
    }catch(err){
        res.json({message:err}); 
    }
});

//Update Post
router.patch('/:postId', async (req,res) => {
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId }, 
            {$set: {title: req.body.title}}
            );
            res.json(updatedPost);
    }catch(err){
        res.json({message:err}); 
    }
});

module.exports = router;