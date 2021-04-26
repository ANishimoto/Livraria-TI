//Imports
    const IStrategy = require("../../IStrategy");
    const ValEmail = require("./ValEmail");
    const ValPassword = require("./ValPassword");
    const CompDate = require("./CompDate");

//Class for Validation of the Business Rule: RN00XX
    class ValUser extends IStrategy{
        async process(entity){
            let sb = '';
            sb += await ValEmail.process(entity);
            sb += await ValPassword.process(entity);
            sb += await CompDate.process(entity);
            return sb;
        };
    };

//Exports
    module.exports = new ValUser();