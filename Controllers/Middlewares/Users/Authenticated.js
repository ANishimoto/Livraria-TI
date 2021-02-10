//Middleware Function
    function Authenticated(req, res, next){
        if(req.session.user != undefined){ //Continue if have a session
            next();
        }
        else{ //Return to the login page if not authenticated
            res.redirect("/signin"); 
        }
    }

//Exports
    module.exports = Authenticated;