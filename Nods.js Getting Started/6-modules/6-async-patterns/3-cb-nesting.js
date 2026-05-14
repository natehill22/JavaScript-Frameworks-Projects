const fs = require('fs'); //Imports file system module

//Nested callback functions. cb2 cannot execute until cb1 successfully completes (callback hell)
fs.readFile(__filename, function cb1(err, data) {
  fs.writeFile(__filename + '.copy', data, function cb2(err) {
    // Nest more callbacks here...
  });
});

console.log('TEST'); //Prints to the terminal first
