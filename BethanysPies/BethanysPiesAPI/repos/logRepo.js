let fs = require('fs'); //Imports built-in File System module that can read and write to files

const FILE_NAME = './logs/log.txt'; //Creates a variable that gives the location of where to write logs

//Defines logRepo object that will write log data to a file
let logRepo = {
    write: function (data, resolve, reject) { //Defines a function that writes data and uses callbacks in a JS promise
        let toWrite = "*".repeat(80) + "\r\n"; //Adds boundary asterisks
        toWrite += "Date/Time: " + new Date().toLocaleDateString() + "\r\n"; //Appends Date and Time
        toWrite += "Exception Info: " + JSON.stringify(data) + "\r\n"; //Appends exception information
        toWrite += "*".repeat(80) + "\r\n"; //Appends boundary asterisks

        //Writes error information to the log file
        fs.writeFile(FILE_NAME, toWrite, function (err) {
            if (err) {
                reject(err); //If file can't be written to, reject callback is triggered
            }
            else {
                resolve(true); 
            }
        });
    }
};

module.exports = logRepo; //Exports logRepo JSON to be used in other files