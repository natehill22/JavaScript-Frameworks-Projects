# Posts App

## Project Overview
__Role__: Full-Stack Developer  
__Tech Stack__: MEAN Stack (MongoDB, Express.js, Angular, Node.js), JavaScript, HTML/CSS, Mongoose, bcrypt, jwt(jsonwebtoken), multer, MIME-type validators


The Posts app is intended as a single-page CRUD-functional web application where users can manage Posts uploaded to a specific page (they can view, display, update, create, and delete posts [should they have proper permissions]). Complete with image upload, pagination, user authentication, authorization, error handling, and many other optimizations, I utilized modern Angular features like Standalone Components, Angular Signals (API and Inputs), Angular Materials, Reactive Forms, Functional HTTP Interceptors and Route Guards to achieve the desired functionality.


## Core Technologies
- __Backend__: Node.js, Express.js, bcrypt, jsonwebtoken(JWT), multer
- __Frontend__: Angular, HTML, CSS, JavaScript
- __Database__: MongoDB, Mongoose
- __Libraries__: 
    - bcrypt (password hashing & security) 
    - jsonwebtoken[JWT] (user authentication & token validation) 
    - multer (file upload) 
    - MIME-type validators (file type identification/validation)
- __Version Control__: Git

## Key Features
- CRUD Functionality: Users can quickly and intuitively add, view, edit, and delete Posts should they have the correct permissions.  

- Image Upload: When a user is shown the form to create a Post, the option for uploading an image exists. Once created, this image then shows as a part of that post. Multer and MIME-type validators were utilized to ensure that only jpeg or png type files could be uploaded.

- Pagination: Angular Materials was utilized to add quick, useful, and nice-looking features like pagination. With this feature, users can navigate from page to page, adjust the number of posts per page, and get a realistic page total. 

- User Authentication: Using a new database for users, the bcrypt library for password hashing, and jsonwebtokens to enact login timeouts, User Authentication functionality was set up. A Signup page was built to create new users and a Login page was built to log existing users in (only when they had the matching identification credentials). Error handling was also built to protect against unwanted access and to provide helpful error messaging. 

- Authorization: While any user (even logged-out users) can view the list of posts, only the user who created the post is able to edit or delete it. The Edit and Delete buttons are hidden from view for anyone who is not recognized as the Post author. 



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
npx nodemon server.js
```

Both are needed for app to run. 

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.5.