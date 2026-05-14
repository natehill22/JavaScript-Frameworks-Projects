//Allows objects to emit named events that trigger listener functions
const EventEmitter = require('events'); 

// Streams are Event Emitters
// process.stdin, process.stdout

//Makes myEmitter an object that can emit events
const myEmitter = new EventEmitter();

//Callback will be placed on the event loop to be invoked after the rest of the program is executed
setImmediate(() => {
myEmitter.emit('TEST_EVENT'); //Emits an event
});

//Subscribe listeners to the emitted event (can be done multiple times)
myEmitter.on('TEST_EVENT', () => {
    console.log('TEST_EVENT was fired');
});
myEmitter.on('TEST_EVENT', () => {
    console.log('TEST_EVENT was fired');
});
myEmitter.on('TEST_EVENT', () => {
    console.log('TEST_EVENT was fired');
});

