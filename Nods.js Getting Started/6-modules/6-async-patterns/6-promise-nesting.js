const fs = require('fs').promises; //Imports file system module and promises sub-module

async function main() {
  const data = await fs.readFile(__filename); //Pauses execution to run code after main call
  await fs.writeFile(__filename + '.copy', data); //Script file is read and copied
  // More awaits here...
}

main(); //Invokes async wrapper function
console.log('TEST');
