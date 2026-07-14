const express = require('express'); //Imports express framework
const mongoose = require('mongoose'); //Imports mongoose package for object data modeling
const bodyParser = require('body-parser'); //Imports a module that turns HTTP request data into JS objects to be used in req.body
const app = express(); //Sets app variable to the express server instance

//Sets configuration to protects data when testing and creates signage
if(process.env.ENV ==='Test'){
  console.log('This is a test');
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test'); //Creates database connection to mongoDB for testing
} else {
  console.log('This is for real');
  const db = mongoose.connect('mongodb://localhost/bookAPI'); //Creates database connection to mongoDB
}

const port = process.env.PORT || 3000; //Port to show the browser in
const Book = require('./models/bookModel'); //Imports the Book/bookModel model
const bookRouter = require('./routes/bookRouter')(Book); //Imports the bookRouter routes (loaded with book data)

app.use(bodyParser.urlencoded({ extended: true })); //Parses incoming requests
app.use(bodyParser.json()); //Pulls json out of the post body and puts it into the req.body

app.use('/api', bookRouter); //Mounts a group of book-related routes to the /api prefix

//When a request is sent, it responds with the text in the console
app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

//Listens for changes on the port in our nodemon config
app.server = app.listen(port, () => {
  console.log(`Running on port ' + ${port}`);
});

module.exports = app;