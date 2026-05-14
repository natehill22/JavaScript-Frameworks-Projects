const express = require('express'); //Imports express framework module

//Creates a new express application object
const server = express();

//If request matches URL, string is sent
server.get('/', (req, res) => {
  res.send('Hello Express!');
});

//Binds server to port 8000 and prints confirmation message
server.listen(8000, () => {
  console.log('Server is running...');
});
