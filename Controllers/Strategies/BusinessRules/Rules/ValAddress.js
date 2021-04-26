//Imports
    const IStrategy = require("../../IStrategy");
    const Address = require("../../../../Models/Domain/Address");
    const CompDate = require("./CompDate");

//Class for Validation of the Business Rule: RN0026 - Dados obrigatórios para o cadastro de um cliente - Endereço
    class ValAddress extends IStrategy{
        async process(entity){
            let sb = "";
            if(entity instanceof Address){
                if(entity.getPublicPlace() == null || entity.getPublicPlace().trim() == ""){
                    sb += "Campo Logradouro é obrigatório!\n";
                }
                if(entity.getNumber() == null || entity.getNumber().trim() == ""){
                    sb += "Campo Número do Endereço é obrigatório!\n";
                }
                if(entity.getCep() == null || entity.getCep().trim() == ""){
                    sb += "Campo CEP é obrigatório!\n";
                }
                if(entity.getCity().getDescription() == null || entity.getCity().getDescription().trim() == ""){
                    sb += "Campo Cidade é obrigatório!\n";
                }
                if(entity.getCity().getState().getDescription() == null || entity.getCity().getState().getDescription().trim() == ""){
                    sb += "Campo Estado é obrigatório!\n";
                }
                if(entity.getCity().getState().getCountry().getDescription() == null || entity.getCity().getState().getCountry().getDescription().trim() == ""){
                    sb += "Campo País é obrigatório!\n";
                }
                if(entity.getResidenceType().getId() == null || isNaN(entity.getResidenceType().getId())){
                    sb += "Campo Tipo da Residência é obrigatório!\n";
                }
                if(entity.getPublicPlaceType().getId() == null || isNaN(entity.getPublicPlaceType().getId())){
                    sb += "Campo Tipo do Logradouro é obrigatório!\n";
                }
                if(entity.getNeighborhood() == null || entity.getNeighborhood().trim() == ""){
                    sb += "Campo Bairro é obrigatório!\n";
                }
            }
            else{
                sb += "Não foi possível validar, pois a entidade não é um Endereço!\n";
            };
            sb += await CompDate.process(address);
            return sb;
        };
    };

//Exports
    module.exports = new ValAddress();