const express = require('express'); //Imports express framework into Node.js

//Creates a new express application object
const server = express();

//Configuring express to work with EJS
server.set('view engine', 'ejs');

//Renders specified index template to the requester
server.get('/', (req, res) => {
  res.render('index');
});

//Renders specified about template to the requester
server.get('/about', (req, res) => {
  res.render('about');
});

//Binds server to port 4242 and prints confirmation message
server.listen(4242, () => {
  console.log('Express Server is running...');
});
