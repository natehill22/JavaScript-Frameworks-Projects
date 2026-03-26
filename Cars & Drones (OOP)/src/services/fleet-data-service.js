import {Car} from '../classes/car.js';
import {Drone} from '../classes/drone.js';
import {DataError} from './data-error.js';


export class FleetDataService { //Allows the class to be imported and re-used

    //Initializes components and sets an empty array for cars, drones, errors, and vehicles
    constructor(){
        this.cars = [];
        this.drones = [];
        this.errors = [];
        this.vehicles = [];
    }

    //Searches through the this.cars array and returns the first car object with a matching license plate
    getCarByLicense(license) {
        return this.cars.find(function(car) {
            return car.license === license;
        })
    }

    //Returns a list of all car objects in the this.cars array sorted into alphabetical order
    getCarsSortedByLicense() {
        return this.cars.sort(function(car1, car2) {
            if (car1.license < car2.license)
                return -1;
            if (car1.license > car2.license)
                return 1;
            return 0;
        });
    }

    //Returns a list of all car objects in the this.cars array whose Make property contains the search string
    filterCarsByMake(filter) {
        return this.cars.filter(car => car.make.indexOf(filter) >= 0);
    }

    //Iterates through a list of vehicle data, validates it, then populates data structures for cars and drones
    loadData(fleet) {
        for (let data of fleet) {
            switch(data.type) {
                case 'car':
                    if (this.validateCarData(data)) {
                        let car = this.loadCar(data); //Instantiate car object
                        if (car)
                            this.cars.push(car); //Pushes object to the this.cars array
                            this.vehicles.push(car); //Pushes object to the this.vehicles array
                    }
                    else { //If car object data is invalid, create a new DataError mesage and push that to errors array
                        let e = new DataError('invalid car data', data);
                        this.errors.push(e);
                    }
                    break;
                case 'drone':
                    if (this.validateDroneData(data)) {
                        let drone = this.loadDrone(data); //Instantiate drone object
                        if (drone)
                            this.drones.push(drone); //Pushes object to the this.drones array
                            this.vehicles.push(drone); //Pushes object to the this.vehicles array
                    }
                    else { //If drone object data is invalid, create a new DataError mesage and push that to errors array
                        let e = new DataError('invalid drone data', data);
                        this.errors.push(e);
                    }
                    break;
                default: //If vehicle type is invalid, push error message to the errors array
                    let e = new DataError('Invalid vehicle type', data);
                    this.errors.push(e);
                    break;
            }
        }
    }

    //Instantiates a car objects from raw data and handles potential errors
    loadCar(car) {
        try{
            let c = new Car(car.license, car.model, car.latLong); //Creates new instance with vehicle data
            c.miles = car.miles; //Adds child-specific (car) properties
            c.make = car.make;
            return c;
        } catch(e) {
            this.errors.push(new DataError('error loading car', car))
        }
        return null;
    }

    //Creates an array of car-specific properties and cycles through them looking for errors
    validateCarData(car) {
        let requiredProps = 'license model latLong miles make'.split(' ');
        let hasErrors = false;
        for (let field of requiredProps) {
            if (!car[field]) {
                this.errors.push(new DataError(`invalid field ${field}`, car));
                hasErrors = true;
            }
        }
        if (Number.isNaN(Number.parseFloat(car.miles))) {
            this.errors.push(new DataError('invalid mileage', car));
            hasErrors = true;
        }
        return !hasErrors;
    }

    //Instantiates a drone objects from raw data and handles potential errors
    loadDrone(drone) {
        try {
            let d = new Drone(drone.license, drone.model, drone.latLong); //Creates new instance with vehicle data
            d.hours = drone.hours; //Adds child-specific (drone) properties
            d.base = drone.base;
            return d;
        } catch(e) {
            this.errors.push(new DataError('error loading drone', drone))
        }
        return null;
    }

    //Creates an array of drone-specific properties and cycles through them looking for errors
    validateDroneData(drone) {
        let requiredProps = 'license model latLong hours base'.split(' ');
        let hasErrors = false;
        for (let field of requiredProps) {
            if (!drone[field]) {
                this.errors.push(new DataError(`invalid field ${field}`, drone));
                hasErrors = true;
            }
        }
        if (Number.isNaN(Number.parseFloat(drone.hours))) {
            this.errors.push(new DataError('invalid airtime', drone));
            hasErrors = true;
        }
        return !hasErrors;
    }
}