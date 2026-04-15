// JavaScript Document
var hotelInfo;
var details;
var xhr = new XMLHttpRequest(); //Creates a new empty XHR object (instance of XMLHttpRequest)
xhr.open('GET', "data.json", true); //Initialize a GET request to fetch the file
xhr.responseType = 'text'; //Sets expected response format to string (text)
xhr.send(); //Sends the request to the server


xhr.onload = function() { //Waits for the page to fully load before executing this function
    if(xhr.status === 200) { //If status is successful, turn data into a JS object and drop it into hotelInfo variable
        hotelInfo = JSON.parse(xhr.responseText); 
        display(0); //Shows first page by default
    } // end if
} // end function

function display(x) { //Displays pages updated with AJAX-specific data to update elements
    document.getElementById('roomName').innerHTML = hotelInfo[x].name;
    document.getElementById('desc').innerHTML = hotelInfo[x].description;
    document.getElementById('photo').src = hotelInfo[x].photo;
    document.getElementById('weekday').innerHTML = hotelInfo[x].cost.weekday;
    document.getElementById('weekend').innerHTML = hotelInfo[x].cost.weekend;

    details = ""; //Creates a new empty details list and then fills it with each detail surrounded by p tags
    for (i=0; i<hotelInfo[x].details.length; i++) {
        details += "<p>" + hotelInfo[x].details[i] + "</p>";
    }
    document.getElementById('details').innerHTML = details;
}