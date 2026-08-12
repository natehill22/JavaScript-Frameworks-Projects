const mongoose = require('mongoose'); //Imports Mongoose to interact with the Mongo database

//Creates new db structure config for Post documents
const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imagePath: { type: String, require: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

//Compiles schema into a mongoose model ('Post') and exports it
module.exports = mongoose.model('Post', postSchema);