// Print "Hello World"
// Every second
// And stop after 5 times

// After 5 times. Print "Done" and let Node exit.

let counter = 0;
const intervalId = setInterval(() => { //Start setInterval call capturing its id
    console.log("Hello World");
    counter += 1; //Increment counter each interval

    if (counter === 5) { //When counter reaches 5, print "Done" and stop the process
      console.log('Done');
      clearInterval(intervalId);
}
}, 1000); //All content within setInterval brackets will repeat every second
