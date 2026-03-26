//Creates an exportable Vehicle object that initializes an iteration with a license plate, model, and location
export class Vehicle { 
    constructor(license, model, latLong) { 
        this.license = license;
        this.model = model;
        this.latLong = latLong;
    }
}