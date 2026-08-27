const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./Todo');

const app = express();
app.use(express.json());
app.use(cors());

//Connect to local MongoDB instance
mongoose.connect('mongodb://localhost:20017/todo-db')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

//Get all todos
app.get('/api/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

//Create a new todo
app.post('/api/todos', async (req, res) => {
    const newTodo = new Todo({ title: req.body.title });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
});

//Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

app.listen(5000, () => console.log('Server running on port 5000'));