//Imports
    const IStrategy = require("../../IStrategy");
    const User = require("../../../../Models/Domain/User");
    const Command = require("../../../Commands/SearchCommand");

//Class for Validation of the Business Rule: RN0026 - Dados obrigatórios para o cadastro de um cliente - E-mail
    class ValEmail extends IStrategy{
        async process(entity){
            let sb = "";
            if(entity instanceof User){
                if(entity.getEmail() == null || entity.getEmail().trim() == ""){
                    sb += "Campo Endereço de e-mail é obrigatório!\n";
                }
                else {
                    let command = new Command();
                    let data = await command.execute(entity);
                    if(data.getEntities()[0] != undefined){
                        sb += "Endereço de e-mail já se encontra cadastrado na base!\n";
                    };
                };
            }
            else{
                sb += "Não foi possível validar, pois a entidade não é um Usuário!\n";
            };
            return sb;
        };
    };

//Exports
    module.exports = new ValEmail();