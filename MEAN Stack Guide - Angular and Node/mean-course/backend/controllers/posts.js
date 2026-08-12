const Post = require('../models/post'); //Imports mongoose Post model to execute db queries on posts

//Exports the controller function responsible for creating new a post
exports.createPost = async (req, res, next) => {
    try {
        //Constructs base server URL dyncamically (http://localhost:3000)
        const url = req.protocol + '://' + req.get("host");
        //Creates new Post document with fields mapped from the request data
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            imagePath: url + "/images/" + req.file.filename, //Combines base URL, images route, and filename into a full path string
            creator: req.userData.userId //Links post to the user id extracted by middleware
        });
        //Pauses execution to wait for Mongo to save new post document
        const result = await post.save();
        //Sends a 201 Created status along with JSON body response
        res.status(201).json({
            message: 'Post added successfully',
            post: {
                ...result.toObject(), //Spreads document's values into a JS object
                id: result._id, //Maps mongo's _id property to the "id" property
            }
        });
    } catch (error) {
        //Sends a 500 error and post failed message if there is an error posting
        res.status(500).json({
            message: "Creating a post failed."
        });
    }
};

//Exports the controller function responsible for editing an existing post
exports.updatePost = async (req, res, next) => {
    try {
        //Initializes a variable with the existing image URL path passed from the request
        let imagePath = req.body.imagePath;
        if (req.file) {
            //If a new image file was included in the request, update the tracking variable to point to the newly uploaded file route
            const url = req.protocol + '://' + req.get("host");
            imagePath = url + "/images/" + req.file.filename
        }
        //Prepares an updated data instance using the Mongoose Post model's structure
        const post = new Post ({
            _id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            imagePath: imagePath, //Assigns either the old image path or the new path
            creator: req.userData.userId //Attaches creator id (for security)
        });

        //Initiates a targeted query matching the route id AND verifying user ownership
        const result = await Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post);
        //Checks if mongo found a matching document that met ownership parameters
        if (result.matchedCount > 0) {
            //Sends a 200 OK status and update message
            res.status(200).json({ message: "Update successful!", post: { id: req.params.id, ...post } });
        } else {
            //Sends a 401 Unauthorized status and permissions failed message if record doesn't exist or user is not the owner
            res.status(401).json({ message: "Not authorized." });
        }
    } catch (error) {
        //Sends a 500 error and post failed message if there is an error updating post
        res.status(500).json({
            message: "Couldn't update post."
        });
    }
};

//Exports the controller function responsible for pulling existing posts
exports.getPosts = async (req, res, next) => {
    try {
        //Forces query parameter strings to convert into integers
        const pageSize = +req.query.pagesize;
        const currentPage = +req.query.page;
        //Initializes a Mongoose query object for finding posts without executing yet
        const postQuery = Post.find();
        //If client has both required pagination variables,
        if (pageSize && currentPage) {
            //Modifies query plan to skip a calculated amount of previous page items, and sets a cap for return items
            postQuery
                .skip(pageSize * (currentPage - 1))
                .limit(pageSize);
        }
        //Fires both the post selection list and document counter queries at the same time
        const [documents, count] = await Promise.all([
            postQuery, //Brings in the array of documents from the search
            Post.countDocuments()
        ]);

        res.status(200).json({
            //Sends a 200 OK status with a message, paginated array of post docs, and a max count
            message: "Posts fetched successfully!",
            posts: documents,
            maxPosts: count
        });
    } catch (error) {
        //Sends a 500 error and post failed message if there is an error fetching posts
        res.status(500).json({
            message: "Fetching posts failed."
        });
    }
};

//Exports the controller function responsible for pulling one existing post
exports.getPost = async (req, res, next) => {
    try {
        //Requests single record matching the exact id found in the URL
        const post = await Post.findById(req.params.id);
        if (post) {
            //If document returned, forward it to the client with a 200 OK status
            res.status(200).json(post);
        } else {
            //If document failed to return, send a 404 and failure message
            res.status(404).json({message: 'Post not found!'});
        }
    } catch (error) {
        //Sends a 500 error and post failed message if there is an error fetching post
        res.status(500).json({
            message: "Fetching post failed."
        });
    }
};

//Exports the controller function responsible for deleting an existing post
exports.deletePost = async (req, res, next) => {
    try {
        //Instructs mongoDB to drop a post checking both target id and owner id fields
        const result = await Post.deleteOne({ _id: req.params.id, creator: req.userData.userId });
        if (result.deletedCount > 0) {
            //If document was deleted, sends a 200 OK status and a confirmation message
            res.status(200).json({ message: "Deletion successful!" });
        } else {
            //If document was not deleted, blocks deletion with a 401 Unauthorized status and a message
            res.status(401).json({ message: "Not authorized." });
        }
    } catch (error) {
        //Sends a 500 error and post failed message if there is an error deleting post
        res.status(500).json({
            message: "Deleting posts failed."
        });
    }
};