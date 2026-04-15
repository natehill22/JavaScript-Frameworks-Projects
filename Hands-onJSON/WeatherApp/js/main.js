/*jslint browser:true */
'use strict';

var weatherConditions = new XMLHttpRequest(); //Creates a new empty XHR object (instance of XMLHttpRequest)
var weatherForecast = new XMLHttpRequest(); //Creates a new empty XHR object (instance of XMLHttpRequest)
var cObj; //Conditions object
var fObj; //Forecast object

// GET THE CONDITIONS
weatherConditions.open('GET', '//api.openweathermap.org/data/2.5/weather?zip=84653,us&appid=[ENTER OPEN WEATHER API KEY HERE]&units=imperial', true); //Initialize a GET request to fetch the file
weatherConditions.responseType = 'text'; //Sets expected response format to string (text)
weatherConditions.send(null); //Sends the request to the server that requires no body content

weatherConditions.onload = function() { //Waits for the page to fully load before executing this function
    if (weatherConditions.status === 200){ //If status is successful, turn data into a JS object and drop it into cObj variable
        cObj = JSON.parse(weatherConditions.responseText); 
        //Ties data like name or description to showing within pre-exiting HTML elements
        document.getElementById('location').innerHTML = cObj.name;
        document.getElementById('weather').innerHTML = cObj.weather[0].description;
        document.getElementById('weather').innerHTML = cObj.weather[0].description;
        document.getElementById('temperature').innerHTML = cObj.main.temp;
        document.getElementById('desc').innerHTML = "Wind Speed " + cObj.wind.speed;
    } //end if
}; //end function


// GET THE FORECARST
weatherForecast.open('GET', '//api.openweathermap.org/data/2.5/forecast?zip=84653,us&appid=[ENTER OPEN WEATHER API KEY HERE]&units=imperial', true); //Initialize a GET request to fetch the file
weatherForecast.responseType = 'text'; //Sets expected response format to string (text)
weatherForecast.send();//Sends the request to the server

weatherForecast.onload = function() { //Waits for the page to fully load before executing this function
if (weatherForecast.status === 200){ //If status is successful, turn data into a JS object and drop it into fObj variable
	fObj = JSON.parse(weatherForecast.responseText);
    
    var date_raw = fObj.list[0].dt_txt; //Sets the date_raw variable to pull the datetime for tomorrows date
    date_raw = date_raw.substring(5,11); //Cuts off the beginning (year) and end (time) of the datetime value and passes that to the date_raw variable
    document.getElementById('r1c1').innerHTML = date_raw; //Ties date to show within pre-exiting HTML element

    var iconcode = fObj.list[0].weather[0].icon; //Sets the iconcode variable to pull the icon code for tomorrow's weather
    var icon_path = "//openweathermap.org/img/w/" + iconcode + ".png"; //Sets icon_path to the website's path for icon images using tomorrow's value
    document.getElementById('r1c2').src = icon_path; //Sets icon, min temp, and max temp
    document.getElementById('r1c3').innerHTML = fObj.list[0].main.temp_min + "&deg";
    document.getElementById('r1c4').innerHTML = fObj.list[0].main.temp_max + "&deg";

    //Does the same for the day after tomorrow
    var date_raw = fObj.list[8].dt_txt;
    date_raw = date_raw.substring(5,11);
    document.getElementById('r2c1').innerHTML = date_raw;

    var iconcode = fObj.list[8].weather[0].icon;
    var icon_path = "//openweathermap.org/img/w/" + iconcode + ".png";
    document.getElementById('r2c2').src = icon_path;
    document.getElementById('r2c3').innerHTML = fObj.list[8].main.temp_min + "&deg";
    document.getElementById('r2c4').innerHTML = fObj.list[8].main.temp_max + "&deg";

    //Does the same for the day after that
    var date_raw = fObj.list[16].dt_txt;
    date_raw = date_raw.substring(5,11);
    document.getElementById('r3c1').innerHTML = date_raw;

    var iconcode = fObj.list[16].weather[0].icon;
    var icon_path = "//openweathermap.org/img/w/" + iconcode + ".png";
    document.getElementById('r3c2').src = icon_path;
    document.getElementById('r3c3').innerHTML = fObj.list[16].main.temp_min + "&deg";
    document.getElementById('r3c4').innerHTML = fObj.list[16].main.temp_max + "&deg";
} //end if
}; //end function


