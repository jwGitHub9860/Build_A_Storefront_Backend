# Storefront Backend Project

This project is an API that provide all the functionality needed for an online store. The project aims to provide a real-world scenario in which the developer must build the backend of an online store to make a company's great product ideas available for purchase. The project will include the requirement in the _REQUIREMENTS.md_ file and the RESTful API will display information to the frontend developer with full testing coverage.

## Creation Date

> 4/8/2026

## Project Status

> Active

## How to Install and Run the Project
1. Open **Terminal**
2. Input the command below into the terminal to switch to the _postgres_ user
```
su postgres
```
3. Input the command below into the terminal to start _psql_
```
psql postgres
```
4. _If Steps 1-3 fail,_ open **SQL Shell (psql)**
5. Input the following <ins>psql connection parameters</ins> to enable use of _SQL Shell (psql)_: **Server**, **Database**, **Username**, **Password**
6. Input the command below into the terminal to create a new user for project
```
CREATE USER shopping_user WITH PASSWORD 'password123';
```
7. Input the command below into the terminal to create new database
```
CREATE DATABASE shopping;
```
8. Input the command below into the terminal to connect to _shopping_ database as _postgres_ user
```
\c shopping
```
9. Input the command below into the terminal to grant **shopping_user** user all privileges to _shopping_ database
```
GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
```
10. Input the command below into the terminal to test if _Steps 5-8_ work
```
\dt
```
The following output should be displayed: **No relations found** or **Did not find an relations.**

11. Open **Visual Studio Code**
12. Open terminal in **Visual Studio Code**
13. Input the command below into the terminal to install **yarn** and enable **yarn** commands to be run in _Visual Studio Code_
```
npm install yarn -g
```
14. Input the commands below into the terminal to install **db-migrate** and **db-migrate-pg** and enable **db-migrate** commands to be run in _Visual Studio Code_
```
npm install db-migrate -g
npm install db-migrate-pg
```
15. Input the command below into the terminal to check _node version_
```
node -v
```
16. _If node is below 10 or 12_, run the following commands to update the _node version_
```
npm install -g n
n 10.18.0
PATH="$PATH"
node -v
```
17. Input the command below into the terminal to install the required packages and create the node modules folder
```
yarn
```
18. Input the command below into the terminal to start the server initially
```
yarn watch
```
19. _If the previous commands fails_, input the command below into the terminal to start the server initially
```
yarn watch --ignoreConfig
```
20. Hit ```Ctrl+c``` to exit the ```yarn watch --ignoreConfig``` command
21. Input the command below into the terminal to run migrations
```
db-migrate up
```
22. _If the following error appears after running the previous command: ```[ERROR] AssertionError [ERR_ASSERTION]: ifError got unwanted exception: permission denied for schema public```,_ open **SQL Shell (psql)**
23. Input the command shown below to fix the **assertion error**
```
GRANT USAGE, CREATE ON SCHEMA public TO shopping_user;
```

24. Reopen **SQL Shell (psql)**
25. Input the command below to ensure that the "**orders**", "**products**", "**user_orders**", and "**users**" tables are created in the _shopping_ database
```
\dt
```
26. Input the commands shown below to ensure that the "**users**", "**orders**", and "**products**" tables are empty
```
SELECT * FROM users;
SELECT * FROM orders;
SELECT * FROM products;
```
27. _If "username" and "password_digest" columns are missing from the "users" table_, input each command below to add the "**username**" and "**password_digest**" columns
```
ALTER TABLE users ADD COLUMN username VARCHAR(64) NOT NULL;
ALTER TABLE users ADD COLUMN password_digest VARCHAR(64) NOT NULL;
```
The following output will confirm "**username**" column creation: **ALTER TABLE**

28. _If "password" column is present in "users" table_, input the command below to remove the "**password**" column
```
ALTER TABLE users DROP COLUMN password;
```
The following output will confirm "**password**" column deletion: **ALTER TABLE**

29. Input the command below to ensure that the "**users**" table has the "**username**" column
```
SELECT * FROM users;
```
30. Input the command below to input the data into the "**users**" table
```
INSERT INTO users (firstName, lastName, username, password) VALUES ('John', 'Doe', 'userJohn', 'password123');
```
The following output will confirm "**users**" new data addition: **INSERT 0 1**
31. Repeat _Step 29_ using the commands below to input the rest of the data into the "**users**" table
```
INSERT INTO users (firstName, lastName, username, password) VALUES ('Jane', 'Doe', 'userJane', 'password123');
INSERT INTO users (firstName, lastName, username, password) VALUES ('Dane', 'Jerry', 'userDane', 'password123');
INSERT INTO users (firstName, lastName, username, password) VALUES ('Dana', 'Jamie', 'userDana', 'password123');
```
The following output will confirm "**username**" column creation: **ALTER TABLE**


## How to Use the Project
1. _If Visual Studio Code is <ins>not open</ins>,_ skip to _Step 4_
2. Open **Visual Studio Code**
3. Open terminal in **Visual Studio Code**
4. Input the following command into the terminal to test the project
```
npm test
```
5. Input the following command into the terminal to run the project
```
npm start
```
The following output should display that the project is running on ```port 3000``` in the _Visual Studio Code_ terminal while the project is running.

2. Open **Postman**
3. _If collection does not exist,_ create new collection to hold requests
4. _If there are no requests,_ create new request
5. Input one of the following URL options into the respective requests

**<ins>Home Request:</ins>** (**GET** request)
```
http://localhost:3000/
```
**<ins>Product Index Route:</ins>** (**GET** request)
```
http://localhost:3000/products
```
**<ins>Product Show Route:</ins>** (**GET** request)
```
http://localhost:3000/products/2
```
"**1**" _should not be used as ID value since it is used for tests in Visual Studio Code._

**<ins>Product Create Route:</ins>** (**POST** request)
```
http://localhost:3000/products
```
**<ins>Product Delete Route:</ins>** (**DELETE** request)
```
http://localhost:3000/products/1
```

**<ins>Order Index Route:</ins>** (**GET** request)
```
http://localhost:3000/products
```
**<ins>Order Show Route:</ins>** (**GET** request)
```
http://localhost:3000/products/1
```
**<ins>Order Create Route:</ins>** (**POST** request)
```
http://localhost:3000/products
```
**<ins>Order Delete Route:</ins>** (**DELETE** request)
```
http://localhost:3000/products/1
```

**<ins>User Index Route:</ins>** (**GET** request)
```
http://localhost:3000/products
```
**<ins>User Show Route:</ins>** (**GET** request)
```
http://localhost:3000/products/1
```
**<ins>User Create Route:</ins>** (**POST** request)
```
http://localhost:3000/products
```
**<ins>User Delete Route:</ins>** (**DELETE** request)
```
http://localhost:3000/products/1
```
**<ins>Current Order by User Route:</ins>** (**GET** request)
```
http://localhost:3000/users/:userID/orders/:orderID/products
```

6. Hit the **"Send"** button to send the request


## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!

## Challenges Faced During Project

One challenge that was faced was running the ```yarn watch``` command for the inital code of the project to ensure that the starter was working. This challenge was overcome by running the command shown below in the _Visual Studio Code terminal_:
```
yarn add typescript@latest -D
```
This was the solution given by **Ananta** in _Knowledge, Udacity_.


## Udacity Mentors Who Have Answered Questions In Knowledge To Help With Project
- Ananta

## Languages

**Docker**

<p align="left"> <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a> </p>

**Express**

<a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img width="114" height="40" alt="express_logo" src="https://github.com/user-attachments/assets/922b7eb3-f9a5-45d8-add7-e73f07cff732" /> </a> 

**Jasmine**

<a href="https://jasmine.github.io/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/jasmine/jasmine-icon.svg" alt="jasmine" width="40" height="40"/> </a>

**JavaScript**

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>

**Node.js**

<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img width="59" height="49" alt="node_js_logo" src="https://github.com/user-attachments/assets/bc05c6f4-2ccb-41ab-a499-d0cdee52540f" /> </a>

**PostgreSQL**

<p align="left"> <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> </p>

**TypeScript**

<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a>


## Tools

**Visual Studio Code** - The application software where the project is edited.

<p align="left"> <img width="43" height="46" alt="VSCode_logo" src="https://github.com/user-attachments/assets/0f8d15c4-276a-46ef-92cd-80a2f1958e76" /> </p>

**GitHub Desktop** - The application software that gives access to the project from _GitHub_ and allows it to be edited in _Visual Studio Code_.

<p align="left"> <img width="46" height="46" alt="GitHub_Desktop_logo" src="https://github.com/user-attachments/assets/bbd2a72d-0953-499e-ab28-e55b11171b83" /> </p>

**Postman** - The application software where the project is run.

<img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/>

**ChatGPT** - The application software that answers specific questions of why project has specific problems or why project failed to achieve intended results.

<p align="left"> <img width="49" height="42" alt="ChatGPT_logo" src="https://github.com/user-attachments/assets/34fd410d-3e92-4fc6-8dc7-1be521a8d2a6" /> </p>


## Credits
###### References used while making project

Danyow, Jeremy, et al. “Is Jasmine Supposed to Execute Specs in the Order They Are Declared or in a Random Order?” _Stack Overflow_, stackoverflow.com/#organization, 5 May 2015, stackoverflow.com/questions/30051693/is-jasmine-supposed-to-execute-specs-in-the-order-they-are-declared-or-in-a-rand#:~:text=3%20Answers,4. Accessed 23 Apr. 2026.

“GitHub Profile README Generator.” _GitHub Profile Readme Generator | GitHub Profile Readme Generator_, rahuldkjain.github.io/gh-profile-readme-generator/. Accessed 8 Apr. 2026.

“Make a README.” _GitHub_, GitHub, www.makeareadme.com/. Accessed 8 Apr. 2026.

“MLA Works Cited: Electronic Sources (Web Publications).” _MLA Works Cited: Electronic Sources - Purdue OWL® - Purdue University_, owl.purdue.edu/owl/research_and_citation/mla_style/mla_formatting_and_style_guide/mla_works_cited_electronic_sources.html. Accessed 8 Apr. 2026.

Nyakundi, Hillary. “How to Write a Good README File for Your GitHub Project.” _freeCodeCamp.Org_, freeCodeCamp.org, 8 Dec. 2021, www.freecodecamp.org/news/how-to-write-a-good-readme-file/. Accessed 8 Apr. 2026.

Oscalation, and Erwin Brandstetter. “Only Permit Specific Values in Postgresql Column.” Edited by User330315, _Stack Overflow_, stackoverflow.com/#organization, 1 Jan. 1963, stackoverflow.com/questions/55288282/only-permit-specific-values-in-postgresql-column#:~:text=To%20only%20permit%20specific%20values%20in%20a,*%20Using%20an%20ever%2Dexpanding/dynamic%20set%20of%20values. Accessed 10 Apr. 2026.

seattleguy, and Yousaf. “Reset a Database before Each Test.” Stack Overflow, https://stackoverflow.com/#organization, 7 Oct. 2019, stackoverflow.com/questions/58274004/reset-a-database-before-each-test. Accessed 23 Apr. 2026.

UAnjali. “Nd0067-C2-Creating-an-Api-with-Postgresql-and-Express-Project-Starter.” _GitHub_, Udacity, 2022, github.com/udacity/nd0067-c2-creating-an-api-with-postgresql-and-express-project-starter. Accessed 8 Apr. 2026.

“Udacity Git Commit Message Style Guide.” _Udacity Nanodegree Style Guide_, udacity.github.io/git-styleguide/. Accessed 15 Mar. 2026.

## License

[License](LICENSE.txt)
