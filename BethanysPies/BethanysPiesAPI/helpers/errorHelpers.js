let logRepo = require('../repos/logRepo'); //Brings in exported error logging file

//Defines errorHelpers as a list of error-based functions
let errorHelpers = { 
    //Defines handler for logging errors to the console
    logErrorsToConsole: function (err, req, res, next) {
        console.error("Log Entry: " + JSON.stringify(errorHelpers.errorBuilder(err)));
        console.error("*".repeat(80)); //Sends error information to the console (with seperation elements)
        next(err) //Calls the next error (middleware piece)
    },
    //Defines handler for logging errors to the log file
    logErrorsToFile: function (err, req, res, next) {
        let errorObject = errorHelpers.errorBuilder(err); //Pulls in the details of the error
        errorObject.requestInfo = { //Adds more information to the log file
            "hostname": req.hostname,
            "path": req.path,
            "app": req.app,
        }
        logRepo.write(errorObject, function (data) { //Writes the error information to the console
            console.log(data);
        }, function (err) {
            console.error(err);
        });
        next(err) //Calls the next error (middleware piece)
    },
    //Defines handler for errors within the request object
    clientErrorHandler: function (err, req, res, next) {
        if (req.xhr) { //If the request is an XML Http Request, send specific error messaging
            res.status(500).json({
                "status": 500,
                "statusText": "Internal Server Error",
                "message": "XMLHttpRequest error",
                "error": {
                    "errno": 0,
                    "call": "XMLHttpRequest Call",
                    "message": "XMLHttpRequest error"
                }
            });
        } else {
            next(err); //Calls the next error (middleware piece)
        }
    },
    //Configure exception middleware last
    errorHandler: function (err, req, res, next) {
        res.status(500).json(errorHelpers.errorBuilder(err)); //Error callback: returns JSON object in errorBuilder
    },
    errorBuilder: function (err) { //Defines error builder function
        return { //Returns JSON pertaining to error data
            "status": 500,
            "statusText": "Internal Server Error",
            "message": err.message,
            "error": {
                "errno": err.errno,
                "call": err.syscall,
                "code": "INTERNAL_SERVER_ERROR",
                "message": err.message
            }
        };
    }
};

module.exports = errorHelpers; //Exports errorHelpers JSON to be used in other files