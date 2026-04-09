let fs = require('fs'); //Imports built-in File System module that can read and write to files

const FILE_NAME = './assets/pies.json'; //Defines the file location and ties it into a variable

//Defines pieRepo object with a get method designed to read and parse a JSON file asynchronously
let pieRepo = {
    get: function (resolve, reject) { //Will be wrapped in a JS promise
        fs.readFile(FILE_NAME, function (err, data) { //Reads all content from repo-style file
            if (err) { 
                reject(err); //If file can't be read, reject callback is triggered
            }
            else {
                resolve(JSON.parse(data)); //If successful, converts data into JSON and returned (via the resolve callback)
            }
        });
    },
    //Reads, parses, and filters a JSON file to find a specific object by its ID
    getById: function (id, resolve, reject) { //Defines a function that takes an id to search for and uses callbacks in a JS promise
        fs.readFile(FILE_NAME, function (err, data) { //Reads all content
            if (err) {
                reject(err); //If file can't be read, reject callback is triggered
            }
            else { //If successful, puts the data into a JS object and searches it for the first element where its id matches the requested id
                let pie = JSON.parse(data).find(p => p.id == id); //Finds the value based on the id to target the correct pie object
                resolve(pie);  //Returns the found object (pie)
            }
        });
    },
    //Reads, parses, and filters a JSON file to find a specific object by its ID, name, or both
    search: function (searchObject, resolve, reject) { //Defines a function that takes a searchObject and uses callbacks in a JS promise
        fs.readFile(FILE_NAME, function (err, data) { //Reads all content
            if (err) {
                reject(err); //If file can't be read, reject callback is triggered
            }
            else { //If successful, puts the data into a JS object and searches it for the first element where its id matches the requested id
                let pies = JSON.parse(data); //Turns the raw data into a array of JS objects
                //If a searchObject id exists, it matches the item's id, if name, it matches item's name w/o case sensitivity and only return first occurence
                if (searchObject) { 
                    pies = pies.filter(
                        p => (searchObject.id ? p.id == searchObject.id : true) &&
                            (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true));         
                }
                
                resolve(pies); //Returns filtered data
            }
        })
    },
    //Reads and parses a JSON file to add new objects to that file
    insert: function (newData, resolve, reject) { //Defines a function that takes a newData 'pie' object and uses callbacks in a JS promise
        fs.readFile(FILE_NAME, function (err, data) { //Reads all content from repo-style file
            if (err) {
                reject(err); //If file can't be read, reject callback is triggered
            }
            else { //If successful, append the new data to repo file and ensure it's in JSON format
                let pies = JSON.parse(data); //Turns the raw data into a array of JS objects
                pies.push(newData); //Pushes the new object onto the 'pies' array
                fs.writeFile (FILE_NAME, JSON.stringify(pies), function (err) { //Applies JSON formatting to the pies array  
                    if (err) {
                        reject(err);  //If file can't be written to, reject callback is triggered
                    }
                    else {
                        resolve(newData); //Returns new data to be added
                    }
                });
            }
        });
    },
    //Reads and parses a JSON file to update objects in that file
    update: function (newData, id, resolve, reject) { //Defines a function that takes a newData and id (for targeting) objects and uses callbacks in a JS promise
        fs.readFile(FILE_NAME, function (err, data) { //Reads all content from repo-style file 
            if (err) {
                reject(err); //If file can't be read, reject callback is triggered
            }
            else {
                let pies = JSON.parse(data); //Turns the raw data into an array of JS objects
                let pie = pies.find(p => p.id == id); //Finds the value based on the id to target the correct pie object
                if (pie) {
                    Object.assign(pie, newData); //Take any values in the current found data and newData and updates them with new changes
                    fs.writeFile (FILE_NAME, JSON.stringify(pies), function (err) { //Applies JSON formatting to the pies array
                        if (err) {
                            reject(err); //If file can't be written to, reject callback is triggered
                        }
                        else {
                            resolve(newData); //Returns new data to be added
                        }
                    });
                }
            }
        });
    },
    //Reads and parses a JSON file to delete an object in that file
    delete: function (id, resolve, reject) { //Defines a function that takes an id to search for and uses callbacks in a JS promise
        fs.readFile(FILE_NAME, function (err, data) { //Reads all content from repo-style file
            if (err) {
                reject(err); //If file can't be read, reject callback is triggered
            }
            else {
                let pies = JSON.parse(data); //Turns the raw data into an array of JS objects
                let index = pies.findIndex(p => p.id == id); //Finds the value based on the id to target the correct pie object
                if (index != -1) {
                    pies.splice(index, 1); //Removes the value from the array
                    fs.writeFile(FILE_NAME, JSON.stringify(pies), function(err) { //Applies JSON formatting to the pies array
                        if (err) {
                            reject(err); //If file can't be written to, reject callback is triggered
                        }
                        else {
                            resolve(index); //Returns the found id value
                        }
                    });
                }
            }
        });
    }
};

module.exports = pieRepo; //Exports pieRepo JSON to be used in other files