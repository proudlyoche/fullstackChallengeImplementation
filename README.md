## Challenge React-Redux, TypeScript & Node.js Application

This project is a simple frontend react-redux and backend node.js api server application.
Below are steps required to reproduce and run the application.

---

## NodeJS

- #### Version

      $ node --version
      14.17.3

      $ npm --version
      6.14.8

      $ typescript --version
      4.1.2

- #### Steps to run nodejs server api in **development**

  - Clone repo : https://github.com/proudlyoche/fullstackChallengeImplementation.git
  - cd backend
  - yarn install
  - yarn run devop

- #### Steps to run nodejs server api in **production**

  - Clone repo : https://github.com/proudlyoche/fullstackChallengeImplementation.git
  - cd backend
  - yarn install
  - yarn run devop
  - yarn run start

if server successfully starts, you should see the output below in your terminal

    Server running on http://127.0.0.1:4455 (this is the default route in development mode, it can be changed in the config folder)
    Database is linked and running.

- #### Environment variables

  Environmental variebles can be edited in config folder

  - port required by the application
  - Database connection string

- #### Testing API in Postman

      For POST or PUT requests, you can input data in any of these sections in the body tab
        - raw
        - x-www-form-urlencoded

- #### Libraries - Unit Testing

      The following test libraries were used for writing the test cases:
        - chai
        - chai-http
        - mocha

- #### Warning - Unit Testing

      For the test to be successfull, do not delete users with the following emails:
      - **test@test.com**
      - **test2@test.com**

- #### Test Cases - Unit Testing

  - Create User
  - Update User
  - Get Users
  - Email Duplication Test
    **Steps to replicate**
    - cd backend
    - yarn install
    - yarn run devop
    - yarn run test

- #### Recommendations - Unit Testing

  In this test project, production database was used in testing (can be edited from the config). it is recommended to have a testing database different from the actual db, or to use libraries.

- #### Bugs Encoutered

  There were no major bugs encountered

- #### OpenAPI / Swagger Documentation

The Swagger library was used to document api routes, requests and responses. See link below:
**Swagger Url:** `http://127.0.0.1:4455/api-docs/`

---

## ReactJS

- #### Version

      $ react --version
      17.0.2

      $ redux --version
      7.2.4

      $ typescript --version
      4.1.2

- #### Steps to run reactjs frontend application

  - Clone repo : https://github.com/proudlyoche/fullstackChallengeImplementation.git
  - cd frontend
  - yarn install
  - npm yarn start
  

if application starts successfully, default browser will be lauched and a list of users will be displayed in a table

- #### Architecture Pattern

  Redux/Flux architecture was used along side Redux Toolkit. Redux Toolkit is the new standard of writing redux code, it helps to keep redux code less complicated, it also helps to reduce adding too many packages.

- #### UI Library

  - ReactStrap
  - Toastify
  - SweetAlert
