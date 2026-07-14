function booksController(Book){
    async function post (req, res) { //Initializes handler for creating new data via HTTP post requests
        try {
            const book = new Book(req.body); //Creates a new record and maps incoming JSON against blueprint structure
            if (!req.body.title) { //If client tries to create a book without a title, the server stops and sends error message
                res.status(400);
                return res.send('Title is required');
            }
            await book.save(); //Saves data to the mongoDB instance
            res.status(201) //Returns status code
            return res.json(book); //Converts db object into JSON (for the browser)
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    async function get (req, res) { //Initializes handler for creating new data via HTTP post requests
        const query = {}; 
        if(req.query.genre) {
            query.genre = req.query.genre; //Checks URL for genre filter, if present, adds that value to query 
        }
        try {
            const books = await Book.find(query); //Looks in Book API db using await
            //Loops over each db record, changing them to JSON, and adding embedded hypermedia links leading to individual book "pages"
            const returnBooks = books.map((book) => {
                const newBook = book.toJSON();
                newBook.links = {};
                newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
                return newBook;
            });
            return res.json(returnBooks); //Renders the whole shebang
        } catch (err) {
            return res.status(500).send(err);
        }         
    }
    return { post, get }; //Packages post and get functions into object structure and makes them accessible
}

module.exports = booksController;