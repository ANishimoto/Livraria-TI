//Imports
    //Frameworks
        const express = require("express");
        const router = express.Router();

    //Domain Classes
        const Client = require("../../../Model/Domain/Client");
        const User = require("../../../Model/Domain/User");
        const CreditCardCompany = require("../../../Model/Domain/CreditCardCompany");
        const ResidenceType = require("../../../Model/Domain/ResidenceType");
        const PublicPlaceType = require("../../../Model/Domain/PublicPlaceType");
        const Sex = require("../../../Model/Domain/Sex");
        const PhoneType = require("../../../Model/Domain/PhoneType");

    //Util Classes
        const Result = require("../../../Model/Util/Result");

    //Commands
        const SearchCommand = require("../../Commands/SearchCommand");

    //Middlewares
        const Auth = require("../../Middlewares/Users/Authenticated");
        const Unauth = require("../../Middlewares/Users/Unauthenticated");
const { route } = require("../Users/UserRoutes");

//Global Configurations
    var searchCommand = new SearchCommand();
    var result = new Result();
    var sexs = [];
    var phone_types = [];
    var residence_types = [];
    var public_places_types = [];
    var companies = [];

    async function GlobalConfig() {

        result = await searchCommand.execute(new Sex());
        result.getEntities().forEach(sex => {
            sexs.push(
                {
                    option: sex.getName(),
                    id: sex.getId()
                }
            );
        });

        result = await searchCommand.execute(new PhoneType());
        result.getEntities().forEach(type => {
            phone_types.push(
                {
                    option: type.getName(),
                    id: type.getId()
                }
            );
        });

        result = await searchCommand.execute(new ResidenceType());
        result.getEntities().forEach(type => {
            residence_types.push(
                {
                    option: type.getName(),
                    id: type.getId()
                }
            );
        });

        result = await searchCommand.execute(new PublicPlaceType());
        result.getEntities().forEach(type => {
            public_places_types.push(
                {
                    option: type.getName(),
                    id: type.getId()
                }
            );
        });

        result = await searchCommand.execute(new CreditCardCompany());
        result.getEntities().forEach(company => {
            companies.push(
                {
                    option: company.getName(),
                    id: company.getId()
                }
            );
        });
    };
    GlobalConfig();

//Routes
    //Client Registration Route
        router.get("/join", Unauth, (req, res, next) => {
            res.render("../Views/Clients/create.ejs", {sexs, phone_types, residence_types, public_places_types, companies});
        });

    //Client Create Route
        router.post("client", Unauth, (req, res, next) => {
            
        });

    //Client Information Edition Page Route
        router.get("/profile", Auth, (req, res, next) => {
            let user = new User();
            user.setEmail(req.session.email);
            user.setId(req.session.id);
            res.render("../Views/Clients/profile.ejs", {sexs, phone_types, residence_types, public_places_types, companies});
        });//Auth,

//Exports
    module.exports = router;