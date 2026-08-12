const path = require("path"); //Imports Node utility for handling/transforming file paths
const express = require('express'); //Imports express framework to create and manage the web server
const bodyParser = require('body-parser'); //Imports body-parser middleware to parse incoming request bodies
const mongoose = require('mongoose'); //Imports Mongoose to interact with the Mongo database

const postsRoutes = require('./routes/posts');  //Imports routing logic for post-related API endpoints
const userRoutes = require('./routes/user'); //Imports routing logic for user-related API endpoints

const app = express(); //Initializes new Express instance

//Connects to a local Mongo database
mongoose.connect('mongodb://localhost/meandb')
    .then(() => {
        console.log('Connected to database!'); //Logs a success message if connected
    })
    .catch(() => {
        console.log('Connection failed!'); //Logs a fail message if not connected
    });

app.use(bodyParser.json()); //Middleware to parse incoming requests with JSON
app.use(bodyParser.urlencoded({ extended: false })); //Middleware to parse URL-encoded bodies (can only parse key-value pairs)
app.use("/images", express.static(path.join("backend/images"))); //Serves static image files from the backend/image folder when accessing

//Middleware to handle CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*"); //Allows any domain to access this API
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization"); //Defines HTTP headers permitted in incoming requests
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, PUT, DELETE, OPTIONS"); //Defines HTTP methods allowed for requests
    next();
});

app.use("/api/posts", postsRoutes); //Forwards all requests starting with "api/posts" to posts routing file
app.use("/api/user", userRoutes); //Forwards all requests starting with "api/users" to users routing file

module.exports = app;