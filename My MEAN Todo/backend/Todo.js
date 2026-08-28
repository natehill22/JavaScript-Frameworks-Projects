const mongoose = require("mongoose");

//Defines the database model for the Todo item to be saved
const TodoSchema = new mongoose.Schema({
    title: {type: String, required: true },
    isCompleted: {type: Boolean, default: false },
    createdAt: {type: Date, default: Date.now }
});

module.exports = mongoose.model("Todo", TodoSchema);