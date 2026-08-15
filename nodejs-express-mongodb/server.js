const express = require("express"); //Imports express to help build REST APIs
const bodyParser = require("body-parser"); //Imports body-parser to help parse requests and create req.body object
const cors = require("cors"); //Imports cors to help express enable CORS (with various options)
const db = require ("./app/models"); //Imports models and database configuration

const app = express(); //Creates express app

var corsOptions = {
    origin: "http://localhost:8081" //Permits access only to this url to request server resources
};

//Adds body parser and cors middlewares to the express app
app.use (cors(corsOptions));
app.use(bodyParser.json()); //Parses applications/json requests 
app.use(bodyParser.urlencoded({ extended: true })); //Parses application/x-www-form-urlencoded requests

//Defines a simple GET route for testing
app.get("/", (req, res) => {
    res.json({ message:"Welcome to my application." });
});

require("./app/routes/tutorial.routes")(app); //Imports application routes

//Connects application to the database and starts a web server
db.mongoose.connect(db.url)
.then(() => {
        console.log("Connected to the database!"); //If connection is successful, write a confirmation message 
        const PORT = process.env.PORT || 8080; //Sets the port to 8080 and listens for incoming requests
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`); //Add console message to show the server is running
        });
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err); //If connection fails, print message and error to the console
        process.exit(1); //Closes entire application process
});