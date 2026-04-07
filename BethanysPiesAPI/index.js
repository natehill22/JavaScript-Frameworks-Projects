//Bring in the express server and create application
let express = require('express'); //Require function resolves libraries and modules in Node path (node_modules)
let app = express(); //Creates an 'express' application
let pieRepo = require('./repos/pieRepo'); //Brings in exported module

//Use the express Router object
let router = express.Router(); //Gives us to route to things (when using endpoints)
let pies = pieRepo.get(); //Pulls list of pies from pieRepo.js

//Create GET to return a list of all pies in JSON format
router.get('/', function (req, res, next) { //Request object, response object, and next (for error handling)
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All pies retrieved.",
        "data": pies
    });
});

//Configure router so all routes are prefixed with /api/v1
app.use('/api/', router);

//Create server to listen on port 5000
var server = app.listen(5000, function () {
    console.log('Node server is running on http://localhost:5000..');
});