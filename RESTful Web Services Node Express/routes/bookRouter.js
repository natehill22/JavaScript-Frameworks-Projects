/* eslint-disable no-param-reassign */
const express = require('express'); //Imports express framework
const booksController = require('../controllers/booksController'); //Imports booksController function

function routes(Book) {
    const bookRouter = express.Router(); //Gives us back our route
    const controller = booksController(Book); //Returns a usable controller for the Book model
    bookRouter.route('/books') //Shows all books in the db
    .post(controller.post) //Posts a new item back to our API
    .get(controller.get); //Gets a list of items
    //Middleware to be used only in the route that has bookId
    bookRouter.use('/books/:bookId', async (req, res, next) => {
        try {
        const book = await Book.findById(req.params.bookId); //Looks for bookId in Book API db using await
        if(book){ //If matching id is found, book document is attached to the request as req.book
            req.book = book;
            return next();
        } 
        return res.sendStatus(404); //Returns 'Not Found' if book is null
        } catch (err) {
            return res.status(500).send(err); //Returns 500 with specific error code messaging
        }      
    })
    //Gives a route for a singular book by pulling the bookId out of the url
    bookRouter.route('/books/:bookId') //Initializes a route chain
    .get(async (req, res) => {
        const returnBook = req.book.toJSON(); //Copies the db object into a JS object
        returnBook.links = {};
        const encodedGenre = encodeURIComponent(req.book.genre); //Prevents spaces or special characters into URL-safe strings
        returnBook.links.FilterByThisGenre = `http://${req.headers.host}/api/books/?genre=${encodedGenre}`; //Constructs a URL search link for all books sharing a genre
        return res.json(returnBook); //Converts this link into JSON
    })
    //Used for replacing updates
    .put(async (req, res) => {
        const { book } = req; //Pulls book out of the req using JS object destructuring
        book.title = req.body.title; //Sets properties to the req.body's value
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.read = req.body.read;
        try {
        await book.save(); //Saves to the db
        return res.json(book); //Prints the new server object into JSON
        } catch (err) {
            res.status(500).send(err);
        } 

    }) 
    //Used for partial updates
    .patch(async (req, res) => {
        const { book } = req; //Pulls book out of the req using JS object destructuring
        if (req.body._id) { //Deletes _id if it exists to avoid database crashes (as the docs unique id should be sent)
            delete req.body._id;
        }
        //Loops through all data and converts them into array of arrays
        Object.entries(req.body).forEach(([key, value]) => {
            book[key] = value; //Sets the value as the returned properties (instead of book.read)
        });
        try {
        await book.save(); //Saves to the db
        return res.json(book); //Prints the new server object into JSON
        } catch (err) {
            res.status(500).send(err);
        } 
    })
    //Deletes a db record
    .delete(async (req, res) => {
        try {
        await req.book.deleteOne(); //Pauses Express handler until mongo confirms record is gone
        return res.sendStatus(204); //Sends a No Content (204) header back to the client
        } catch (err) {
            return res.status(500).send(err); //Sends a 500 error and passes the exact error message back
        } 
    });
    
    return bookRouter;
}

module.exports = routes;

