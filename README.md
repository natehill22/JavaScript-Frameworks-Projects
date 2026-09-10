# JavaScript-Frameworks-Projects
This repository is for my (Nathaniel Hill's) Tech Academy, Pluralsight, and Udemy Advanced JavaScript Frameworks projects. The projects in this folder are the results of the learning and practice put into programming within JavaScript Frameworks like Express, React, Vue, Ember, Angular, AngularJS, the MEAN stack, and the MEN stack. Concepts like MVC (Model-View-Controller), AJAX, JSX, OOP, RESTful APIs, were focused on at great length and tools like MongoDB, MySQL, Node.js, TypeScript, JQuery, JSON, Angular Material Design, and Postman were heavily relied upon. 


## Projects:
- [Student Portfolio](https://natehill22.github.io/)
- [Todo App - MEAN Stack](/My%20MEAN%20Todo)
- [Posts App - MEAN Stack (Angular and Node)](/MEAN%20Stack%20Guide%20-%20Angular%20and%20Node/mean-course)
- [Tutorials App - MEN stack](/nodejs-express-mongodb)
- [Vue - Hangman](/Vue/HangmanGame)
- [JQuery - Simon Says](/SimonSaysGame)
- [React - Connect 4](/Connect4Game/connect-four)
- [Angular - Rock Paper Scissors](/Rock%20Paper%20Scissors%20Angular/rockpaperscissors)



## Student Portfolio
This page is an active portfolio webpage for me as a developer. I've updated it with modern JavaScript, HTML, and CSS for looks, security, and functionality: I added solid RegEx validation for the pop-up form, added dynamic scroll nav-highlighting, added and adjusted image rendering for consistency, and fixed problematic mobile/tablet rendering down to 320px screen-width. 

## Todo App - MEAN Stack
The assignment was to make a simple full-stack Todo App; I opted to use decoupled architecture to maintain servers for both backend and frontend that communicated through RESTful API network requests. I built out CRUD functionality with modern Angular standards through Angular signals (to immediately see updates) and @if syntax (for better performance). One of my favorite aspects of coding is envisioning what you want, and then stopping at nothing until you've built it just right; many elements of this project (from the Todo date formatting to the edit state of checked items) fed that effectuation. It was a joy to work on.  

## Posts app - MEAN Stack (Angular and Node)
Following the tutorials, I built a single-page CRUD-functional web-application that can display, update, and manage users' posts. Complete with image upload, pagination, user authentication, authorization, error handling, and many other optimizations, I got to learn/use MIME-type validators, tokens, and the bcrypt and jwt libraries to achieve the app's functionality. 

This course was programmed using a significantly outdated version of Angular, and I chose to, once finished, modernize the entire code base. I replaced most subscriptions with Angular signals, introduced error handling, removed troublesome promise/then statements, among many other changes.

## Tutorials app - MEN stack
As one can infer from the name, this was a lesson in how to create a MEAN app without programming in the Angular frontend. The goal was to quickly build successful simple CRUD functionality for an app that manages Tutorials using Node.js RESTful APIs, Express middleware, and the Mongoose library (to add schema-based models to our application data). I got more practice building out models, routes, and controllers to enable full app functionality. As no frontend was built for this app, all testing was done using Postman. 

## Vue - Hangman
For this project, I programmed a Hangman game using the Vue framework. I loved working in Vue; it seems so functional and uncomplicated--very user-friendly. I got to utilize the JavaScript canvas to draw the 2D renderings tied to user action (drawing legs upon wrong guess, etc.), used v-cloak to hide letters until selected, used RegEx to define acceptable inputs, and even enabled a Two player mode where the other players can write an unpre-programmed word for the guessing player.  

## JQuery - Simon Says
Here, I was tasked with writing and personalizing a Simon Says game using JQuery. I used JQuery to easily manipulate DOM elements, build animations (sliding each square in [delayed] from a different side upon page load, fadeIn/Out), and add and remove classes that direct game event states (game over, waiting, playing, on, etc.). I also added many color adjustments to make gameplay more intuitive (grey overlays before playable state, black replacement when computer reveals pattern, white fade when user selects the correct pattern element). 

## React - Connect 4
In this project, I used React to make a Connect-4 game. As React is component-based architecture, I had to build a cascade of components (App, Board, Column, Tile) to handle the function of this game--I had to manage the state of every tile and update them upon every click/move. This project introduced me to the spread operator, I got to build out a gravity mechanic (to drop the tile into the lowest available space in the selected column), and I added sound effects and looping music upon game start; these were all new to me. The tutorial covered Connect-4 horizontal and vertical win conditions, but I chose to delve deeper and build the diagonal win conditions.

## Angular - Rock Paper Scissors
In this Angular app, I made a Rock Paper Scissors game. This game makes heavy use of Angular signals to give immediate updates to the page; through these signals, I display User and Computer selections for each round and keep track of total wins and losses. I used TypeScript in this project to help define the 'weapons', set a random selection for the computers' choice of those weapons, and defined win, lose, and draw conditions as well as conditional text. 