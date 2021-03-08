const express = require('express');             //creates an express app
const app = express();
const mongoose = require('mongoose');           //needed for connecting to mongodb database
const bodyParser = require('body-parser');      //body parser for wieving json content
const cors = require('cors');                   //tool for handling cors policy and avoiding cors errors
require('dotenv/config');                       //tool for connecting to mongodb database

//Middleware for cors access
app.use(cors());

//Middleware that enables body-parser for the whole application. Needed for sending POST requests
app.use(bodyParser.json());

//Import routes
const imagesRoute = require('./routes/images');
const textsRoute = require('./routes/texts');
const usersRoute = require('./routes/users');

//Middlewares
app.use('/uploads', express.static('uploads')); //image middleware, makes the uploads folder accessible
app.use('/images', imagesRoute);
app.use('/texts', textsRoute);
app.use('/users', usersRoute);

//with no routes we are on home page; content for home page below
app.get('/', (req, res) => {
    res.send('we are on home');
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true }, 
    () => console.log('connected to DB!')
);

app.listen(8001);                   //assing a port for our API, in this case we chose 8001