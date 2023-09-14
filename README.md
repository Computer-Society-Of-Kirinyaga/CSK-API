# CSK University API

## API Modules

> User Management

    1.User Auth
        -> login/logout
        -> CRUD -> BIO ->name,email,phone no,course, yearOfStudy, techStack
    2.Admin Auth
        -> Admin type
            -> SuperAdmin - activate or disable Normal Admin [isVerified &isSuperAdmin = true, isNormalAdmin = false]
            -> NormalAdmin - disable normal users account [isVerified & isSuperAdmin = false, isNormalAdmin = true]
    3.Admin & User -> [isDisabled = false] After a successful login we get a JWT token and the users Details. Token valid for twelve hours

> Library Management System

    1. Admin Uploads
    2. User Downloads
    3. Display
    4. Tags

> Event Management System

    1.CRUD -> name,event location,time, event type[online, physical,hybrid]
    2.Display
    3.Register/Confirmation
    4.Upcoming/Past

> Weakly Leaderboard (comming soon)

> Daily Challenge (comming soon)

## Available Branches

- main - production code
- refactored - refactored code ready to be merged to main
- develop - development code note yet refactored

## Braching strategy

- Use this format to create a branch `featureName/yourName` or `bugName/yourName` ie `userAuthenticationFeature/JohnDoe` or `userAuthenticationBug/JohnDoe`
- After you are done with your feature or bug create a pull request to the develop branch.

## Folder Structure

- SRC

  - controllers - logic of our app ie getOneUserViaUser_ID
  - factory - repetitive functionality is performFilterOperation,fetchDataAndFilterUnique,handleResponse
  - helperFunctions - ie capitalizeWords
  - middlewares - custom middlewares ie rateLimiterMiddleware, authMiddleware
  - models - db models
  - routes - routes
  - validators - use Joi to validate all data that is going into the DB.
  - swaggerUI -document our API.

- index.js
- .env
- package.json
- ReadMe.md
- yarn.lock
- .gitignore

## Codding Guidelines

- Use camelCase to name your functions name of variable name if its more than one word.
- for routes and models use Pascal case ie Auth.Routes.js

## Project Files

1.  Models

    - User.Model - name, email, password, phoneNo, course, yearOfStudy, techStack, isDisabled, isUser
    - Admin.Model - name, email, password, phoneNo, isVerified, isDisabled, isSuperAdmin, isNormalAdmin,
    - Library.Model - name, description, tags, file, isDisabled
    - Event.Model - name, description, location, date, startTime, endTime, eventType, isDisabled

2.  Routes

    - Auth.Routes
    - User.Routes
    - Admin.Routes
    - Library.Routes
    - Event.Routes

3.  Controllers

        - User.Controller
        - Admin.Controller
        - Library.Controller
        - Event.Controller

4.  Validators (joi)

        - Auth.Validator
        - User.Validator
        - Admin.Validator
        - Library.Validator
        - Event.Validator

5.  Middlewares

        - authMiddleware - checks if the token is valid
        - userTypeLoginRequired - checks if the user is a user, admin, superAdmin or disabledUser. This offers protection to routes that are only meant for a specific user type.
            - [userLoginRequired] - user need to login to access the route
            - [adminLoginRequired] - admin need to login to access the route
            - [superAdminLoginRequired] - superAdmin need to login to access the route
            - [bothAdminsLoginRequired] - either admin or superAdmin need to login to access the route
            - [AnyLoginRequired] - any user type need to login to access the route
        - rateLimiterMiddleware - limits the number of request a user can make to the server in a given time frame and IP address. This is to prevent DDOS attacks.

## Dotenv Values

- MONGO_URL=mongodb://127.0.0.1:27017/CSKUniversityDb
- JWT_SECRET=universitySecret
- PORT=5009
- EMAIL_SENDER =senderEmail.gmail.com
- EMAIL_PASSWORD =password

> \*\*For email functionality to work with a gmail visit [this link](https://myaccount.google.com/apppasswords?pli=1&rapt=AEjHL4MAyZMTo4Iu6mJAeW1ZhLXbUgJpVRUsRnEsDAM4Nfk5lQHlWRP-1ovJgOhbcFqQ0Kx-a_oAtdUYxjFpXR3Lgiu6_2E5sw) and create an app by providing an app name and copy the generated password copy it and past it on EMAIL_PASSWORD [env]. [More info about nodemailer visit here](https://nodemailer.com/usage/using-gmail/)\*\*

## Testing URL

> Please import the thunder-collection_CSKAPI.json file to your thunderClient extension to test the API. The file is located in the SWAggerUI folder.
