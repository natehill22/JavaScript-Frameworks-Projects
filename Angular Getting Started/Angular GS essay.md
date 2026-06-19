
I can really see the practical value of using Angular; it mixes all the strengths of typed languages (performance, maintainability, reliability, ease of testing),  and the applicability of a fully-featured web-based framework (contains built-in routing, forms handling, state management, and HTTP clients). Angular's CLI can be used to generate new components, services, modules, pipes, and more using simple command statements that expedite and automate would-be tedious workflow creation. It's used to building scalable and robust web applications

SPA
cli command interface to aid productivity, create, execute, build, test, and deploy angular applications
Unified architectural pattern - making it easier for large teams to collaborate

uses component based-architecture - component is a view (defined with a template), logic (defined with a class), and metadata (defined with a decorator)

data binding - displays a component class/property value in the view ({{pageTitle}}), when we want to control the DOM by setting a DOM element property in code ( [src] ), when we want to respond to user actions ( (click) ), and when we want to display a component class property AND update the property when the user makes a change [()]. (interpolation, property binding, event binding, two-way binding)

services - implement functionality independent from any particular component, to share data and logic across components, encapsulate external interactions

how to build a component - export a class, attach a decorator, and import what we need. then put each component, directive, and pipe in an angular modules' declarations array

ng module - organizes the pieces of our application and extends it with external libraries, modules or 3rd party modules (a class with an NGModule decorator):
declarations array - declares the components, directives, pipes that belongs to this module
imports array - imports modules that this module needs (this includes other modules that may contain components, directives and pipes), also pull in features from the feature module
exports array - defines pieces we want to share (includes components, directives, and pipes and other modules)
bootstrap array - defines what the index.HTML file needs to start up the application

route with code
guards limits access to a route, confirm navigation away from a route, or to preload data for a route. Built in to angular's router
passing parameters to a route (id in a url)

observerables - a collection of items that occurs over time

nestable components need a selector defined (name of directive)
they can avoid using routes by placing the directive within another component

Routing configuration functions automatically through angular forward and back buttons, and typing in the url address bar. So routing is mainly used for navigation through menu options, links, images, or buttons.
routing requires configuring of routes, and then tie those routes to actions (link, empty/default, wildcard) and action activates routes to display the view

rxJS - a library for composing data using oservable sequences and transforming that data using operators, angular uses rxJS for working with data (especially asynchronous data)
observables don't retain items, emitted items can be observed over time
http
error handling - helps with errors that appear when communicating with a background service
subscribe kicks off the HTTP request
call the subscribe method for any component that needs data from a data service, have a function to handle the emitted item (next, error, complete)
observables don't emit values until we subscribe
needs to unsub

service is a class with a focused purpose, 
-used for features that are independant from any component, provide shared data or logic across components
dependency injection - a coding pattern in which a class receives the instances of objects it needs (called dependencies) from an external source rather than creating them itself
root injector - use if the service is used throughout the application
component injector - use if only that component uses the service

the steps for making almost anyting in angular follows the same 3 paths, it's very uniform and streamlined: create a class, define metadata's decorator, and import what we need to make it work

nested component is a component within a component - it can be used to show components in a view without routing 
passing data to a nested component using @Input
we can use the @Output decorator to decorate any property of the nested components class (must be an event)
property binding []
event binding ()

components are one of the key building blocks of our application
has a lifecycle and uses lifecycle hooks - an interface we implement to write code when a component lifecycle event occurs OnInit, OnChanges, OnDestroy
pipes
interfaces - blueprint of types
component styles - specific to that component view

pipes transform bound properties before display
built-in pipes: date, number, decimal, percent, currency, json
custom pipe - can be made to perform specific tasks