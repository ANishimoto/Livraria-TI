//Imports
    //Frameworks
        const express = require("express");
        const app = express();
        const bodyParser = require("body-parser");
        const jwt = require("jsonwebtoken");
        const session = require("express-session");

    //Routes
        const ClientsController = require("./Routes/Clients/ClientRoutes");
        const UsersController = require("./Routes/Users/UserRoutes");

//Config the folder of the Statics Files
    app.use(express.static("Views/Statics"));

//Config of the express-session
    app.use(session({
        secret: "q1w2e3r4t5",               //Secret Key
        cookie: {maxAge: (3 * 60 * 1000)},  //Time until expire in milliseconds
        resave: true,
        saveUninitialized: false
    }));

//Define EJS as the View Engine
    app.set("view engine", "ejs");

//Config of the body-parser
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

//Routes
    //Controllers
        app.use("/", ClientsController);
        app.use("/", UsersController);

    //Home Page
        app.get("/", (req, res) => {
            res.render("../Views/index.ejs");
        });

//Config Server
    app.listen(8080, () => {
        console.log("Server on!");
    });
