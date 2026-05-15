import http from 'http'; //Allows for the creation of web-servers
import { upperCase } from 'upper-case'; //Imports the upper-case module

const server = http.createServer(); //Creates new instance of server class

//Binds server to port 5000 and prints confirmation message
server.listen(5000, () => {
    console.log(upperCase('Server is running...')); //Prints message in uppercase
});

