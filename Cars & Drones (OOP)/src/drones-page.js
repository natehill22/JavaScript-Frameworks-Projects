import {Page} from './framework/page.js';
import {DataTable} from './ui/data-table.js';
import {application} from './app.js';

export class DronesPage extends Page { //Allows the class to be imported and re-used

    //Calls constructor of its parent class passing the string 'Drones' as an arguement
    constructor() {
        super('Drones');
    }

    createElement() {
        super.createElement();

        //Shows a DataTable populated with specified headers and related data to be shown on this page
        let headers = 'License Model Hours Base'.split(' ');
        let t = new DataTable(headers, application.dataService.drones);
        console.log(t);
        t.appendToElement(this.element);

    }

    getElementString() {
        return '<div style="margin: 20px;"><h3>Drones</h3></div>'
    }
}