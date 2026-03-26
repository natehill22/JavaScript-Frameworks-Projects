import {BaseElement} from './base-element.js';

export class TitleBar extends BaseElement { //Allows the class to be imported and re-used

    //Initializes components with title and sets an empty links array
    constructor(title) {
        super();
        this.title = title;
        this.links = [];
    }

    //Builds a list of hyperlink objects and pushes them to the this.links array
    addLink(title, href) {
        this.links.push({
            title,
            href
        });
    }

    getElementString() {
        let links = '';
        for (let link of this.links) //Cycles through the list of this.links objects and sets them all as HTML links
            links += `<a class="mdl-navigation__link">${link.title}</a>\n`;
        //Builds the nav structure populated with data pulled from the titles and associated links
        return ` 
        <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <header class= "mdl-layout__header">
                <div class="mdl-layout__header-row">
                    <!--Title-->
                    <span class="mdl-layout-title">${this.title}</span>
                    <!--Add spacer, to align navigation to the right-->
                    <div class="mdl-layout-spacer"></div>
                    <!--Navigation. We hide it in small screens.-->
                    <nav class="mdl-navigation mdl-layout--large-screen-only">
                        ${links}
                    </nav>
                </div>
            </header>
            <div class="mdl-layout__drawer">
                <span class="mdl-layout-title">${this.title}</span>
                <nav class="mdl-navigation">
                    ${links}
                </nav>
            </div>
            <main class="mdl-layout__content">
                <div class="page-content"></div>
            </main>
        </div>
        `;
    }
}