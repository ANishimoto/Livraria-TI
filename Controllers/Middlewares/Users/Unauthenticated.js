//Imports
    //JWT's config
        const JWT_key = require("../../Configs/JWT");

    const jwt_decode = require("jwt-decode");
    const jwt = require("jsonwebtoken");

//Middleware Function
    function UnauthenticatedClient(req, res, next){
        if(req.session.authorization == undefined){ //Continue if don't have a token
            next();
        }
        else{ //Return to the login page if authenticated
            let decoded = jwt_decode(req.session.authorization.token);
            jwt.verify(req.session.authorization.token, JWT_key.get(decoded.typeId),  (err, data) => {
                if(err){
                    next();
                }else{
                    res.redirect("/");
                };
            });
        }
    }

//Exports
    module.exports = UnauthenticatedClient;