//Imports
    const IStrategy = require("../../IStrategy");
    const Employee = require("../../../../Models/Domain/Employee");
    const ValPhone = require("./ValPhone");
    const ValUser = require("./ValUser");
    const ValPersonAttributes = require("./ValPersonAttributes");

    class ValEmployeeAttributes extends IStrategy{
        async process(entity){
            let sb = "";
            if(entity instanceof Employee){
                sb += await ValUser.process(entity.getUser());
                sb += await ValPersonAttributes.process(entity);
                sb += await ValPhone.process(entity.getPhone());
            }
            else{
                sb += "Não foi possível validar, pois a entidade não é um Funcionário!\n";
            };
            return sb;
        };
    };

//Exports
module.exports = new ValEmployeeAttributes();
