//Imports
    const IStrategy = require("../../IStrategy");
    const Person = require("../../../../Models/Domain/Person");
    const ValBirthDate = require("./ValBirthDate");

//Class for Validation of the Birth Date
    class ValPersonAttributes extends IStrategy{
        async process(entity){
            let sb = "";
            if(entity instanceof Person){
                let sb = '';
                if (entity.getName() == null || entity.getName().trim() == ''){
                    sb += "Campo Nome é obrigatório!\n";
                };
                if (entity.getGender().getId() == null || isNaN(entity.getGender().getId())){
                    sb += "Campo Gênero é obrigatório!\n";
                };
                sb += await ValBirthDate.process(entity);
                
                return sb;
            }
            else{
                sb += "Não foi possível validar, pois a entidade não é uma Pessoa!\n";
            };
            return sb;
        };
    };

//Exports
    module.exports = new ValPersonAttributes();