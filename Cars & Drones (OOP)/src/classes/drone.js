import {Vehicle} from './vehicle.js';

//Defines Vehicle-inherited Drone class
export class Drone extends Vehicle {
    constructor(license, model, latLong) {
        super(license, model, latLong) //Calls the constructors of the Vehicle class
        this.airTimeHours = null; //Drone-instance-specific intialization steps
        this.base = null;
    }
}