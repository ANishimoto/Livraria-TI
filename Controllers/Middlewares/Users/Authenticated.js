//Imports
    //JWT's config
        const JWT_key = require("../../Configs/JWT");

    const jwt_decode = require("jwt-decode");
    const jwt = require("jsonwebtoken");

//Middleware Function
    function Authenticated(req, res, next){
        if(req.session.authorization != undefined){ //Continue if have a token
            if(req.session.authorization.token != undefined){
                let decoded = jwt_decode(req.session.authorization.token);
                jwt.verify(req.session.authorization.token, JWT_key.get(decoded.typeId),  (err, data) => {
                    if(err){
                        res.redirect("/signin");
                    }else{
                        next();
                    };
                });
            }
            else{
                res.redirect("/signin");
            };
        }
        else{ //Return to the login page if not authenticated
            res.redirect("/signin"); 
        };
    };

//Exports
    module.exports = Authenticated;