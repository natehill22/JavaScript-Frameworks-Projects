const jwt = require("jsonwebtoken"); //Imports jwt library to verify and decode access tokens

//Exports middleware function that intercepts HTTP requests
module.exports = (req, res, next) => {
    try{
    //Extracts token by splitting the "Bearer" token string and taking the second part 
    const token = req.headers.authorization.split(" ")[1];
    //Decodes and validates token authenticity using server's secret key
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    //Attaches user's data payload to the request object (for later route use)
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
    } catch (error) {
        //Sends a 401 failure message if any error occurs
        res.status(401).json({ message: "You are not authenticated." });
    }
};