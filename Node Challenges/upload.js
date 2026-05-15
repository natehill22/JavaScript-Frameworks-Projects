var http = require('http'); //Imports the http module which helps create web-servers
var formidable = require('formidable'); //Imports the formidable module which helps parse form data and handles file uploads
var fs = require('fs'); //Imports the fs module to help with files

//Creates a local http server instance
http.createServer(function (req, res) { //Callback executed on every http request
    if (req.url == '/fileupload') { //Execute only when user submits data to fileupload enpoint matching the attribute
        var form = new formidable.IncomingForm(); //Separates uploaded files from the rest of the request
        form.parse(req, function (err, fields, files) { //Extracts and organizes upload data
            var oldpath = files.filetoupload[0].filepath;
            var newpath = 'C:\\Users\\nateh\\OneDrive\\Desktop\\Resource Folder\\' + files.filetoupload[0].originalFilename;
            fs.rename(oldpath, newpath, function (err) { //Replaces the old file path with the new one to move it upon upload to a selected folder
                if (err) throw err;
                res.write('File uploaded and moved!'); //Writes success message to page
                res.end(); //Closes connection
            }) 
        });
    } else { 
      res.writeHead(200, {'Content-Type': 'text/html'}); //Sends 200 status code (success) and tells the browser to render as a webpage
      res.write('<form action="fileupload" method="post" enctype="multipart/form-data">'); //Creates form and sends form data to the /fileupload path
      res.write('<input type="file" name="filetoupload"><br>'); //Creates UI element to select local file
      res.write('<input type="submit">'); //Creates submission button
      res.write('</form>'); //Closes HTML form structure
      return res.end(); //Completes the transaction
    }
}).listen(8080); //Binds created server instance to port 8080

