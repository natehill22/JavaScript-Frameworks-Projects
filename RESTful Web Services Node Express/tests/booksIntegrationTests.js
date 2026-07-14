require('should'); //Imports should library for testing

const request = require('supertest'); //Imports supertest library for testing
const mongoose = require('mongoose'); //Imports mongoose package for object data modeling

process.env.ENV = 'Test'; //Sets a custom environment property to TEST (for testing)

const app = require('../app.js'); //Imports the app.js functionality (for supertest testing)

const Book = mongoose.model('Book'); //Imports the Book/bookModel model from the db
const agent = request.agent(app); //Helps testing by making a persistent HTTP testing client

describe('Book Crud Test', () => {
    it('should allow a book to be posted and return read and _id', (done) => {
        const bookPost = { title: 'My Book', author: 'Jon', genre: 'Fiction' }; //Creates the package we are going to send into the API

        agent.post('/api/books') //Send a post to this address
        .send(bookPost)
        .expect(200) 
        .end((err, results) => {
            //console.log(results);
            //results.body.read.should.not.equal(false);
            results.body.should.have.property('_id'); //Makes sure the body has an id property
            done(); //Lets supertest know that the test is over
        });
    });

    //After each test is done, it deletes everything
    afterEach(async () => {
        await Book.deleteMany({});
    });

    //Closes our mongoose connection (and app listener) after all tests are finished 
    after((done) => {
        mongoose.connection.close();
        app.server.close(done());
    });
});