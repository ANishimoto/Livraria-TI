//Imports
    const IStrategy = require("../../IStrategy");
    const Person = require("../../../../Models/Domain/Person");

//Class for Validation of the Birth Date
    class ValBirthDate extends IStrategy{
        process(entity){
            let sb = "";
            if(entity instanceof Person){
                if(entity.getBirth() != null && entity.getBirth().trim() != ""){
                    let birth = entity.getBirth().split("-");
                    if(birth.length == 3){
                        if  (   
                                birth[0].length != 4 ||
                                birth[1].length != 2 ||
                                birth[2].length != 2
                            ){
                                sb += "Data digitada não combina com a máscara!\n";
                        }
                        else {
                            if  (   
                                    isNaN(birth[0]) ||
                                    isNaN(birth[1]) ||
                                    isNaN(birth[2])
                                ){
                                sb += "Data digitada não é válida!\n";
                            }
                            else {
                                if (new Date(parseInt(birth[0]),parseInt(birth[1]),parseInt(birth[2])) >= Date.now()){
                                    sb += "Data digitada não é válida!\n";
                                };
                            };
                        };
                    }
                    else {
                        sb += "Data digitada não combina com a máscara!\n";
                    };
                }
                else{
                    sb += "É obrigatório o preenchimento da Data de Nascimento!\n";
                };
            }
            else{
                sb += "Não foi possível validar, pois a entidade não é uma Pessoa!\n";
            };
            return sb;
        };
    };

//Exports
    module.exports = new ValBirthDate();