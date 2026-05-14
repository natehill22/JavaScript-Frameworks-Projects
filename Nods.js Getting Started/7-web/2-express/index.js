const express = require('express'); //Imports express framework into Node.js

//Creates a new express application object
const server = express();

//If request matches URL, string is sent
server.get('/', (req, res) =>{
  res.send('Hello Express');
});

//If request matches URL, string is sent
server.get('/about', (req, res) =>{
  res.send('About...');
});

//Binds server to port 4242 and prints confirmation message
server.listen(4242, () => {
  console.log('Express Server is running...');
});
