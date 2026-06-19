
I can really see the practical value of using Angular; it mixes all the strengths of typed languages (performance, maintainability, reliability, testing ease), the uniformity of component-based architecture (which enforces strict coding standards making large applications easily maintainable, scalable and user-friendly), and the applicability of a fully-featured web-based framework (contains built-in routing, forms handling, state management, and HTTP clients) with a handful of syntactical extras thrown in to make everything gel seamlessly. Simply put, Angular is a JavaScript framework that makes it easier to build rich and powerful client-side single page applications (SPAs) and User Interfaces. 

Angular makes our HTML more expressive with simple-to-use embedded features, utilizes data binding to connect our data to the UI, promotes modularity (all applications are a set of building blocks which makes it easier to create and reuse content), has its own built-in back-end integration (making it easier to get/post data or execute server-side logic). Angular's CLI has been constructed to be far more useful than in other frameworks I've seen; it can be used to generate new components, services, modules, pipes, and more using simple command statements that expedite and automate would-be tedious workflow creation. Even the architectural pattern used to build nearly all elements (components, services, modules, etc.) is consistent--create a class, define the metadata's decorator, and import what's needed for it to work.

The AppModule is a class decorated with the NgModule decorator and it organizes the pieces of our application, extending it through external libraries, modules or third-party modules; it serves as a over-arching container to group related components, directives, etc. into blocks of functionality. It's composed of the declarations array (which declares the components, directives, pipes that belongs to this module), imports array (which imports modules or features the module needs), exports array (which defines pieces [components, directives, pipes, or other modules] to be shared), and the bootstrap array (which defines what the index.html file needs to start up the application). 

As stated above, components are one of the key building blocks of our application; they are a combination of a view/UI (defined with a template), logic/code (defined with a class methods and properties), and metadata/extra data (defined with a decorator). Building them follows the same architectural pattern noted above except an @Component is used as the decorator and then the component name should be placed in the NGModels declarations array. For UI data, for example, HTML can be written in the component or in a referenced template and a selector assigned; then the selector can be dropped in HTML tags within the HTML, and the component's HTML (or referenced template) will show on the page. Similar function can be applied to style or style sheets, but they only apply to this specific component's view. Components can even be nested (within other components) to build complex nested UI.

Data Binding:
data binding - displays a component class/property value in the view ({{pageTitle}}), when we want to control the DOM by setting a DOM element property in code ( [src] ), when we want to respond to user actions ( (click) ), and when we want to display a component class property AND update the property when the user makes a change [()]. (interpolation, property binding, event binding, two-way binding)
data binding - bind dom elements to component properties so the component can change the look and feel as needed, change element colors or styles, update font size based on user preferences, set an image source from a db field, allows us to set a property of an element to the value of a template expression, makes it easy to display component properties and set dom element properties from our component, so we can easily display user information and respond to user actions, coordinates communication between the component's class and its template and often involves passing data
event binding (binding to the component) - notification of user actions on other events from the DOM (button click), allows us to connect and event to a method in the component
two-way binding - set an element property AND receive event notifications of user changes to that property
property binding []
event binding ()

Directives and Pipes:
angular directives - custom HTML syntax/element or attribute used to power up and extend our html, add logic to our html such as if statements and for loops, we can use the component as a directive (insert this components template into any other components template by using the selector as an html tag), the component can tie in html as a template or a templateUrl to direct to a specific file to show in the ui
directives can be built-in or custom
structural directives - modifies the structure or layout of a view by adding or removing or manipulating elements and their children, ngIf (conditional if logic), ngFor (for loops) for of vs for in (of iterates over iterable objects, whereas in iterates over the object's properties)
pipe - transform bound properties before display, built-in pipes: date, number, decimal, percent, currency, json and custom, pipes can have parameters using a color after the pipe
pipes transform bound properties before display
built-in pipes: date, number, decimal, percent, currency, json
custom pipe - can be made to perform specific tasks

Services, InterFaces, Lifecycle Hooks:
services - implement functionality independent from any particular component, to share data and logic across components, encapsulate external interactions
service is a class with a focused purpose, 
-used for features that are independant from any component, provide shared data or logic across components
dependency injection - a coding pattern in which a class receives the instances of objects it needs (called dependencies) from an external source rather than creating them itself
root injector - use if the service is used throughout the application
component injector - use if only that component uses the service
has a lifecycle and uses lifecycle hooks - an interface we implement to write code when a component lifecycle event occurs OnInit, OnChanges, OnDestroy
interfaces - blueprint of types

Routing, Observables, and nested components:
Routing configuration functions automatically through angular forward and back buttons, and typing in the url address bar. So routing is mainly used for navigation through menu options, links, images, or buttons.
routing requires configuring of routes, and then tie those routes to actions (link, empty/default, wildcard) and action activates routes to display the view
route with code
guards limits access to a route, confirm navigation away from a route, or to preload data for a route. Built in to angular's router
passing parameters to a route (id in a url)
observerables - a collection of items that occurs over time
nestable components need a selector defined (name of directive)
they can avoid using routes by placing the directive within another component
rxJS - a library for composing data using oservable sequences and transforming that data using operators, angular uses rxJS for working with data (especially asynchronous data)
observables don't retain items, emitted items can be observed over time
http
error handling - helps with errors that appear when communicating with a background service
subscribe kicks off the HTTP request
call the subscribe method for any component that needs data from a data service, have a function to handle the emitted item (next, error, complete)
observables don't emit values until we subscribe
needs to unsub
nested component is a component within a component - it can be used to show components in a view without routing 
passing data to a nested component using @Input
we can use the @Output decorator to decorate any property of the nested components class (must be an event)