const bcrypt = require('bcrypt'); //Imports bcrypt library to securely hash and compare user passwords
const jwt = require("jsonwebtoken"); //Imports jwt library to verify and decode access tokens

const User = require('../models/user'); //Imports mongoose User model to execute db queries on user accounts

//Exports the controller function responsible for handling user registration
exports.createUser = async (req, res, next) => {
        try {
            //Hashes the plaintext password from the request body using 10 salt rounds
            const hash = await bcrypt.hash(req.body.password, 10);
            //If successful, creates a new instance of the User model with the email and hashed pw
            const newUser = new User({
                email: req.body.email,
                password: hash
            });
            //Saves new User document into Mongo storage
            const result = await newUser.save();
            
                //If saved successfully, sends a 201 status and a JSON message/response
                res.status(201).json({
                    message: 'User created!',
                    result: result
                });
        } catch (err) {
            //If save failes, sends a 500 error and message
            res.status(500).json({
                message: "Invalid authentication credentials."
            });
        }    
}

//Exports the controller function responsible for handling user login auth
exports.userLogin = async (req, res, next) => {
    try {
        //Queries the db to find user matching submitted email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            //Sends 401, fail message, and cancels execution if user cannot be found
            return res.status(401).json({ message: "Auth failed" });
        }
        
        //Compares submitted pw against stored db hash
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    
        if (!isPasswordValid) {
            //Sends a 401 error and stops execution if comparison fails
            return res.status(401).json({ message: "Auth failed" });
        }
        //Signs a new webtoken containing an email and id that expires in 1 hour
        const token = jwt.sign({email: user.email, userId: user._id}, process.env.JWT_KEY, { expiresIn: "1h" });
        //Sends a 200 OK status containing the token, expiration tracking, and user ID
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: user._id
        });
    } catch (err) { //Catches runtime or connection errors during login
            //Sends a 401 error if server hasn't already closed the connectin with a response
            return res.status(401).json({
                message: "Invalid authentication credentials."
            });
    }
}