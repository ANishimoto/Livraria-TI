//Imports
    const IStrategy = require("../../IStrategy");
    const Command = require("../../../Commands/SearchCommand");
    const CreditCard = require("../../../../Models/Domain/CreditCard");

//Class for Validation of the Business Rule: RN0025 - Bandeiras permitidas para registro de cartões de crédito
    class ValCreditCardCompany extends IStrategy{
        async process(entity){
            let sb = "";
            if(entity instanceof CreditCard){
                if(entity.getCreditCardCompany().getId() != null && isNaN(entity.getCreditCardCompany().getId())){
                    let command = new Command();
                    let data = await command.execute(entity);
                    if(data == undefined){
                        sb += "Bandeira do Cartão Inválida ou não aceita pelo sistema!";
                    };
                }
                else{
                    sb += "É obrigatório a seleção da bandeira do cartão de crédito!\n";
                };
            }
            else{
                sb += "Não foi possível validar, pois a entidade não é um Cartão de Crédito!\n";
            };
            return sb;
        };
    };

//Exports
    module.exports = new ValCreditCardCompany();