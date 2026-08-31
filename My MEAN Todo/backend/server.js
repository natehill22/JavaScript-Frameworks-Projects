const express = require('express'); //Imports express to help build REST APIs
const mongoose = require('mongoose'); //Imports mongoose to connect backend to the database
const cors = require('cors'); //Imports cors to help express enable CORS (with various options)
const Todo = require('./Todo'); //Imports models and database configuration

const app = express(); //Creates express app
//Adds cors middlewares and json parser to the express app
app.use(cors({
    origin: 'http://localhost:4200', //Allows server to send backend data requests
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //Restrics API actions to these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], //Limits security access to only allow request with these headers
    optionsSuccessStatus: 200 //Requires a successful status code for security 
}));
app.use(express.json());
app.options('{*default}', cors()); //Acts as a safety net for verification queries hitting any system route

//Connect to local MongoDB instance and logs status
mongoose.connect('mongodb://localhost:27017/todo-db')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

//Gets all todos
app.get('/api/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos); //Returns array in JSON syntax
});

//Creates a new todo
app.post('/api/todos', async (req, res) => {
    const newTodo = new Todo({ 
        title: req.body.title, //Extracts task name out of the input
        isCompleted: req.body.isCompleted || false //Extracts the completed status out of the input. Sets to false if param is missing
    });
    const savedTodo = await newTodo.save(); //Saves to the mongo database
    res.json(savedTodo); //Returns array in JSON syntax
});

//Deletes a todo
app.delete('/api/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id); //Finds and deletes the document with the matching id 
    res.json({ success: true }); //Sends a JSON indication of successful deletion
});

//Edits a todo
app.put('/api/todos/:id', async (req, res) => {
    try{
        //Fetches the exact document from the database (or error if not present)
        const item = await Todo.findById(req.params.id);
        if (!item) return res.status(404).json({ error: "Todo item not found" });

        //Assigns update completed status from UI
        item.isCompleted = req.body.isCompleted;
        
        //Saves update task to database (which enforces Mongoose schema)
        const savedItem = await item.save();

        res.json(savedItem); //Returns object in JSON syntax
    } catch (err) {
        res.status(500).json({ error: err.message }); //Shows error message if problem occurs
    }
});
 
//Listens for communcations on part 5000 and logs confirmation when ready
app.listen(5000, () => console.log('Server running on port 5000'));