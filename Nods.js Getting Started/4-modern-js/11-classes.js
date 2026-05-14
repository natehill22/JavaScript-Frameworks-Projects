class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hello ${this.name}!`);
  }
}

//Student is inheriting Person - name
class Student extends Person {
  constructor(name, level) {
    super(name);
    this.level = level;
  }
  greet() {
    console.log(`Hello ${this.name} from ${this.level}`);
  }
}

const o1 = new Person("Max");
const o2 = new Student("Tina", "1st Grade");
const o3 = new Student("Mary", "2nd Grade");

o3.greet = () => console.log('I am special!');

o1.greet(); //Returns the Person greeting with Max as the value
o2.greet(); //Returns the Student greeting with Tina and 1st Grade as the value
o3.greet(); //Returns the "I am special"greeting defined after all of it
