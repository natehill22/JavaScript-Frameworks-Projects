//Defines the Shape superclass
class Shape {
    //Constructor method is automatically called when a new object is created
    constructor(color) {
        this.color = color; //Initializes property
    }

    //Defines class methods for getArea
    getArea() {
        console.log("You can get a shape's area by doing math.");
    }
}

//Defines the subclasses (child classes)
class Rectangle extends Shape {
    constructor(color, height, width) {
        super(color); //Calls superclass to initialize inherited color property [must directly follow the subclass constructor]
        this.height = height; //Subclass-specific properties
        this.width = width;
    }
    getArea() {
        return this.height * this.width
    }
}

class Triangle extends Shape {
    constructor(color, base, height) {
        super(color); //Calls superclass to initialize inherited color property
        this.base = base; //Subclass-specific properties
        this.height = height;
    }
    getArea() {
        return ((this.base * this.height) / 2)
    }
}

class Circle extends Shape {
    constructor(color, radius) {
        super(color); //Calls superclass to initialize inherited color property
        this.radius = radius; //Subclass-specific property
    }
    getArea() {
        return ((this.radius ** 2) * 3.14)
    }
}

//Creating instances of the child and parent classes
const x = new Rectangle('rectangle (Teal)', 5, 6);
const y = new Triangle('triangle (Orange)', 3, 6);
const z = new Circle('circle (Magenta)', 6);
const a = new Shape('shape (Seafoam)');

shapeList = [x, y, z, a]; //Turning all instances into a list for easy looping
for (const i of shapeList) { //Cycle through instances to display all information
    console.log(i.color); //Calling inherited property
    console.log(i.getArea()); //Calling object methods (both overridden and fully inherited)
}