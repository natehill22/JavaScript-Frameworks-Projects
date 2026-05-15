//Allows objects to emit named events that trigger listener functions
import { EventEmitter } from 'events';

//Makes myEmitter an object that can emit events
const myEmitter = new EventEmitter();

//Subscribe listeners to the emitted event (can be done multiple times)
myEmitter.on('Test_Event', () => {
    console.log('Test_Event firing!');
});

myEmitter.emit('Test_Event'); //Emits an event