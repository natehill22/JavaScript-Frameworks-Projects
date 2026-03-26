import {Page} from './framework/page.js';
import {DataTable} from './ui/data-table.js';
import {application} from './app.js';

export class CarsPage extends Page { //Allows the class to be imported and re-used

    //Calls constructor of its parent class passing the string 'Cars' as an arguement
    constructor() {
        super('Cars');
    }

    createElement() {
        super.createElement();

        //Shows a DataTable populated with specified headers and related data to be shown on this page
        let headers = 'License Make Model Miles'.split(' ');
        let t = new DataTable(headers, application.dataService.cars);
        t.appendToElement(this.element);

    }

    getElementString() {
        return '<div style="margin: 20px;"><h3>Cars</h3></div>'
    }
}