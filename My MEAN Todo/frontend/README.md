# Todo App

## Project Overview
__Role__: Full-Stack Developer  
__Tech Stack__: MEAN Stack (MongoDB, Express.js, Angular, Node.js), JavaScript, HTML/CSS, Mongoose, CORS


The Todo App is a simple full-stack app designed to help users in managing (creating, reading, marking/updating, and deleting) their own list of Todo tasks. I opted to use decoupled architecture (backend and frontend servers that communicated through RESTful API network requests) and built out CRUD functionality with modern Angular standards (Angular signals for reactive state management and @if syntax for better performance).


## Core Technologies
- __Backend__: Node.js, Express.js, CORS
- __Frontend__: Angular, HTML, CSS, JavaScript
- __Database__: MongoDB, Mongoose
- __Version Control__: Git

## Key Features
- Task Addition and Removal: Users can quickly add Todo tasks through button select or the 'Enter' button. When users want to remove a task from the list (which is different than updating its completed state), they simply need to hover over the X button on the tasks row and press it. 

- Date Assignment: Upon Task creation, that todo is updated with a formatted (for ease) date on the far right side of the task. The date is automatically pulled from the current datetime to enhance the users' experience. 

- Dynamic State Updating: When a task's checkbox is selected, the checkbox is distinctly marked and all text content of that task is struckthrough. If that checkbox is de-selected, these changes are removed. 

- Intuitive UI/UX: Strikethroughs, button hover states, and selection color differentials all lend the application a straightforward and easy-to-use feel.  

## Setup Instructions
### Frontend

To start a local development server, in the active frontend folder run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Backend

To start the local backend server, in the active backend folder run:

```bash
node server.js
```

Both are needed for app to run. 

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.5.