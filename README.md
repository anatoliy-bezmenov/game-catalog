# Game catalog project

## Motivation
This project allows users to see a games list. Logged-in users can add new games to the list, edit their games and delete them. Anyone can read the details about a certain game they like.

## Features
    - Features 4 dynamic pages that fetch data from the back-end server, allowing their content to change according to
    the application state (excluding login and register).
    - Includes pages for listing games and games details.
    - Communicate to a remote service via REST.
    - All CRUD (create, read, update, delete) operations are implemented.
    - Has 7 routers (excluding the error page).
    - Has error handling and data validation to avoid crashes.
    - Has public and private parts. The private parts can only be accessed by logged-in users.

## How to install

```sh
git clone git@github.com:anatoliy-bezmenov/game-catalog.git
```

```sh
cd game-catalog
```

### Rest API Server
Open a terminal and run

```sh
cd games-rest-server
npm install
npm run start
```

After having successfully started the server, the server will start running on port 4000 and a database called "games" will be created, which will store 2 collections. One called "games" and another one called "users".

### Angular Web Application
Open another terminal and run

```sh
cd angular-project
npm install
npm run start
```

### Open with browser
http://localhost:4200