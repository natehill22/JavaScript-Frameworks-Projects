var userCount = function() {
    var count = db.Users.countDocuments(); //Loads # of users in user collection onto the count variable

    var entry = {_id: Date(), n: count}; //Loads the current date and count onto the entry variable within an object

    db.UserCountHistory.insertOne(entry); //Saves data into UserCountHistory

    print("\nToday's User Count: " + entry.n); //Prints out current user count
};

userCount(); //Runs function