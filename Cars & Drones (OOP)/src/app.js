import $ from 'jquery';
import {fleet} from './fleet-data.js'
import {FleetDataService} from './services/fleet-data-service.js';
import {ApplicationBase} from './framework/application-base.js';
import {HomePage} from './home-page.js';
import {CarsPage} from './cars-page.js';
import {DronesPage} from './drones-page.js';
import {MapPage} from './map-page.js';



export class App extends ApplicationBase { //Allows the class to be imported and re-used

    //Initializes components and ties dataService variable to classes and functions
    constructor() {
        super('Fleet Manager');
        this.dataService = new FleetDataService();
        this.dataService.loadData(fleet);

        //Adds routes from navbuttons to different pages through their classes
        this.addRoute('Home', new HomePage(), true);
        this.addRoute('Cars', new CarsPage());
        this.addRoute('Drones', new DronesPage());
        this.addRoute('Map', new MapPage());
    }
}

//Instantiates and renders a web application within a browser enviroment
export let application = new App();
application.show($('body'));