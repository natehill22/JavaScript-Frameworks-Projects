import {Page} from "./framework/page.js";
import {Image} from "./ui/image.js";
import {Button} from "./ui/button.js";
import {application} from "./app.js";

export class HomePage extends Page { //Allows the class to be imported and re-used

    //Calls constructor of its parent class passing the string 'Home' as an arguement
    constructor() {
        super('Home');
    }

    //Shows the image and 2 styled buttons going to the Cars and Drones page respectively 
    createElement() {
        super.createElement();

        let i = new Image('../images/drone.jpg');
        i.appendToElement(this.element);

        let styleString = 'width: 300px; height: 80px; font-size: 30px; margin: 20px;';
        let b = new Button('Self Driving Cars');
        b.setStyleString(styleString);
        b.appendToElement(this.element);
        b.element.click(() => application.activateRoute('Cars'));

        b = new Button('Drones');
        b.setStyleString(styleString);
        b.appendToElement(this.element);
        b.element.click(() => application.activateRoute('Drones'));
    }

    getElementString() {
        return '<div style="text-align: center;"></div>';
    }
}