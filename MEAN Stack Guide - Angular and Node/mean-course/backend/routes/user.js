const express = require("express"); //Imports express framework to create and manage the web server

const UserController = require("../controllers/user"); //Imports controller functions for business logic for users

const router = express.Router(); //Creates router instance to handle post-specific endpoints 

//Signup post user route (registers a new user), maps POST requests to the createUser controller
router.post("/signup", UserController.createUser);
//Login post user route (logs in a user), maps POST requests to the userLogin controller
router.post("/login", UserController.userLogin);

module.exports = router;