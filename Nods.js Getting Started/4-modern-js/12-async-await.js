const https = require('https'); //Imports the http module for creating web-servers

//Wraps Node's http method in a Promise
function fetch (url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = ''; //Initializes a string accumulator to store incoming network chunks
      res.on('data', (rd) => data = data + rd); //Sets listener for incoming network packets that will get appended to the string
      res.on('end', () => resolve(data)); //When complete, fulfills the promise and passes the completed string on
      res.on('error', reject); //Triggers reject if connection or URL fails
    });
  });
}

fetch('https://www.javascript.com/')
  .then(data => { //Waits until internal resolve(data) fires, then prints the length of the data to the console
    console.log(data.length);
  });

  //Does the same as above, but with async/await formatting for comparison
  (async function read() {
    const data = await fetch('https://www.javascript.com/');

    console.log(data.length);
  })();
