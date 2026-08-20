const db = require("../models"); //Pulls in the db object from index.js
const mongoose = require("mongoose"); //Imports mongoose to help with database functionality
const Tutorial = db.tutorials; //Sets all db model/functionality to the Tutorial variable so it can be used to query MongoDB

//Creates and Saves a new Tutorial
exports.create = async (req, res, next) => {
    try {
        const { title, description, published } = req.body; //Creates three variables filled with req.body data

        //Returns an error message/status and stops execution if req.body.title doesn't exist
        if (!title) { 
            return res.status(400).send({ message: "Title can not be empty!" });
        }

        //Creates a schema-matching Tutorial object from the entered data 
        const tutorial = new Tutorial({
            title,
            description,
            published: published === true ?? false //If published is empty, defaults to false
        });

        //Saves Tutorial in the database 
        const data = await tutorial.save(); //Pushes new document to the database 
        res.status(201).send(data); //Returns the newly created tutorial object with status
    } catch (err) { 
        next(err); //If creation fails, return error message
    }
};

//Retrieves all Tutorials from the database
exports.findAll = async (req, res, next) => {
    try {
    //Pulls query string out of the url to be used as a condition for the findAll method
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {}; //MongoDB regex query with case-insensitivity, if no title an empty object is used to match everything

    //Queries the database
    const data = await Tutorial.find(condition);
    res.send(data); //Returns the list of tutorials found 
    } catch (err) {
        next(err); //If creation fails, return error message
    }
};

//Finds a single Tutorial with an id
exports.findOne = async (req, res, next) => {
    try {
        const id = req.params.id; //Grabs the id from the URL path

        //Validates if ID format is acceptable by mongoDB
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid ID format" });
        }
        //Searches specifically for that matching id
        const data = await Tutorial.findById(id);
        if (!data) {
            return res.status(404).send({ message: `Tutorial not found with id ${id}` }); //Sends error message/status if can't be found
        }
        res.send(data); //Return tutorial data if found
    } catch (err) {
        next(err); //If creation fails, return error message
    }
};

//Updates a Tutorial by the id in the request
exports.update = async (req, res, next) => {
    try {
        const id = req.params.id; //Grabs the id from the URL path

        //Returns an error message/status if not valid for mongo
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid ID format provided" });
        }

        const { title, description, published } = req.body; //Creates three variables filled with req.body data
        const updateData = {};
        //Adds fields to updateData object only if they exist
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (published !== undefined) updateData.published = published;

        //Locates document by its id and applies new fields from updateData
        const data = await Tutorial.findByIdAndUpdate(id, updateData, { 
            new: true,
            runValidators: true //Validates data againt mongo's schema
        });

        if (!data) {
            //Sends error message/status if can't be found
            return res.status(404).send({ message: `Cannot update Tutorial with id=${id}. Tutorial was not found!` });
        } 

        res.send({ message: "Tutorial was updated successfully.", data }); //Return update message if found
    } catch (err) {
        next(err); //If creation fails, return error message
    }
};

//Deletes a Tutorial with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id; //Grabs the id from the URL path
    
        //Returns an error message/status if not valid for mongo
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid ID format provided" });
        }

        //Locates document by its id and deletes it
        const data = await Tutorial.findByIdAndDelete(id);
        if (!data) {
            //Sends error message/status if can't be found
            return res.status(404).send({ message: `Cannot delete Tutorial with id=${id}. Tutorial was not found!` });
        } 
        
        res.send({ message: "Tutorial was deleted successfully!" }); //Return deletion successful message if found
    } catch (err) {
        next(err); //If creation fails, return error message
    }
};

//Deletes all Tutorials from the database
exports.deleteAll = async (req, res, next) => {
    try {
        //Uses an empty filter to match all items--deletes all tutorial documents
        const data = await Tutorial.deleteMany({});
        res.send({ message: `${data.deletedCount} Tutorials were deleted successfully!` }); //Return deletion successful message with count
    } catch (err) {
        next(err); //If creation fails, return error message
    }
};

//Finds all published Tutorials
exports.findAllPublished = async (req, res, next) => {
    try {
        //Locates all published Tutorial documents and returns them
        const data = await Tutorial.find({ published: true });
        res.send(data); //Returns list of published Tutorial documents
    } catch (err) {
        next(err); //If creation fails, return error message
    }
};