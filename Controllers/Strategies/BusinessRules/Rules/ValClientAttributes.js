//Imports
    const IStrategy = require("../../IStrategy");
    const Client = require("../../../../Models/Domain/Client");
    const ValPhone = require("./ValPhone");
    const ValAddress = require("./ValAddress");
    const ValCreditCard = require("./ValCreditCard");
    const ValUser = require("./ValUser");
    const ValPersonAttributes = require("./ValPersonAttributes");

/*
Class for Validation of the Business Rule: RN0026 - Dados obrigatórios para o cadastro de um cliente    
    Para todo cliente cadastrado é obrigatório o cadastro dos seguintes dados: 
        Sexo, 
        Nome, 
        Data de Nascimento, 
        CPF, 
        Telefone (deve ser composto pelo tipo, DDD e número), 
        e-mail, 
        senha, 
        endereço residencial.
*/
    class ValClientAttributes extends IStrategy{
        async process(entity){
            let sb = "";
            if(entity instanceof Client){
                sb += await ValPersonAttributes.process(entity);
                sb += await this.#valAddresses(entity);
                sb += await this.#valPhones(entity);
                sb += await ValUser.process(entity.getUser());
                sb += await this.#valCreditCards(entity);
            }
            else{
                sb += "Não foi possível validar, pois a entidade não é um Cliente!\n";
            };
            return sb;
        };

        async #valPhones(entity){
            let sb = '';
            for (let phone of entity.getPhones()) {
                sb += ValPhone.process(phone);  
            };
            return sb;
        };

        async #valAddresses(entity){
            let sb = '';
            let defaultBill = 0;
            let defaultDelivery = 0;
            for (let address of entity.getAddresses()) {
                sb += ValAddress.process(address);
                if(address.getAddressType().getId() == 2 || address.getAddressType().getId() == 4){
                    defaultBill += 1;
                };
                if(address.getAddressType().getId() == 3 || address.getAddressType().getId() == 4){
                    defaultDelivery += 1;
                };
            };
            if(defaultBill == 0){
                sb += "É obrigatório selecionar um endereço como endereço padrão para cobranças!\n";
            }
            if(defaultDelivery == 0){
                sb += "É obrigatório selecionar um endereço como endereço padrão para entregas!\n";
            }
            if(defaultBill > 1){
                sb += "Só pode ser selecionado um endereço como endereço padrão para cobranças!\n";
            }
            if(defaultDelivery > 1){
                sb += "Só pode ser selecionado um endereço como endereço padrão para entregas!\n";
            }
            return sb;
        };

        async #valCreditCards(entity){
            let sb = '';
            for (let creditCard of entity.getCreditCards()) {
                sb += ValCreditCard.process(creditCard);
            };
            return sb;
        };
    };

//Exports
module.exports = new ValClientAttributes();
