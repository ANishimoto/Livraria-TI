//Imports
    const IStrategy = require("../IStrategy");
    const Sale = require("../../../Models/Domain/Sale");
    const CreditCard = require("../../../Models/Domain/CreditCard");

//Class for Validation of the Business Rule: RN0028 - Validar retorno da operadora de cartão de crédito / Authenticate the return of the Credit Card Company
//Obs: This is just a fake validation. 
    class ValCredCardCompReturn extends IStrategy{
        process(entity){
            let sb = "";
            if(entity instanceof new Sale()){
                if(entity.getPayment() != undefined && entity.getPayment() != null){
                    if(entity.getPayment() instanceof new CreditCard()){
                        let random = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
                        if (random % 2 == 0){
                            entity.status = "PROCESSADO";
                        }else{
                            sb += "Pagamento não aprovado pela operadora do cartão!\n";
                        };
                    }
                    else{
                        sb += "Não foi possível validar, pois a entidade não é um Cartão de Crédito!\n";
                    }
                }else{
                    sb += "Não foi possível validar, pois não foi informada uma forma de pagamento!\n";
                }
            }
            else{
                sb += "Não foi possível validar, pois a entidade não é uma Venda!\n";
            }
            return sb;
        };
    };

//Exports
    module.exports = new ValCredCardCompReturn();