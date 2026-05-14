const greeting = delay =>
  setTimeout(() => {
    console.log('Hello World. ' + delay); //Prints "hello world" and the delay every 1 second 
    greeting(delay + 1); //Calls itself again with an incremented (by 1) delay
  }, delay * 1000); //Multiplies the changing delay by 1 s. This will print forever

greeting(1); //Call the function with a delay of 1
