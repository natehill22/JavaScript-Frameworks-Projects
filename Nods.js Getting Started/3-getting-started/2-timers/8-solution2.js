let counter = 0; //Sets counter to 0

//Prints hello world and increments the counter every 1 second
const intervalId = setInterval(() => {
  console.log('Hello World');
  counter += 1;

  //Once counter is 5, prints "done" and clears the interval
  if (counter === 5) {
    console.log('Done');
    clearInterval(intervalId);
  }
}, 1000);