import {BaseElement} from './base-element.js';

export class Image extends BaseElement { //Allows the class to be imported and re-used

    //Initializes components with a filename and sets the arguement to an instance property of the current class
    constructor(fileName) {
        super();
        this.fileName = fileName;
    }

    getElementString() { //Returns a template string that dynamically sets the image (and its width) 
        return `
        <img src="${this.fileName}" style="width: 100%;" />
        `;
    }
}