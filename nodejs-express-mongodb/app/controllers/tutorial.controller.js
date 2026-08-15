const db = require("../models"); //Pulls in the db object from index.js
const Tutorial = db.tutorials; //Sets all db model/functionality to the Tutorial variable so it can be used to query MongoDB

//Creates and Saves a new Tutorial
exports.create = (req, res) => {
    //Returns an error message/status and stops execution if req.body.title doesn't exist
    if (!req.body.title) { 
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    //Creates a schema-matching Tutorial object from the entered data 
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false //If published is empty, defaults to false
    });

    //Saves Tutorial in the database 
    tutorial
    .save(tutorial) //Pushes new document to the database 
    .then(data => {
        res.send(data); //Returns the newly created tutorial object
    })
    //If creation fails, return error message/status
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial"
        });
    });
};

//Retrieves all Tutorials from the database
exports.findAll = (req, res) => {
    //Pulls query string out of the url to be used as a condition for the findAll method
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {}; //MongoDB regex query with case-insensitivity, if no title an empty object is used to match everything

    //Queries the database
    Tutorial.find(condition)
    .then(data => {
        res.send(data); //Returns the list of tutorials found 
    })
    //If retrieval fails, return error message/status
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials"
        });
    });
};

//Finds a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id; //Grabs the id from the URL path

    //Searches specifically for that matching id
    Tutorial.findById(id)
    .then(data => {
        if (!data)
            res.status(404).send({ message: "Not found Tutorial with id " + id }); //Sends error message/status if can't be found
        else res.send(data); //Return tutorial data if found
    })
    //If retrieval fails, return error message/status
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Tutorial with id=" + id });
    });
};

//Updates a Tutorial by the id in the request
exports.update = (req, res) => {
    //Returns an error message/status if req.body doesn't exist
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id; //Grabs the id from the URL path

    //Locates document by its id and applies new fields from req.body
    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({ //Sends error message/status if can't be found
                message: `Cannot update Tutorial with id=${id}. Tutorial was not found!`
            });
        } else res.send({ message: "Tutorial was updated successfully." }); //Return update message if found
    })
    //If update fails, return error message/status
    .catch(err => {
        res.status(500).send({
            message: "Error updating Tutorial with id=" + id });
    });
};

//Deletes a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id; //Grabs the id from the URL path
    
    //Locates document by its id and deletes it
    Tutorial.findByIdAndDelete(id)
    .then(data => {
        if (!data) {
            res.status(404).send({ //Sends error message/status if can't be found
                message: `Cannot delete Tutorial with id=${id}. Tutorial was not found!`
            });
        } else {
            res.send({ //Return deletion successful message if found
                message: "Tutorial was deleted successfully!"
            });
        }
    })
    //If delete fails, return error message/status
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Tutorial with id=" + id });
    });
};

//Deletes all Tutorials from the database
exports.deleteAll = (req, res) => {
    //Uses an empty filter to match all items--deletes all tutorial documents
    Tutorial.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Tutorials were deleted successfully!`
        }); //Return deletion successful message with count
    })
    //If delete fails, return error message/status
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all tutorials"
        });
    });
};

//Finds all published Tutorials
exports.findAllPublished = (req, res) => {
    //Locates all published Tutorial documents and returns them
    Tutorial.find({ published: true })
    .then(data => {
        res.send(data); //Returns list of published Tutorial documents
    })
    //If retrieval fails, return error message/status
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving published tutorials"
        });
    });
};