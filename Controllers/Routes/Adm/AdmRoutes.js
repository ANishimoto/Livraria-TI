//Imports
    //Frameworks
        const express = require("express");
        const router = express.Router();
        const path = require("path");
        const jwt = require("jsonwebtoken");
        const bcrypt = require("bcryptjs");

    //Domain Classes
        const employee = require("../../../Models/Domain/Employee");
        const Gender = require("../../../Models/Domain/Gender");
        const PhoneType = require("../../../Models/Domain/PhoneType");

    //Util Classes
        const Result = require("../../../Models/Util/Result");

    //View Helpers
        const VHEmployee = require("../../../Views/ViewHelpers/VHEmployee");

    //Commands
        const SearchCommand = require("../../Commands/SearchCommand");
        const CreateCommand = require("../../Commands/CreateCommand");

    //Middlewares
        const Auth = require("../../Middlewares/Users/Authenticated");
        const Unauth = require("../../Middlewares/Users/Unauthenticated");
        
    //JWT's config
        const JWT_key = require("../../Configs/JWT");

//Global Configurations
    var searchCommand = new SearchCommand();
    var result = new Result();
    var genders = [];
    var phone_types = [];

    async function GlobalConfig() {

        //Get from DataBase the Genders' Types
            result = await searchCommand.execute(new Gender());
            for (const gender of result.getEntities()) {
                genders.push(
                    {
                        option: gender.getDescription(),
                        id: gender.getId()
                    }
                );
            };

        //Get from DataBase the Phones' Types
            result = await searchCommand.execute(new PhoneType());
            for (const type of result.getEntities()) {
                phone_types.push(
                    {
                        option: type.getDescription(),
                        id: type.getId()
                    }
                );
            };

    };
    GlobalConfig();

//Routes
    //Adm Painel Route
        router.get("/adm", Auth, (req, res, next) => {
            res.render("../Views/Admin/painel.ejs", {genders, phone_types});
        });

    //Employee Registration Route
        router.post("/adm/Employee", Auth, async (req, res, next) => {
            let vh = new VHEmployee;
            let result = vh.getEntity(req);
            let employee = result.getEntities();
            employee.getEmployeeType().setId(1);
            employee.getUser().getUserType().setId(2);
            let command = new CreateCommand();
            let msg = await command.execute(employee);
            res.statusCode = 200;
            res.send(msg.getMsg());
        });

//Exports
    module.exports = router;