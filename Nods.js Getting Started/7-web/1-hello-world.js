//Allows for the creation of web-servers
const http = require('http'); 

//Defines callback with the ability to read and write streams (req = readable, res = writable)
const requestListener = (req, res) => {
  console.log(req.url); //Prints URL path to terminal
  res.write('Hello Node\n'); //Pushes string into the response steam
  res.end(); //Closes connection
};

//Creates new instance of server class
const server = http.createServer();
server.on('request', requestListener); //When an HTTP request hits the server, Node executes requestListener function

//Binds server to port 4242 and prints confirmation message
server.listen(4242, () => {
  console.log('Server is running...');
});
