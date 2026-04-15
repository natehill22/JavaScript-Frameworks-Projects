// JavaScript Document

var xhr = new XMLHttpRequest(); 

xhr.open('GET', 'data.json', true);
xhr.responseType = 'text';

xhr.onload = function() {
    if (xhr.status === 200) {
        var myStuff = JSON.parse(xhr.responseText);
        console.log(myStuff);

        for (i=0; i < myStuff.presidents.length; i++) {
            console.log(myStuff.presidents[i].first);
            console.log(myStuff.presidents[i].last);
            console.log(myStuff.presidents[i].served);

            console.log(myStuff.vicepresidents[i].first);
            console.log(myStuff.vicepresidents[i].last);
        }

        var myString = "";
        for (i=0; i < myStuff.presidents.length; i++) {
            var x = i+1;
            myString += "<br>President "+ x +" was ";
            myString += myStuff.presidents[i].first + " ";
            myString += myStuff.presidents[i].last + ". ";

            myString += "He served from " + myStuff.presidents[i].served + " with ";
            myString += myStuff.vicepresidents[i].first + " ";
            myString += myStuff.vicepresidents[i].last + ". ";
        }

        document.getElementById('message').innerHTML = myString;
    }
}

xhr.send();

//var theData2 = '{"Jane":{"age":"29", "degree":{"AAS":"VMI", "BA":"UVA"}}, "Jim":{"age":"49", "degree":"MA"}}';

//var myObj = JSON.parse(theData2);
//console.log(myObj);

//document.getElementById('message').innerHTML = myObj.Jane.degree.BA;

