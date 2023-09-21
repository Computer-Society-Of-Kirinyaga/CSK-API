# CSK University API

## Folder Structure

- SRC

  - controllers - logic of our app ie getOneUserViaUser_ID
  - factory - repetitive functionality is performFilterOperation,fetchDataAndFilterUnique,handleResponse
  - helperFunctions - ie capitalizeWords
  - middlewares - custom middlewares ie rateLimiterMiddleware, authMiddleware
  - models - db models
  - routes - routes
  - validators - use Joi to validate all data that is going into the DB.
  - swaggerUI - have the thunder-collection_CSKAPI.json or thunder-collection_CSKAPI-Deployed (deployed version) file to import to your thunderClient extension to test the API.

- index.js
- .env
- package.json
- ReadMe.md
- yarn.lock
- .gitignore

# API Documentation

## User Management

## Auth Categories

- The **userTypeLoginRequired function** is a higher-order function that takes a user type as an argument and returns a middleware function that checks if the user is authenticated and has the specified user type. If the user is authenticated and has the correct user type, the middleware function calls the next function to pass control to the next middleware function in the chain. If the user is not authenticated or does not have the correct user type, the middleware function returns an error response.

- The `userLoginRequired`, `adminLoginRequired`, `superAdminLoginRequired`, and `bothAdminsLoginRequired` middleware functions are created by calling the `userTypeLoginRequired` function with the appropriate user type argument.These middleware functions are used to restrict access to certain routes in the application based on the user's role. For example, the `userLoginRequired` middleware function restricts access to routes that can only be accessed by regular users, while the `adminLoginRequired` middleware function restricts access to routes that can only be accessed by administrators.
  The `AnyLoginRequired` middleware function is also created by calling the userTypeLoginRequired function, but with the all user type argument. This middleware function is used to restrict access to routes that can be accessed by any authenticated user, regardless of their role.

#### User Routes

- The `app.get("/users", bothAdminsLoginRequired, getUsers)` route is used to retrieve a list of all users in the system. It requires both admins to be logged in to access the route and is handled by the getUsers function in the controller.

- The `app.get("/users/:id", bothAdminsLoginRequired, getUser)` route is used to retrieve a specific user by their ID. It also requires both admins to be logged in and is handled by the getUser function in the controller.

- The `app.post("/users", createUser)` route is used to create a new user in the system. It does not require any authentication and is handled by the createUser function in the controller.

- The `app.patch("/users/:id", AnyLoginRequired, updateUser)` route is used to update an existing user by their ID. It requires any user to be logged in to access the route and is handled by the updateUser function in the controller.

- The `app.delete("/users/:id", AnyLoginRequired, deleteUser)` route is used to delete an existing user by their ID. It also requires any user to be logged in and is handled by the deleteUser function in the controller.

- `app.post("/users/auth/login", loginUser)` route is used to log in a user by verifying their credentials. It does not require any authentication and is handled by the loginUser function in the controller.

- The `app.post("/users/auth/reset", resetUserLoginCredentials)` route is used to reset a user's login credentials.

## Admin Management

#### Admin Routes

- The `app.get("/admins", superAdminLoginRequired, getAdmins)` route is used to retrieve a list of all admins in the system. It requires a super admin to be logged in to access the route and is handled by the getAdmins function in the controller.

- The `app.get("/admins/:id", bothAdminsLoginRequired, getAdmin)` route is used to retrieve a specific admin by their ID. It requires both admins to be logged in and is handled by the getAdmin function in the controller.

- The `app.post("/admins", superAdminLoginRequired, createAdmin)` route is used to create a new admin in the system. It requires a super admin to be logged in and is handled by the createAdmin function in the controller.

- The `app.patch("/admins/:id", bothAdminsLoginRequired, updateAdmin)` route is used to update an existing admin by their ID. It requires both admins to be logged in to access the route and is handled by the updateAdmin function in the controller.

- The `app.delete("/admins/:id", superAdminLoginRequired, deleteAdmin)` route is used to delete an existing admin by their ID. It requires a super admin to be logged in to access the route and is handled by the deleteAdmin function in the controller.

- The `app.post("/admins/auth/login", loginAdmin)` route is used to log in an admin by verifying their credentials.

- The `app.post("/admins/auth/reset", resetAdminLoginCredentials)` route is used to reset an admin's login credentials.

- The `app.post("/sadmins/auth/login", superLoginAdmin)` route is used to log in a super admin by verifying their credentials.

- The `app.post("/sadmins/auth/reset", superResetAdminLoginCredentials)` route is used to reset a super admin's login credentials.

- The `app.patch("/sadmins/:id", superAdminLoginRequired, updateAdmin)` route is used to update an existing admin by their ID. It requires a super admin to be logged in to access the route and is handled by the updateAdmin function in the controller.

## Event Management

#### Event Routes

- The `app.get("/events", AnyLoginRequired, getEvents)` route is used to retrieve a list of all events in the system. It requires any authenticated user to be logged in to access the route and is handled by the getEvents function in the controller.

- The `app.get("/events-past", AnyLoginRequired, getPastEvents)` route is used to retrieve a list of all past events in the system. It requires any authenticated user to be logged in to access the route and is handled by the getPastEvents function in the controller.

- The `app.get("/events-future", getFutureEvents)` route is used to retrieve a list of all future events in the system. It does not require any authentication to access the route and is handled by the getFutureEvents function in the controller.

- The `app.get("/events/:id", AnyLoginRequired, getEvent)` route is used to retrieve a specific event by its ID. It requires any authenticated user to be logged in to access the route and is handled by the getEvent function in the controller.

- The `app.post("/events", bothAdminsLoginRequired, createEvent)` route is used to create a new event in the system. It requires both admins to be logged in to access the route and is handled by the createEvent function in the controller.

- The `app.patch("/events/:id", bothAdminsLoginRequired, updateEvent)` route is used to update an existing event by its ID. It requires both admins to be logged in to access the route and is handled by the updateEvent function in the controller.

- The `app.delete("/events/:id", bothAdminsLoginRequired, deleteEvent)` route is used to delete an existing event by its ID. It requires both admins to be logged in to access the route and is handled by the deleteEvent function in the controller.

### EventFiles Routes & Controller

**Route: POST /eventUpload**

**Input:**

- A file with the key `filename` in the request body.

**Description:**

This route uploads a single file to Firebase Storage and returns a JSON response with the URL of the uploaded file.

**Response:**

- Status code: 200
- Body:

       {
         "message": "eventFile uploaded to Firebase Storage",
         "viewURL": "<public URL of the uploaded file>",
         "name": "<name of the uploaded file>"
        }

**Route: POST /eventUpload/many**
**Input:**

- An array of files with the key filename in the request body. The array should contain no more than 5 files.

**Description:**

This route uploads multiple files to Firebase Storage and returns a JSON response with an array of URLs for the uploaded files.

**Response:**

- Status code: 200
- Body:

        {
            "message": "eventFiles uploaded to Firebase Storage",
            "viewURLs": [
                {
                "name": "<name of the uploaded file>",
                "viewURL": "<public URL of the uploaded file>"
                },
                ...
            ]
        }

**Route: DELETE /eventUpload/**

**Input:**

- The name of the file to be deleted as a URL parameter.

**Description:**

This route deletes a single file from Firebase Storage.

**Response:**

- Status code: 200
- Body:

        {
            "message": "eventFile deleted from Firebase Storage",
            "name": "<name of the deleted file>"
        }

**Route: DELETE /eventUpload/many/:filesArray**

**Input:**

- An array of file names to be deleted as a URL parameter.

**Description:**

This route deletes multiple files from Firebase Storage.

**Response:**

- Status code: 200
- Body:

        {
            "message": "eventFiles deleted from Firebase Storage",
            "files": [
                "<name of the deleted file>",
                ...
            ]
        }

## Library Management

### Library Routes

- The `app.get("/libraries", AnyLoginRequired, getLibraries)` route is used to retrieve a list of all libraries in the system. It requires any authenticated user to be logged in to access the route and is handled by the getLibraries function in the controller.

- The `app.get("/library/:id", AnyLoginRequired, getLibrary)` route is used to retrieve a specific library by its ID. It requires any authenticated user to be logged in to access the route and is handled by the getLibrary function in the controller.

- The `app.post("/library", bothAdminsLoginRequired, createLibrary)` route is used to create a new library in the system. It requires both admins to be logged in to access the route and is handled by the createLibrary function in the controller.

- The `app.patch("/library/:id", bothAdminsLoginRequired, updateLibrary)` route is used to update an existing library by its ID. It requires both admins to be logged in to access the route and is handled by the updateLibrary function in the controller.

- The `app.delete("/library/:id", bothAdminsLoginRequired, deleteLibrary)` route is used to delete an existing library by its ID. It requires both admins to be logged in to access the route and is handled by the deleteLibrary function in the controller.

### LibraryFiles Routes & Controller

defines several routes for uploading, retrieving, and deleting files in a Firebase Storage bucket. The file uses the multer package to handle file uploads and the @firebase/storage package to interact with Firebase Storage.

**Route: POST /libraryUpload/**

**Input:**

- A file with the key filename in the request body.

**Description:**

This route uploads a single file to Firebase Storage and returns a JSON response with the URL of the uploaded file.

**Response:**

- Status code: 200
- Body:

        {
            "message": "File uploaded to Firebase Storage",
            "viewURL": "<public URL of the uploaded file>",
            "name": "<name of the uploaded file>"
        }

**Route: POST /libraryUpload/many**

**Input:**

- An array of files with the key filename in the request body. The array should contain no more than 5 files.

**Description:**

This route uploads multiple files to Firebase Storage and returns a JSON response with an array of URLs for the uploaded files.

Response:

- Status code: 200
- Body:

        {
            "message": "Files uploaded to Firebase Storage",
            "viewURLs": [
                            {
                                "name": "<name of the uploaded file>",
                                "viewURL": "<public URL of the uploaded file>"
                            },
                        ...
                        ]
        }

**Route: DELETE /libraryUpload/:name**

**Input:**

- The name of the file to be deleted as a URL parameter.

**Description:**

This route deletes a single file from Firebase Storage.

**Response:**

- Status code: 200
- Body:

        {
            "message": "File deleted from Firebase Storage",
            "name": "<name of the deleted file>"
        }

**Route: DELETE /libraryUpload/many/:filesArray**

**Input:**

- An array of file names to be deleted as a URL parameter.

**Description:**

This route deletes multiple files from Firebase Storage.

**Response:**

- Status code: 200
- Body:

        {
            "message": "Files deleted from Firebase Storage",
            "files": [
                "<name of the deleted file>",
            ...
            ]
        }

## API Modules

> User Management

> Library Management System

> Event Management System

> Weakly Leaderboard (coming soon)

> Daily Challenge (coming soon)

## Available Branches

- main - production code
- refactored - refactored code ready to be merged to main
- develop - development code note yet refactored

## Branching strategy

- Use this format to create a branch `featureName/yourName` or `bugName/yourName` ie `userAuthenticationFeature/JohnDoe` or `userAuthenticationBug/JohnDoe`
- After you are done with your feature or bug create a pull request to the develop branch.

## Codding Guidelines

- Use camelCase to name your functions name of variable name if its more than one word.
- for routes and models use Pascal case ie Auth.Routes.js

## Dotenv Values

- MONGO_URL=mongodb://127.0.0.1:27017/CSKUniversityDb
- JWT_SECRET=universitySecret
- PORT=5009
- EMAIL_SENDER =senderEmail.gmail.com
- EMAIL_PASSWORD =password

> \*\*For email functionality to work with a gmail visit [this link](https://myaccount.google.com/apppasswords?pli=1&rapt=AEjHL4MAyZMTo4Iu6mJAeW1ZhLXbUgJpVRUsRnEsDAM4Nfk5lQHlWRP-1ovJgOhbcFqQ0Kx-a_oAtdUYxjFpXR3Lgiu6_2E5sw) and create an app by providing an app name and copy the generated password copy it and past it on EMAIL_PASSWORD [env]. [More info about nodemailer visit here](https://nodemailer.com/usage/using-gmail/)\*\*

## Gmail configuration

> Please import the thunder-collection_CSKAPI.json file to your thunderClient extension to test the API. The file is located in the SWAggerUI folder.
