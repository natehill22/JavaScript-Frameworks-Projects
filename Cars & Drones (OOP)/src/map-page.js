import {Page} from './framework/page.js';
import {GoogleMap} from './ui/google-map.js';
import {application} from './app.js';

export class MapPage extends Page { //Allows the class to be imported and re-used

    //Calls constructor of its parent class passing the string 'Map' as an arguement
    constructor() {
        super('Map');
    }

    createElement() {
        super.createElement();

        //Shows a DataTable populated with a map showing markers for all vehicles in the fleet
        let centerOfMap = {lat: 40.783661, lng: -73.965883};
        let map = new GoogleMap(centerOfMap, application.dataService.vehicles);
        map.appendToElement(this.element);

    }

    getElementString() {
        return '<div style="margin: 20px;"><h3>Map</h3></div>'
    }
}