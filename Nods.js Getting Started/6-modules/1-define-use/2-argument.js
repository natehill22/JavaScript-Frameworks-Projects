//Logs an "array-like" arguements object containing all past parameters
function dynamicArgsFunction() {
  console.log(arguments);
}

dynamicArgsFunction(3, 7, 5, 4); //Should return {'0': 3, '1': 7, '2': 5, '3': 4}
