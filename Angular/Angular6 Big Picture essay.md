

Angular is a tool to help you build interactive websites, great framework for building web applications
-framework-ish
one of many alternatives (jQuery is most popular competition)

Angular 2 is standards based
more modern
performant

ng update 
-updates your code to the newer version
-uses schematics (tool that rewrites code for you)
updating version can require little to no manual work on your part

Original Angular framework is not called AngularJS. Newer versions (from v2 on) are just called Angular.
More modern and faster than AngularJS
Starts at v2, skips 3, and then moves up from there
CLI powerful

Universal benefits (completely objective):
-reduction of cost (bug fixes, dev time, stability)
-standards compliance (run in more browsers and reach more users) (ES6+, modules, internationalization and accessibility)
-performance (very fast)
-open source (free license that never expires)
-popular (easier to find devs who work with angular)
-documentation (extremely good, tons of work put into it for info and accessibility)
subjective & situational benefits:
-framework (all pieces come with: router, http, forms, rxjs[async data], etc.) (you have to make less decisions as a result)
-uniformity (increases the speed to get devs up and running on your application)
-google backing (benefit?)
-typescript (written using) (types usually reduce bugs)
basic features:
-progressive web apps (allows web application to be installed like a mobile application, angular provides significant support for these)
-lazy loading (allows you to reduce the size of the data initially needs to be dl to the browser for the app to begin working, can improve the perceived performance of the app)
-form (Angular has a fully featured forms library, it's very easy to write complex data input forms, handle complex validations, and other form aspects)
-RXJS (angular is built on top of the RXJS library [modern library used to handle asynchronous data], eases the amount of work it takes to make async features work in an application)
-fully featured router (feature parody with all modern frameworks)
-animations (use animations for page transitions, data sorting, adding or removing data to a list)
advanced features:
-server-side rendering (rendering your first page view on the server, makes the inital page load faster and improves SEO)
-mobile (very mobile friendly)
-angular language service (get better intellisense and debugging in templates)
-ng upgrade library (allows for existing angularJS applications to be upgraded to angular)

Lower Cost Development
Performant
Full Framework
Typescript
Many Features
Server-side rendering
Upgrade

Faster
Dependency Injection
Zone.js
Multiple Rendering Targets

One Way Data Flow - architectural construct that assists with change detection, when changes happen to the state of a parent component causes all child components to run state checks and re-rendering with new state
Dependency Injection - a design pattern where a class requests external resources (dependencies) rather than creating them itself
Components - reusable, self-contained building block of your user interface that can be loaded directly into the HTML
Directives - HTML attributes that give html elements new funcionality 
Templates - separate from the components
Zone.js - the key to angular's change detection, creates a wrapper around all asynchronous operations in the browser (user interactions, http, timers) and lets angular know after a change has been made
Rendering Targets - changes the rendering engine, which allows itself to be rendered by any device

CLI (Capabilities:)
-Create New Applications
-Create new components, services, pipes, etc.
-act as the webserver in development
-linting
-testing
-build your code for production
Server-Side Rendering (benefits:)
-performance(reduces initial DL size and reduces render time)
-SEO (full pre-render, dynamic pre-render, client-side switch)
Mobile & Native Frameworks
Testing
AOT Compiler (Ahead of Time) instead of Just in Time compilers, lets you tune your code to its minimum size
Editors (TypeScript, Angular Language Service)

Gotchas:
TypeScript and Decorators - different syntax from most JS they look like functions
Custom Pipes - Pure (only eval'd when input changes) and impure (eval'd on every change detection cycle)
Module API - 
Cryptic Error messages
Build - tune your build to be optimized
Delivery Size
RxJS

Build is important
TypeScrpt, NGrx, and Webpack