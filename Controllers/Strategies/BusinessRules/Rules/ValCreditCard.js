//Imports
    const IStrategy = require("../../IStrategy");
    const CreditCard = require("../../../../Models/Domain/CreditCard");
    const CompDate = require("./CompDate");

//Class for Validation of the Business Rule: RN0026 - Dados obrigatórios para o cadastro de um cliente - Cartão de Crédito
    class ValCreditCard extends IStrategy{
        async process(entity){
            let sb = "";
            if(entity instanceof CreditCard){
                if(entity.getPrintedName() == null || entity.getPrintedName().trim() == ''){
                    sb += "Campo Nome Impresso no Cartão é obrigatório!\n";
                }
                if(entity.getNumber() == null || isNaN(entity.getNumber()) || entity.getNumber().trim() == ''){
                    sb += "Campo Número do Cartão é obrigatório!\n";
                }
                if(entity.getSecureCode() == null || isNaN(entity.getSecureCode()) || entity.getNumber().trim() == ''){
                    sb += "Campo Código de Segurança é obrigatório!\n";
                }
                if(entity.getCompany() == null || isNaN(entity.getCompany().getId())){
                    sb += "É obrigatório selecionar a Bandeira!\n";
                }
            }
            else{
                sb += "Não foi possível validar, pois a entidade não é um Cartão de Crédito!\n";
            };
            sb += await CompDate.process(entity);
            return sb;
        };
    };

//Exports
    module.exports = new ValCreditCard();