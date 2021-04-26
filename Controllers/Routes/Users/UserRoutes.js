//Imports
    //Frameworks
        const express = require("express");
        const router = express.Router();
        const path = require("path");
        const jwt = require("jsonwebtoken");
        const bcrypt = require("bcryptjs");

    //View Helpers
        const VHUser = require("../../../Views/ViewHelpers/VHUser");

    //Commands
        const SearchCommand = require("../../Commands/SearchCommand");
        const CreateCommand = require("../../Commands/CreateCommand");

    //Middlewares
        const Auth = require("../../Middlewares/Users/Authenticated");
        const Unauth = require("../../Middlewares/Users/Unauthenticated");
        
    //JWT's config
        const JWT_key = require("../../Configs/JWT");

    //Strategies
        const GenerateLink = require("../../Strategies/ResetPassword/GenerateLink");

//Routes
    //User Sign in Route
        router.get("/signin", Unauth, (req, res, next) => {
            res.sendFile("auth.html", { root: path.join(__dirname, '../../../Views/Users') });
        });

    //Forgot Password
        router.get("/forgot_password", Unauth, (req, res, next) => {
            res.sendFile("forgot_password.html", { root: path.join(__dirname, '../../../Views/Users') });
        });
/*
        router.post("/generate_reset_link", Unauth, async (req, res, next) => {
            let user = VHUser.getEntity(req).getEntities();
            let command = new SearchCommand();
            let data = await command.execute(user).getEntities()[0];
            if(data != undefined){
                let GenerateLink = GenerateLink();
                SendEmail.process(GenerateLink.process(data));
            };
            res.redirect("/");
        });
*/
    //User Authenticate Route
        router.post("/authenticate", Unauth, async (req, res, next) => {
            let result = VHUser.getEntity(req);
            let user = result.getEntities();
            let command = new SearchCommand();
            let data = await command.execute(user);
            if(data.getEntities().length > 0){
                let entity = data.getEntities();
                if(entity[0].getEmail() == user.getEmail() && bcrypt.compareSync(user.getPassword(),entity[0].getPassword())){
                    entity[0].setPassword(null);
                    jwt.sign({id: entity[0].getId(), typeId: entity[0].getUserType().getId()}, JWT_key.get(entity[0].getUserType().getId()), {expiresIn: "2h"},(err, token) => {
                        if(err){
                            res.status(400);
                            res.json({err: "Falha Interna!"});
                        }else{             
                            req.session.authorization = {
                                token : token
                            };
                            if (entity[0].getUserType().getId() == 1){
                               res.redirect("/profile");
                            };
                            if(entity[0].getUserType().getId() == 2){
                                res.redirect("/adm");
                            };
                        };
                    });
                };
            }
            else{
                res.redirect("/signin");
            };
        });

    //User Sign out Route
        router.get("/signout", Auth, (req, res, next) => {
            req.session.authorization = undefined;
            res.redirect("/");
        });

//Exports
    module.exports = router;