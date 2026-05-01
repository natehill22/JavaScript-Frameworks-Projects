const theOneFunc = delayText => {
  console.log('Hello after ' + delayText + ' seconds');
};

setTimeout(theOneFunc, 4 * 1000, 4);

setTimeout(theOneFunc, 8 * 1000, 8);

//setInterval(theOneFunc, 4 * 1000, 4);