//Both of these are automatically run upon start of the shell
//Tells the shell to do show a warning message instead of dropping a database (accesses the contructor through the active db instance)
db.constructor.prototype.dropDatabase = function() {
    print("Don't do it man!");
};

//Tells the shell to do show a refusal message instead of shutting down the server (accesses the contructor through the active db instance)
db.constructor.prototype.shutdownServer = function() {
    print("Nope!");
};