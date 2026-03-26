import {BaseElement} from "../ui/base-element.js";

export class Page extends BaseElement { //Allows the class to be imported and re-used

    //Initializes components with pageTitle
    constructor(pageTitle) {
        super();
        this.pageTitle = pageTitle;
    }
    
}