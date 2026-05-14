import { createServer } from 'http'; //Imports createServer object from the http module

//Creates a new web-server instance
const server = createServer((req, res) => {
  res.end('Hello Node...\n');
});

//Binds server to port 4242 and prints confirmation message
server.listen(4242, () => {
  console.log('Server is running...');
});
