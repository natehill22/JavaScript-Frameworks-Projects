const mongoose = require('mongoose'); //Imports mongoose package

const { Schema } = mongoose; //Pulls the Schema constructor out of the mongoose object

//Creates new db blueprint called bookModel, which it uses to guide data consistency
const bookModel = new Schema( 
  {
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: false },
  }
);

module.exports = mongoose.model('Book', bookModel); //Turns the blueprint layout into an exported model to be used by other files