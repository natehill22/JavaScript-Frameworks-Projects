//Creates and exports routes to be used for API functionality
module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller"); //Ties into the functions in the controller

    var router = require("express").Router();

    //Creates a new Tutorial
    router.post("/", tutorials.create);

    //Retrieves all Tutorials
    router.get("/", tutorials.findAll);

    //Retrieves all published Tutorials
    router.get("/published", tutorials.findAllPublished);

    //Retrieves single Tutorial with id
    router.get("/:id", tutorials.findOne);

    //Updates a Tutorial with id
    router.put("/:id", tutorials.update);

    //Deletes a Tutorial with id
    router.delete("/:id", tutorials.delete);

    //Deletes all Tutorials
    router.delete("/", tutorials.deleteAll);

    app.use('/api/tutorials', router);
};