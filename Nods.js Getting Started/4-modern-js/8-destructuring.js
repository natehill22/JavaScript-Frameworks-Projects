// const PI = Math.PI;
// const E = Math.E;
// const SQRT2 = Math.SQRT2;

const { PI, E, SQRT2 }  = Math; //Destructures the 3 properties through the Math scope

// With require
// const { readFile } = require('fs');


const circle = {
  label: 'circleX',
  radius: 2,
};

//If the argument is an object, you can destructure just the properties you are interested in and make them local to that function
const circleArea = ({ radius }, { precision = 2 } = {}) => //Precision = 2 is a default value, = {} makes default argument optional
  (PI * radius * radius).toFixed(precision);

console.log(
  circleArea(circle) //Will use default precision
);

console.log(
  circleArea(circle, { precision: 5 }) //Will use specified precision
);

const [first, second,, forth] = [10, 20, 30, 40]; //All items except the third will be tied to the values