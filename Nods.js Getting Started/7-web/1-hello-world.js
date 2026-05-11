const http = require('http');

const requestListener = (req, res) => {
  //req and res are streams (req = readable, res = writable)
  console.log(req.url);
  res.write('Hello Node\n');
  res.end();
};

const server = http.createServer();
server.on('request', requestListener);

server.listen(4242, () => {
  console.log('Server is running...');
});
