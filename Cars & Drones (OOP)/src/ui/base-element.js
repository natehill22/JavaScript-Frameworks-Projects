import $ from 'jquery';

export class BaseElement {

    constructor() { //Initializes an instance property (intended to store jQuery object representing HTML element once it's created) to null
        this.element = null; //jQuery object
    }

    appendToElement(el) { //Creates an element then appends it as a child to jQuery object 'el'
        this.createElement();
        el.append(this.element);
        this.enableJS();
    }

    createElement() { //Gets HTML string and converts it into a jQuery object storing it in this.element
        let s = this.getElementString();
        this.element = $(s);
    }

    getElementString() { //Placeholder that throws an error if not overridden by a class that inherits from BaseElement
        throw 'Please override getElementString() in BaseElement';
    }

    enableJS() { //Enables MDL behavior on a dynamically-added DOM element
        componentHandler.upgradeElement(this.element[0]);
    }
}