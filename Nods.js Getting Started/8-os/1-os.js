const os = require('os');

//Prints current os platform (linux, win32, etc.)
console.log('OS platform:', os.platform());

//Prints current architechture of the CPU (32, 64, ARM, etc.)
console.log('OS CPU architecture:', os.arch());

//Prints count of each CPU core 
console.log('# of logical CPU cores', os.cpus().length);

//Prints home directory info
console.log('Home directory for current user', os.homedir());

//Prints a created multi-line string using end-of-line character
console.log('line 1' + os.EOL + 'line 2' + os.EOL + 'line 3');
