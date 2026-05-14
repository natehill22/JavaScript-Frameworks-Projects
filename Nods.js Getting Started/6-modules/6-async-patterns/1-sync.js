const fs = require('fs'); //Imports file system module

//Uses synchronous version of the file-reading method
const data = fs.readFileSync(__filename);

console.log('File data is', data); //Prints first

console.log('TEST'); //Prints last
