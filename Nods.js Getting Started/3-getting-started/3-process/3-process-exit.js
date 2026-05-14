//Timer set to fire after 2 seconds that will terminate the process (exit)
setTimeout(() => process.exit(), 2000);

process.on('exit', () => {
  console.log('Process will exit now. See you later!'); //Upon exit, print text
});

console.log('Hello!'); //This will be executed first due to node's asyncronous nature
