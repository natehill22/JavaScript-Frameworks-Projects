import {Vehicle} from './vehicle.js';

//Defines Vehicle-inherited Car class
export class Car extends Vehicle {
    constructor(license, model, latLong) {
        super(license, model, latLong) //Calls the constructors of the Vehicle class
        this.miles = null; //Car-instance-specific intialization steps
        this.make = null;
    }
}