//Brings in the express server and creates application
let express = require('express'); //Imports express.js framework which allows for web application creation
let app = express(); //Creates an 'express' application
let pieRepo = require('./repos/pieRepo'); //Brings in exported module
let errorHelper = require('./helpers/errorHelpers'); //Brings in exported module for error handling
let cors = require('cors'); //Imports cors which helps manage web browser reading of apis from different origins

//Creates a mini-app in express.js solely designed for handling routes
let router = express.Router(); 

//Configures middleware to support JSON parsing in request objects
app.use (express.json());

//Configure CORS
app.use(cors()); //Manages how a web browser interacts with the API when request is from a different origin

//Creates GET to return a list of all pies in JSON format
router.get('/', function (req, res, next) { //Defines handler for get requests and parameters (Request object, response object, and next [for error handling])
    pieRepo.get(function (data) { //Success callback: sends status 200 OK with JSON data
        res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All pies retrieved.",
        "data": data
        });
    }, function(err) {
        next(err); //Error callback: jump directly to error-handling
    });
});

//Creates GET/search?id=n&name=str to search for pies by 'id' and/or 'name'
router.get('/search', function (req, res, next) { //Defines handler for get search requests and parameters (Request object, response object, and next [for error handling])
    let searchObject = { //Pulls id and name from URL query string and keeps them in searchObject variable
        "id": req.query.id,
        "name": req.query.name
    };

    pieRepo.search(searchObject, function (data) { //Passes values into pieRepo search
        res.status(200).json({ //Success callback: sends status 200 OK with results of a JSON object
            "status": 200,
            "statusText": "OK",
            "message": "All pies retrieved.",
            "data": data
        });
    }, function (err) {
        next(err); //Error callback: jump directly to error-handling
    });
});

//Creates GET/id to return a single pie in JSON format
router.get('/:id', function (req, res, next) { //Defines handler for get id requests and parameters (Request object, response object, and next [for error handling])
    pieRepo.getById(req.params.id, function (data) { //Pulls id from URL and keeps it in req.params.id 
        if (data) {
            res.status(200).json({ //Success callback: sends status 200 OK with results of a JSON object
                "status": 200,
                "statusText": "OK",
                "message": "Single pie retrieved.",
                "data": data
            });
        }
        else {
            res.status(404).json({ //Not Found path, returns a Not Found status with appropriate error messaging
                "status": 404,
                "statusText": "Not Found",
                "message": "The pie '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The pie '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function(err) {
        next(err); //Error callback: jump directly to error-handling
    });
});

//Creates POST to add new data in JSON format to the repo-style file
router.post('/', function (req, res, next) { //Defines handler for post requests and parameters (Request object, response object, and next [for error handling])
    pieRepo.insert(req.body, function(data) { //Pushes data from req.body to the pieRepo 
        res.status(201).json({ //Success callback: sends status 201 Created with results of the newly created JSON object
            "status": 201,
            "statusText": "Created",
            "message": "New Pie Added.",
            "data": data
        });
    }, function(err) {
        next(err); //Error callback: jump directly to error-handling
    });
})

//Updates data using a PUT request in JSON format to the repo-style file
router.put('/:id', function (req, res, next) { //Defines handler for put id requests and parameters (Request object, response object, and next [for error handling])
    pieRepo.getById(req.params.id, function (data) { //Pulls id from URL and keeps it in req.params.id 
        if (data) {
            pieRepo.update(req.body, req.params.id, function (data) { //Attempts to update data
                res.status(200).json({ //Success callback: sends status 200 OK with results of an updated JSON object
                    "status": 200,
                    "statusText": "OK",
                    "message": "Pie '" + req.params.id + "' updated.",
                    "data": data
                });
            });
        }
        else {
            res.status(404).json({ //Not Found path, returns a Not Found status with appropriate error messaging
                "status": 404,
                "statusText": "Not Found",
                "message": "The pie '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The pie '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function(err) {
        next(err); //Error callback: jump directly to error-handling
    });
})

//Deletes selected data using a DELETE request in the repo-style file
router.delete('/:id', function (req, res, next) { //Defines handler for put id requests and parameters (Request object, response object, and next [for error handling])
    pieRepo.getById(req.params.id, function (data) { //Pulls id from URL and keeps it in req.params.id 
        if (data) {
            pieRepo.delete(req.params.id, function (data) { //Attempts to delete data
                res.status(200).json({ //Success callback: sends status 200 OK with results of an updated JSON object
                    "status": 200,
                    "statusText": "OK",
                    "message": "The pie '" + req.params.id + "' is deleted.",
                    "data": "Pie '" + req.params.id + "' deleted."
                });
            });
        }
        else {
            res.status(404).json({ //Not Found path, returns a Not Found status with appropriate error messaging
                "status": 404,
                "statusText": "Not Found",
                "message": "The pie '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The pie '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function(err) {
        next(err); //Error callback: jump directly to error-handling
    });
})

//Patch/updates selected data using a PATCH request in JSON format to the repo-style file
router.patch('/:id', function (req, res, next) { //Defines handler for patch id requests and parameters (Request object, response object, and next [for error handling])
    pieRepo.getById(req.params.id, function (data) { //Pulls id from URL and keeps it in req.params.id 
        if (data) {
            pieRepo.update(req.body, req.params.id, function (data) { //Attempts to update data
                res.status(200).json({ //Success callback: sends status 200 OK with results of an updated JSON object
                    "status": 200,
                    "statusText": "OK",
                    "message": "Pie '" + req.params.id + "' updated.",
                    "data": data
                });
            });
        }
        else {
            res.status(404).json({ //Not Found path, returns a Not Found status with appropriate error messaging
                "status": 404,
                "statusText": "Not Found",
                "message": "The pie '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The pie '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function(err) {
        next(err); //Error callback: jump directly to error-handling
    });
})

//Configure router so all routes are prefixed with /api
app.use('/api/', router);

//Configure exception logger to console
app.use(errorHelper.logErrorsToConsole);

//Configure exception logger to log file
app.use(errorHelper.logErrorsToFile);

//Configure client error handler
app.use(errorHelper.clientErrorHandler);

//Configure catch-all exception middleware last
app.use(errorHelper.errorHandler);

//Create server to listen on port 5000
var server = app.listen(5000, function () {
    console.log('Node server is running on http://localhost:5000..');
});