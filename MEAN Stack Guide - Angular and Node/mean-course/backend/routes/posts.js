const express = require("express"); //Imports express framework to create and manage the web server

const PostController = require("../controllers/posts"); //Imports controller functions for business logic for posts

const checkAuth = require("../middleware/check-auth"); //Imports authentication middleware to protect routes
const file = require("../middleware/file"); //Imports file upload middleware layer
const extractFile = require("../middleware/file"); //Imports file upload middleware layer

const router = express.Router(); //Creates router instance to handle post-specific endpoints 


//Post route, requires valid auth token and parses an uploaded file
router.post("", checkAuth, extractFile, PostController.createPost);
//Update route, requires valid auth token and parses an uploaded file
router.put("/:id", checkAuth, extractFile, PostController.updatePost);
//Get route (fetches all posts), public endpoint
router.get('', PostController.getPosts);
//Get route (one post), public endpoint
router.get("/:id", PostController.getPost);
//Delete route, requires auth token
router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;