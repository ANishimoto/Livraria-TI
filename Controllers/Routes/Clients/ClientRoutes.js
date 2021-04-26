//Imports
    //Frameworks
        const express = require("express");
        const router = express.Router();
        const bcrypt = require("bcryptjs");
        const jwt_decode  = require('jwt-decode');

    //Domain Classes
        const Client = require("../../../Models/Domain/Client");
        const CreditCardCompany = require("../../../Models/Domain/CreditCardCompany");
        const ResidenceType = require("../../../Models/Domain/ResidenceType");
        const PublicPlaceType = require("../../../Models/Domain/PublicPlaceType");
        const Gender = require("../../../Models/Domain/Gender");
        const PhoneType = require("../../../Models/Domain/PhoneType");

    //Util Classes
        const Result = require("../../../Models/Util/Result");

    //View Helpers
        const VHClient = require("../../../Views/ViewHelpers/VHClient");

    //Commands
        const SearchCommand = require("../../Commands/SearchCommand");
        const CreateCommand = require("../../Commands/CreateCommand");

    //Middlewares
        const Auth = require("../../Middlewares/Users/Authenticated");
        const Unauth = require("../../Middlewares/Users/Unauthenticated");

//Global Configurations
    var searchCommand = new SearchCommand();
    var result = new Result();
    var genders = [];
    var phone_types = [];
    var residence_types = [];
    var public_places_types = [];
    var companies = [];

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

        //Get from DataBase the Residences' Types
            result = await searchCommand.execute(new ResidenceType());
            for (const type of result.getEntities()) {
                residence_types.push(
                    {
                        option: type.getDescription(),
                        id: type.getId()
                    }
                );
            };

        //Get from DataBase the Public Places' Types
            result = await searchCommand.execute(new PublicPlaceType());
            for (const type of result.getEntities()) {
                public_places_types.push(
                    {
                        option: type.getDescription(),
                        id: type.getId()
                    }
                );
            }

        //Get from DataBase the Credit Cards' Companies
            result = await searchCommand.execute(new CreditCardCompany());
            for (const company of result.getEntities()) {
                companies.push(
                    {
                        option: company.getDescription(),
                        id: company.getId()
                    }
                );
            };
    };
    GlobalConfig();

//Routes
    //Client Registration Route
        router.get("/join", Unauth, (req, res, next) => {
            res.render("../Views/Clients/create.ejs", {genders, phone_types, residence_types, public_places_types, companies});
        });

    //Client Create Route
        router.post("/client", Unauth, async (req, res, next) => {
            let vh = new VHClient()
            let result = vh.getEntity(req);
            let client = result.getEntities();
            client.getClientType().setId(1);
            client.getUser().getUserType().setId(1);
            let command = new CreateCommand();
            let msg = await command.execute(client);
            
            res.redirect("/signin");
        });

    //Client Information Edition Page Route
        router.get("/profile", Auth, async (req, res, next) => {
            let client = new Client();
            let command = new SearchCommand();
            var decoded = jwt_decode(req.session.authorization.token);
            client.getUser().setId(decoded.id);
            client.getUser().getUserType().setId(decoded.typeId);
            let data = await command.execute(client);
            if(data.getEntities().length > 0) {
                let entity = data.getEntities();
                let document_cpf = entity[0].getDocuments().find(element => element.getDocumentType().getName() == "CPF");
                let cpf = "";
                if(document_cpf.getCode() != null && !isNaN(document_cpf.getCode().trim())){
                    cpf = "***" + document_cpf.getCode().substr(3,6) + "**";
                };
                let clientJson =    {
                    name: entity[0].getName(),
                    birth: entity[0].getBirth(),
                    gender: {
                                id: entity[0].getGender().getId()
                            },
                    cpf: cpf,
                    user:   { 
                                email: entity[0].getUser().getEmail()
                            },
                    phones: [
                                
                            ],
                    addresses:  [

                                ],
                    creditCards:    [

                                    ]
                    };
                for (const phone of entity[0].getPhones()) {
                    let phoneJson = {
                                        type:   {
                                                    id: phone.getPhoneType().getId()
                                                },
                                        id: phone.getId(),
                                        ddd: phone.getDDD(),
                                        number: phone.getNumber()
                                    };  
                    clientJson.phones.push(phoneJson);
                };
                for (const address of entity[0].getAddresses()) {
                    let addressJson = {
                                        type:   {
                                                    id: address.getAddressType().getId()
                                                },
                                        publicPlace:    {
                                                            type:   {
                                                                        id: address.getPublicPlaceType().getId()
                                                                    },
                                                            description: address.getPublicPlace()
                                                        },
                                        residence:  {
                                                        id: address.getResidenceType().getId()
                                                    },
                                        id: address.getId(),
                                        number: address.getNumber(),
                                        cep: address.getCep(),
                                        city: address.getCity().getDescription(),
                                        state: address.getCity().getState().getDescription(),
                                        country: address.getCity().getState().getCountry().getDescription(),
                                        complement: address.getComplement(),
                                        neighborhood: address.getNeighborhood()
                                    };  
                    clientJson.addresses.push(addressJson);
                };
                for (const creditCard of entity[0].getCreditCards()) {
                    let secCode = "";
                    if(creditCard.getSecureCode() != null && !isNaN(creditCard.getSecureCode().trim())){
                        secCode = "*" * creditCard.getSecureCode().length;
                    };
                    let creditCardJson = {
                                        company:    {
                                                        id: creditCard.getCompany().getId()
                                                    },
                                        id: creditCard.getId(),
                                        number: creditCard.getNumber(),
                                        printedName: creditCard.getPrintedName(),
                                        secureCode: secCode
                                    };  
                    clientJson.creditCards.push(creditCardJson);
                };
                res.render("../Views/Clients/profile.ejs", {genders, phone_types, residence_types, public_places_types, companies, clientJson});
            }
            else{
                res.redirect("/signin");
            };
        });
        
//Exports
    module.exports = router;