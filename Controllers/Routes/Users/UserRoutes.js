//Imports
    //Frameworks
        const express = require("express");
        const router = express.Router();
        const path = require("path");

    //Domain Classes
        const User = require("../../../Model/Domain/User");

    //View Helpers
        const VHUser = require("../../../Views/ViewHelpers/VHUser");

    //Commands
        const SearchCommand = require("../../Commands/SearchCommand");

    //Middlewares
        const Auth = require("../../Middlewares/Users/Authenticated");
        const Unauth = require("../../Middlewares/Users/Unauthenticated");
    
//Routes
    //User Sign in Route
        router.get("/signin", Unauth, (req, res, next) => {
            res.sendFile("auth.html", { root: path.join(__dirname, '../../../Views/Users') });
        });

    //User Authenticate Route
        router.post("/authenticate", Unauth, async (req, res, next) => {
            let result = VHUser.getEntity(req);
            let user = result.getEntities();
            let command = new SearchCommand();
            let data = await command.execute(user);
            if(data.getEntities() != undefined){
                let entity = data.getEntities()
                if(entity.getEmail() == user.getEmail() && entity.getPassword() == user.getPassword()){
                    entity.setPassword(null);
                    req.session.user =  { 
                                            email : entity.getEmail(),
                                            id : entity.getId()
                                        };
                    res.redirect("/");
                }
                else{
                    res.redirect("/signin");
                };
            };
        });

    //User Sign out Route
        router.get("/signout", Auth, (req, res, next) => {
            req.session.user = undefined;
            res.redirect("/");
        });

//Exports
    module.exports = router;