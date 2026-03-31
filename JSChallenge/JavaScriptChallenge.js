

const x = 7;
const y = 5;

const ANDresult = x & y;
console.log(ANDresult);

const ORresult = x | y;
console.log(ORresult);

const XORresult = x ^ y;
console.log(XORresult);


let beautifulDay = "The most beautiful day of the week.";
let s = beautifulDay.search(/week/i);
let m = beautifulDay.match(/week/i);
let r = beautifulDay.replace(/week/i, "month");
console.log(s, m, r);

function validateNum() {
    const errorMessage = document.getElementById("messageSpace");
    errorMessage.innerHTML = ''; //Setting empty space for error messages to show
    let inputVal = document.getElementById("entry").value; //Entered value
    try { //Contains code that might input validation checks (they might throw exceptions)
        //If any condition is met, custom error messages are thrown
        if (inputVal.trim() == "") throw "is empty"; //Empty input
        if (isNaN(inputVal)) throw "is not a number"; //Non-digit input
        inputVal = Number(inputVal); //Converts string into number type
        if (inputVal < 12) throw "is too low"; //Numbers below 12
        if (inputVal > 18) throw "is too high"; //Numbers above 18
    } catch (error) { //Catches thrown error, updates text, and displays on HTML
        errorMessage.innerHTML = "Input " + error;
    } finally { //Clears input field regardless
        document.getElementById("entry").value = "";
    }
}

function strictTest() {
    "use strict";
    let z;
    z = 27; //Needs to be defined to avoid errors
    console.log(z)
}
strictTest();


const stone = {
    color: "deep green",
    luster: "high",
    hardness: "soft",
    density: "high",
    name: "Malachite",
    colorname: function() {
      return this.color + " " + this.name;
    }
};
console.log(stone.colorname());

let hw = () => "Hello World!";
console.log(hw());

class Stone {
    constructor(name, color, luster, hardness, density) {
        this.name = name;
        this.color = color;
        this.luster = luster;
        this.hardness = hardness;
        this.density = density;
    }
}

const myStone = new Stone("Sugilite", "purple", "silky", "medium", "moderate");
console.log(myStone);

function BuggyCode() {
    let a = "5";
    let b = 5;
    let sum = a + b;
    //debugger; // Execution will pause here
    console.log("Sum:", sum); // Inspect variables before this line runs
}

BuggyCode();


const numList = [16, 3, 21, 29, 22, 56, 11];
let firstNum = numList.findIndex(conDefine);
function conDefine(value, index, array) {
    return value > 17;
}
console.log(firstNum);

let t = Number.isInteger(9);
let q = isFinite(10 / 1);
let u = isNaN("whoa");
let e = 2 ** 5;
console.log(e);

function JSvalidation() {
    let val = document.forms["testForm"]["test"].value;
    if (val == "") {
        alert("Please fill out all fields.");
        return false;
    }
}