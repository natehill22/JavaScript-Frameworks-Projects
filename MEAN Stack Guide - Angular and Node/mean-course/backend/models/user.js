const mongoose = require('mongoose'); //Imports Mongoose to interact with the Mongo database
const { default: uniqueValidator } = require('mongoose-unique-validator'); //Imports plugin to add pre-save validation for unique fields in schema

//Creates new db structure config for User documents
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//Attaches unique validator plugin to the schema to turn database errors into readable validation errors
userSchema.plugin(uniqueValidator);

//Compiles schema into a mongoose model ('User') and exports it
module.exports = mongoose.model('User', userSchema);