## Digital School Project

This is a web application for a digital school project, which allows teachers to create programs for their classes, students to view those programs, and administrators to manage the system.

## Demo User Accounts

The following user IDs are provided as demo accounts for testing and demonstration purposes:

### Admins
- 4

### Teachers
- 101
- 102

### Students
- 1000
- 1001
- 1002
- 1003
- 1004
- 1005
- 1006
- 1007

**Note:** All demo users have the password "Test1234".

## Class and Exam IDs

Use the following IDs to control and edit certain features:

### Classes
- 10002
- 10003

### Exams
- 1
- 2
- 3

### Technologies Used

The following technologies are used to develop the backend server:

- bcrypt
- compression
- cors
- dotenv
- express
- express-validator
- helmet
- http-status-codes
- jsonwebtoken
- mongoose
- mongoose-sequence
- morgan
- multer

### Project Overview

The project includes the following features:

- Teachers can create programs for their classes.
- Students can view the programs assigned to their classes.
- Administrators can manage the system.
- Each user type has their own page with relevant information.
- The web application can be accessed at https://digital-school-d3f59.web.app/. 

To run the project locally, clone the repository and run `npm install` to install the dependencies. You will also need to set up a MongoDB database and set the appropriate environment variables in a `.env` file. Finally, run `npm start` to start the server.
