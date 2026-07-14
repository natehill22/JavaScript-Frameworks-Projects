const should = require('should'); //Imports should library for testing
const sinon = require('sinon'); //Imports sinon library for testing
const booksController = require('../controllers/booksController'); //Imports the bookController function

//Test to determine if data has an empty title
describe('Book Controller Tests:', () => {
    describe('Post', () => {
        it('should not allow an empty title on post', () => {
            const Book = function (book) { this.save = () => {}};

            //Testing data
            const req = {
                body: {
                    author: 'Jon'
                }
            };

            //Creates a spy function using the sinon framework that keeps track of what's called (how many times, etc.)
            const res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            };

            const controller = booksController(Book); //Creates an instance of bookController and calls it to test upon
            controller.post(req, res);

            res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0] [0]}`); //Configures the test and gives message if 400
            res.send.calledWith('Title is required').should.equal(true); //Configures the test and gives message 
        });
    });
});