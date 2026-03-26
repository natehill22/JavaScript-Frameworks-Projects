import {BaseElement} from './base-element.js';

export class Button extends BaseElement { //Allows the class to be imported and re-used
    
    //Initializes components with a title (button text) and sets an empty styleString
    constructor(title) { 
        super();
        this.title = title;
        this.styleString = '';
    }

    getElementString() { //Returns a template string for a Button including MDL classes
        return `
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" style="${this.styleString}">
            ${this.title}
        </button>
        `;
    }

    //Allows setting custom inline CSS styles to the styleString property
    setStyleString(style) {
        this.styleString = style;
    }
}