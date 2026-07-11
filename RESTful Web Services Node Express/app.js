const express = require('express'); //Imports express framework
const mongoose = require('mongoose'); //Imports mongoose package
const bodyParser = require('body-parser');
const app = express(); //Sets app variable to the express server instance
const db = mongoose.connect('mongodb://localhost/bookAPI'); //Gets up a database connection to mongoDB

const port = process.env.PORT || 3000; //Port to show the browser in
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //Pulls json out of the post body and puts it into the req.body

app.use('/api', bookRouter);

//When a request is sent, it responds with the text in the console
app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

//Listens for changes on the port in our nodemon config
app.listen(port, () => {
  console.log(`Running on port ' + ${port}`);
});