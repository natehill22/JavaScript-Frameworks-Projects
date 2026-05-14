const path = require('path'); //Imports path module (used to handle and transform file paths)
const fs = require('fs'); //Imports file system module

//Defines array of file paths in relative folder
const files = ['./1-loop.js', 'zzz.js', './2-try.js'];

//Synchronously loop through file list, reads content, and outputs it to the terminal with precise error messaging
files.forEach(file => {
  try {
    const data = fs.readFileSync(file, ehatf);
    console.log('File data is', data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('File not found');
    } else {
      throw err;
    }
  }
});
