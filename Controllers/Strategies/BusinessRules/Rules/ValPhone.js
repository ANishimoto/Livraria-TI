//Imports
    const IStrategy = require("../../IStrategy");
    const Phone = require("../../../../Models/Domain/Phone");
    const CompDate = require("./CompDate");

//Class for Validation of the Business Rule: RN0026 - Dados obrigatórios para o cadastro de um cliente - Telefone
    class ValPhone extends IStrategy{
        async process(entity){
            let sb = "";
            if(entity instanceof Phone){
                if(entity.getDDD() == null || isNaN(entity.getDDD())){
                    sb += "Campo DDD é obrigatório!\n";
                }
                if(entity.getNumber() == null || isNaN(entity.getNumber())){
                    sb += "Campo Número do Telefone é obrigatório!\n";
                }
                if(entity.getPhoneType().getId() == null || isNaN(entity.getPhoneType().getId())){
                    sb += "Campo Tipo do Telefone é obrigatório!\n";
                }
            }
            else{
                sb += "Não foi possível validar, pois a entidade não é um Telefone!\n";
            };
            sb += await CompDate.process(entity);
            return sb;
        };
    };

//Exports
    module.exports = new ValPhone();