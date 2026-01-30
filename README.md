<h1 align="center">Room Booking System Backend API</h1>

This API is created by me for portofolio that will be used as backend for my app, Room Booking System. This API use Express as Nodejs framework and MySQL as store database. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-5.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.23.x-green.svg?style=rounded-square)](https://nodejs.org/)


## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name #nama_database, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](https://documenter.getpostman.com/view/14780095/2sBXVo98AG)
9. Type `npm start` to activated the server.

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
SERVER_PORT = <YOUR APP SERVER PORT>
DATABASE_HOST= <YOUR DATABASE HOST>
DATABASE_USERNAME= <YOUR DATABASE USERNAME>
DATABASE_PASSWORD= <YOUR DATABASE PASSWORD>
DATABASE_NAME= <YOUR DATABASE NAME>
JWT_SECRET_KEY = <YOUR JWT SECRET KEY>
JWT_EXPIRE_TIME = <YOUR JWT EXPIRE TIME>
```

## Feature

1. Login and Register API
2. Admin API :
    1. Users
    2. Workspaces
    3. Rooms
    4. Bookings
    5. Transactions
    6. Profile
3. User API :
    1. Workspaces (Get Workspaces and Workspace Detail)
    2. Rooms (Get Rooms Filter By Workspace and Room Detail)
    3. Bookings (Get Bookings by User, Booking Detail, and Create Booking)
    4. Transactions (Get Transactions By User and Transaction Detail)
    5. Profile (Profile Detail and Update Profile)

## License

© [Muhammad Akbar Saladin Siregar](https://github.com/akbarsaladin36/)
