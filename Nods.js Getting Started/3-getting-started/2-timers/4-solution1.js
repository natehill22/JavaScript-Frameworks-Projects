//Defines a function with a delay parameter that prints strings and the arguement to the console
const theOneFunc = delay => {
  console.log('Hello after ' + delay + ' seconds');
};

setTimeout(theOneFunc, 4 * 1000, 4); //Calls function to run after a 4 second delay

setTimeout(theOneFunc, 8 * 1000, 8); //Calls function to run after a 8 second delay
