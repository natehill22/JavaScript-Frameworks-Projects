const fs = require('fs'); //Imports file system module
const util = require('util'); //Imports util module

const readFile = util.promisify(fs.readFile); //Converts traditional readFile function into a promise version

async function main() {
  const data = await readFile(__filename); //Pauses execution to run code after main call
  console.log('File data is', data); //Prints after file read complete and main thread is clear
}

main(); //Invokes async wrapper function

console.log('TEST');
