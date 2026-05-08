//function (exports, module, require, __filename, __dirname) {

console.log(arguments);

exports.a = 42;
module.exports.b = 37;

//exports = () => {}; //not okay (because you're not really redefining module.exports...you're just adjusting the assignment reference)
//changing module.exports to a function, on the other hand, is totally fine

//}

//Exports wrapper arguement (or module.exports) defines the API of the module
//Require wrapper arguement requires other modules inside this one
//__filename wrapper arguement containes the path of the file
//__dirname wrapper arguement containes the path to the folder holding the file

//All are not global objects, they are just arguements to the wrapping function


//Hidden wrapping function also internally returns the module.exports property (return module.exports)