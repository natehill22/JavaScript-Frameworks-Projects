//Print "Hello World" forever. Starting with a delay of 1 second
//but then incrementing the delay by 1 second each time.
//The second time will have a delay of 2 seconds
//The third time will have a delay of 3 seconds.

//Include the delay in the printed message
//ex. Hello World. 1

//Constraints: You can only use const (no let or var)


const HelloWorld = secondDelay => {
  setTimeout(() => {//Schedules the callback to run upon the value of the secondDelay value * 1000ms (1s)
    console.log("Hello World " + secondDelay); //Logs Hello World with the second delay value
    HelloWorld(secondDelay + 1); //Re-calls the function itself with updated delay amount
  }, secondDelay * 1000);
};

HelloWorld(1); //Start the loop with a 1 second delay


