//Imports
    const IViewHelper = require("./IViewHelper");
    const Result = require("../../Models/Util/Result");
    const User = require("../../Models/Domain/User");

//ViewHelper of Clients
    class VHUser extends IViewHelper {
        getEntity(req) {
            let email = req.body.email;
            let password = req.body.password;
            let result = new Result();
            let user = new User();
            user.setEmail(email);
            user.setPassword(password);
            result.setEntities(user);
            return result;
        };

        setView(result, req, res){
            let operation = req.body.button;
            let status = result.getMsg().split(" ");
            if(status == "200"){
                res.redirect("/signin");
            }  			
            else{
                res.redirect("/signin");
            };
        };
    };

//Exports
    module.exports = new VHUser();