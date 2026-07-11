const express = require('express'); //Imports express framework

function routes() {
    const bookRouter = express.Router(); //Gives us back our route
    //Shows all books in the db
    bookRouter.route('/books')
    .post(async (req, res) => {
        const book = new Book(req.body);
        book.save();
        return res.status(201).json(book);
    })
    .get(async (req, res) => {
        const query = {}; //Sets filtering to function based on genre (by pulling from the url)
        if(req.query.genre){
        query.genre = req.query.genre;
        }
        try {
        const books = await Book.find(query); //Looks in Book API db using await
        return res.json(books);
        } catch (err) {
            res.status(500).send(err);
        }         
    });
    //Gives a route for a singular book by pulling the bookId out of the url
    bookRouter.route('/books/:bookId')
    .get(async (req, res) => {
        try {
        const book = await Book.findById(req.params.bookId); //Looks in Book API db using await
        return res.json(book);
        } catch (err) {
            res.status(500).send(err);
        }         
    });

    return bookRouter;
}

module.exports = routes;

