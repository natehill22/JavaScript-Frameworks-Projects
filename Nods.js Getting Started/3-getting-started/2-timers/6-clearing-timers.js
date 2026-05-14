//Should print after 0 seconds, but timerID is cleared directly after, so it won't be seen
const timerId = setTimeout(
  () => console.log('You will not see this one!'),
  0
);

clearTimeout(timerId);

//setImmediate is another way to provide a setTimeout with a 0ms delay
//clearInterval clears the interval
//clearImmediate clears the immediate

//Executing something with setTimeout after 0ms does not mean executed right away, it means executed right away
//after it's done with everything else
