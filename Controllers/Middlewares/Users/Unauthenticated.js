//Middleware Function
    function Unauthenticated(req, res, next){
        if(req.session.user == undefined){ //Continue if don't have a session
            next();
        }
        else{ //Return to the login page if authenticated
            res.redirect("/"); 
        }
    }

//Exports
    module.exports = Unauthenticated;