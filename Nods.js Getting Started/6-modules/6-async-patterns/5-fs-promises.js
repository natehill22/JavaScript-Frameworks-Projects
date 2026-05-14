const { readFile } = require('fs').promises; //Imports promise-based version of readFile method from fs directly into readFile variable

async function main() {
  const data = await readFile(__filename); //Pauses execution to run code after main call
  console.log('File data is', data); //Prints after file read complete and main thread is clear
}

main(); //Invokes async wrapper function

console.log('TEST');
