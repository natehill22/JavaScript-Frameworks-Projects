const dbConfig = require("../db.config"); //Imports config files (containing DB connection sting)
const mongoose = require("mongoose"); //Imports the mongoose library to the app can communicate with mongoDB

const db = {}; 
db.mongoose = mongoose; //Attaches the mongoose package so other files don't have to import it separately
db.url = dbConfig.url; //Gets DB url string and attaches it to the db object
db.tutorials = require("./tutorial.model")(mongoose); //Imports tutorial model file, runs the exported function, and passes the active instance into it

module.exports = db; //Exports the db object, which holds everything we need to access our database in it