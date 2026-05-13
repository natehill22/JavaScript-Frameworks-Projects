
The Node.js Getting Started Pluralsight course was massive and I learned so much from it--more than I will likely be able to include here (but I'll do my best). Node.js started as a way to use JavaScript on backend web-servers (a single language across a full stack); over time, it has been built into much more: it is now a generic runtime environment for JavaScript, a framework with its own package manager (npm) that comes chock-full of feature-rich tools and modules (built-in and custom)--all of which offer asynchronous APIs that can be used without threads, a powerful debugger than can interface directly with Chrome DevTools, the ability to break down complex applications into smaller, independent units (nodes) that can be scaled-up, through network protocols, into large distributed programs, and a wrapper around V8 (Google's high-performance JavaScript engine). 

I had some review of ES6 additions into JavaScript (through Node.js), which was very welcome as I hadn't had enough time to fully understand them previously. I spent more time understanding variables and block scopes (with focus on the behaviors of the var, let, and const keywords), arrow functions (specifically how arrow functions can be utilised with "this" to target the parent scope instead of the caller's scope), object literals (notably the addition to dynamic property syntax to use an expression as an object key inside the object literal), destructuring and using the rest/spread properties, template strings (for multi-line strings and adding dynamic JS values), classes, and callback functions in comparison to promises (including the syntactic sugar for promises that is async/await). There were also several challenges that allowed me to brush up on my understanding of setTimeout and setInterval.

A lot of what I learned was how to navigate Node's many systems. Node.js has a REPL that you can call to try out code snippets (without having to save a .js file first). It has a CLI that allows you to interact with your OS through inputs in a terminal. Node.js has a package manager (npm, mentioned above) that has its own distinct command syntax that can be used to find help, install modules (local or global), using npm packages in node, run files, create, publish or update packages, how to use NPX (to run packages without needing them installed), run scripts (giving shorter alias for commands/paths in your package.json file). I learned that package.json and package-lock.json are your blueprints for your exact setup (node modules), so that others working on the same project can be on the same page quickly and easily. I learned about semantic versioning (within those package.json files) that is a distinct format that tells the version of npm packages installed. 

NPM is also connected to the npm registry, which is a massive online repository containing all the packages uploaded. Through a simple command, users can access these packages/modules, install them, and be using them in seconds. This way, npm is built create a space to facilitate sharing and re-using code as well as finding pre-existing code that you can use (instead of writing it all out). 



customizable options
bridge to the os through process object

modules (exports/require), how to define and use
define and use multiple types of apis in node
global object - avoid using
node's event loop - hidden magic that allows you to do asynchronous programming 
error handling - error vs exception and how to navigate that
node clusters - master process that can spawn, manage, and restart other workers (independent copies that run on their own cpu cores that share a port) 
asynchronous patterns - promise pattern compared to the callback pattern for readability and flexibility
concurrency - node allows operations of many things at once without using threads
eventEmitter module - using listeners (callback functions) on emitted events. this facilitates communication and allows for custom asynchronous event-driven architecture 

web servers - originally designed to help devs create web-servers
http module - web server function - http library
nodemon to reload node in development
req and res objects within request listeners
express framework
EJS templating language

os module -interact with os
fs module - interact with files (write and read)
child_process module - allows you to run any os command within node
debug with chrome dev tools in node