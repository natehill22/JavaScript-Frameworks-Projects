const multer = require("multer"); //Imports multer middleware to handle multipart/form data (file-uploads)

//Defines object dictionary to map allowed MIME types to file extensions
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
};

//Configures Multer's disk storage setting for paths and filenames
const storage = multer.diskStorage({
    //Defines callback function to determine uploaded files' target folder
    destination: (req, file, cb) => {
        //Checks if incoming file's mimetype matches the allowed dictionary
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        //Creates a new error and sets it to null if it matches the allowed dictionary
        if (isValid) {
            error = null;
        }
        //Passes the error status and target folder string to Multer callback
        cb(error, "backend/images");
    },
    //Defines callback function to rename files uniquely upon disk save
    filename: (req, file, cb) => {
        //Converts original filename to lowercase and replace all spaces with dashes
        const name = file.originalname.toLowerCase().split(' ').join('-');
        //Pulls the extention string using the incoming file's mimetype
        const ext = MIME_TYPE_MAP[file.mimetype];
        //Re-forms file name to be new name, current date/time, and the mimetype extension
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

//Initializes multer with our storage configuration, retricts uploads to a single image file, and exports it
module.exports = multer({storage: storage}).single("image")