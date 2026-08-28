const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./Todo');

const app = express();
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}));
app.use(express.json());
app.options('{*default}', cors());

//Connect to local MongoDB instance
mongoose.connect('mongodb://localhost:27017/todo-db')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

//Get all todos
app.get('/api/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

//Create a new todo
app.post('/api/todos', async (req, res) => {
    const newTodo = new Todo({ 
        title: req.body.title,
        isCompleted: req.body.isCompleted || false 
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
});

//Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

app.get('/', (req, res) => {
    res.json({ message: "Todo API backend is running" });
});

app.put('/api/todos/:id', async (req, res) => {
    try{
        //Fetch the exact document from the database first
        const item = await Todo.findById(req.params.id);
        if (!item) return res.status(404).json({ error: "Todo item not found" });

        //Explicitly flip the value based on what the frontend sent
        item.isCompleted = req.body.isCompleted;
        
        //Save it back to trigger Mongoose schema validation cleanly
        const savedItem = await item.save();

        //Return the freshly updated database object
        res.json(savedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));