//Demonstrates rest, spread, and ...operators/syntax 
const [first, ...restOfItems] = [10, 20, 30, 40]; //restOfItems now represents all items after the first comma

const data = {
  temp1: '001',
  temp2: '002',
  firstName: 'John',
  lastName: 'Doe',
  address: {
    city: 'Tucson',
    state: 'Arizona'
  }
};

//JS object destructuring: ...person collects unspecified properties into a new object
const { temp1, temp2, ...person } = data;

//Makes a new array using ...restOfItems
const newArray = [...restOfItems];

//Makes a new object (shallow copy) populating with ...person
const newObject = {
  ...person,
};

const trimmedData = { ...person };