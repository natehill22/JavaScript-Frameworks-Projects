const http = require('http'); //Imports http module for creating web-servers

//Creates a new web-server instance
const server = http.createServer((req, res) => {
  res.end('Hello Node...\n'); //Prints this to the browser or client
});

//Binds server to port 4242 and prints confirmation message
server.listen(4242, () => {
  console.log('Server is running...');
});
