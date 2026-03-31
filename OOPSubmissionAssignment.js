//Defines the Dog class
class Dog {
    //Constructor method is automatically called when a new object is created
    constructor(breed, color, height, weight) {
        this.breed = breed; //Initializes properties
        this.color = color;
        this.height = height;
        this.weight = weight;
    }

    //Defines class methods for shake, sit, and lay down
    shake() {
        console.log(`The ${this.color} ${this.breed} is ${this.height} tall, ${this.weight}, and can shake hands.`);
    }
    sit() {
        console.log(`The ${this.color} ${this.breed} is ${this.height} tall, ${this.weight}, and can sit down.`);
    }
    layDown() {
        console.log(`The ${this.color} ${this.breed} is ${this.height} tall, ${this.weight}, and can lay down on command.`);
    }
}

//Creates new objects (instances) of the "Dog" class
const dog1 = new Dog("Hound", "Brown", "2 feet", "60 pounds");
const dog2 = new Dog("Chihuahua", "Light Tan", "6 inches", "7 pounds");
const dog3 = new Dog("Dachshund", "Brown", "9 inches", "20 pounds");

//Calling the object methods for the first object
dog1.shake();
dog1.sit();
dog1.layDown();
