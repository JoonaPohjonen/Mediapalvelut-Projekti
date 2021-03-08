const express = require('express')              //always import express on every page
const router = express.Router();                //import the router
const User = require('../models/User');         //get the model/schema
const bcrypt = require('bcrypt');               //password encrypting tool
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    try{
        const posts = await User.find();
        res.json(posts);
    }catch(err){
        res.json({ message:err });
    }
});

//Adding users
router.post('/signup', async (req, res) => {

    //Secures the password that the user sends by "salting it"
    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)

    //Checks if account has already been registered under given email
    User.findOne({email: req.body.email})                               //tells api to try and find one email from database that is identical to what user tried to sign up with
    .then((user) => {
        if (user) {                                                     //if given email is already in database, send response back to user telling they cant sign up with same email
            console.log('Email already exists')
            res.send('Email already exists')
        } else {                                                        //if database doesnt have this email yet, allow user to continue with sign up process
            console.log('this is a new email')

            const signedUpUser = new User({
                fullName: req.body.fullName,
                userName: req.body.userName,
                email: req.body.email,
                password: securePassword,                      //now we include the salted(encrypted) password to database. this way if data would leak, passwords would still be safe
                age: req.body.age
            });
        
            const savedSignedUpUser = signedUpUser.save()      // save and add the new user
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json({ message: err });
            })
        }
    })
});

router.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({email: email})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if(err) {
                    res.json({
                        error: err
                    })
                }
                if(result) {
                    let token = jwt.sign({email: user.email}, process.env.ACCESS_TOKEN_SECRET)
                    res.json({
                        message: 'Login Successful',
                        token,
                        username: user.userName
                    })
                } else {
                    res.send('wrong password')
                }
            })
        } else {
            res.send('email does not exist')
        }
    })
});

module.exports = router;                                //always export the route so it can be used