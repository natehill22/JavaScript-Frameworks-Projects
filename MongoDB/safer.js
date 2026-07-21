//Tells the shell to do show a warning message instead of dropping a database (accesses the contructor through the active db instance)
db.constructor.prototype.dropDatabase = function() {
    print("Don't do it man!");
};