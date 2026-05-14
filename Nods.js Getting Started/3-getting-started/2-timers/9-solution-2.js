let lastIntervalId, counter = 5; //Defines lastIntervalId and counter (and sets counter to 5)

//Prints the string and delay 5 times before incrementing the delay by 100ms and starting all over again. This will slow down every cycle of 5
const greeting = delay => {
  if (counter === 5) {
    clearInterval(lastIntervalId); //If counter = 5, clear the interval
    lastIntervalId = setInterval(() => { //Reset the interval to run again based on the changing delay
      console.log('Hello World. ' + delay); //Prints "hello world" and the delay 
      greeting(delay + 100); //Calls itself again with a delay incremented by 100ms. 
    }, delay); 
    counter = 0; //Reset the counter to 0
  }

  counter += 1; //Increment the counter y 1
};

greeting(100); //Call the function with a delay of 100ms
