import {TitleBar} from '../ui/title-bar.js';

export class ApplicationBase { //Allows the class to be imported and re-used

    //Initializes components with title and sets an empty routeMap and defaultRoute
    constructor(title) {
        this.title = title;
        this.titleBar = new TitleBar(this.title); //Pulled in nav display and displays them
        this.routeMap = {};
        this.defaultRoute = null;
    }

    //Finds TitleBar's .page-content element, empties the container, and appends the new view using jQuery
    activateRoute(route) {
        let content = this.titleBar.element.find('.page-content');
        content.empty();

        this.routeMap[route].appendToElement(content);
    }

    //Registers new page in a routing system, adds it to UI navbar, maps ID to a pageObject, and sets it as the default route
    addRoute(id, pageObject, defaultRoute = false) {
        this.titleBar.addLink(id, '');

        this.routeMap[id] = pageObject;

        if (defaultRoute) {
            this.defaultRoute = id;
        }
    }

    //Initializes a navbar UI element that replaces all navlinks with a new route upon click
    show(element) {
        this.titleBar.appendToElement(element);

        this.titleBar.element.find('.mdl-navigation__link').click((event) => {
            let route = event.target.innerHTML;
            this.activateRoute(route.trim()); //Cleans up whitespace
        });

        if (this.defaultRoute) {
            this.activateRoute(this.defaultRoute);
        }
    }
}