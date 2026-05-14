//Demonstrates dynamic property syntax within object literals
const mystery = "answer"

const PI = Math.PI;

const obj = {
  p1: 10,
  p2: 20,
  f1() {},
  f2: () => {},
  [mystery]: 42,
  PI,
};

//mystery would equal undefined after running as it should've been replaced by "answer: 42,"