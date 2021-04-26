//Imports
    //Frameworks
        const express = require("express");
        const app = express();
        const bodyParser = require("body-parser");
        const session = require("express-session");
        const bcrypt = require("bcryptjs");
        
    //Routes
        const ClientsController = require("./Routes/Clients/ClientRoutes");
        const UsersController = require("./Routes/Users/UserRoutes");
        const AdmController = require("./Routes/Adm/AdmRoutes");

    //Commands
        const CreateCommand = require("./Commands/CreateCommand");

    //Domain Classes
        const User = require("../Models/Domain/User");

//JWT's config
    const JWT_key = require("./Configs/JWT");

//Config the folder of the Statics Files
    app.use(express.static("Views/Statics"));

//Config of the express-session
    app.use(session({
        secret: "q1w2e3r4t5",                       //Secret Key
        cookie: {maxAge: (2 * 60 * 60 * 1000)},     //Time until expire in milliseconds
        resave: true,
        saveUninitialized: false
    }));

//Define EJS as the View Engine
    app.set("view engine", "ejs");

//Body-parser's config
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

//Routes
    //Controllers
        app.use("/", ClientsController);
        app.use("/", UsersController);
        app.use("/", AdmController);

    //Home Page
        app.get("/", (req, res) => {
            res.render("../Views/index.ejs");
        });

    //Create User Route - Test
        app.post("/teste", async (req, res) => {
            let command = new CreateCommand();
            let salt = bcrypt.genSaltSync(10);
            let user = new User();
            user.setEmail(req.body.email);
            user.setPassword(bcrypt.hashSync(req.body.password, salt));
            user.getUserType().setId(1);
            let data = await command.execute(user);
            res.redirect("/");
        });
    
    //JWT Test Route
        app.get("/teste", (req,res) => {
            jwt.verify(req.session.user.auth, key.get(1),  (err, data) => {
                if(err){
                    console.log("1");
                    res.status(401);
                    res.json({err: "Token inválido!"});
                }else{
                    console.log("2")
                    res.redirect("/");
                };
            });
        });

//Config Server
    app.listen(8080, () => {
        console.log("Server on!");
    });
