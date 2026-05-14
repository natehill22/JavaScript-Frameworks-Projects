const fs = require('fs'); //Imports file system module

//Callback function for reading a file
fs.readFile(__filename, function cb(err, data) {
  console.log('File data is', data);
});

console.log('TEST'); //Prints to the terminal first
