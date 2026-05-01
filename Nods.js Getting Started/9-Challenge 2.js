//Just like Challenge 1 but this time with repeated delay values.
//Print Hello World 5 times with a delay of 100 ms.
//Then Print it again 5 more times with a delay of 200 ms.
//Then print it again 5 more times with a delay of 300 ms.
//And so on until the program is killed.

//Include the delay in the printed message:
//Hello World. 100

//Constraints:
//  - Only use setInterval (not setTimeout)
//  - Use only ONE if statement

let lastIntervalId, counter = 5; //Defines lastIntervalId and counter and assigns counter value to 5

const HelloWorld = msDelay => {
  if (counter === 5) { //If counter is 5
    clearInterval(lastIntervalId); //Stop the interval
    lastIntervalId = setInterval(() => { //Set the new interval to trigger on msDelay and
      console.log("Hello World " + msDelay); //Write Hello World and the msDelay to console
      HelloWorld(msDelay + 100); //Re-calls the function itself with updated interval
    }, msDelay);
    counter = 0; //Resets counter to 0
  }

  counter += 1; //Increment counter regardless of if block (1-4 only increment counter)
}

HelloWorld(100); //First call with value for msDelay 

