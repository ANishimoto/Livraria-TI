//Imports
    const IStrategy = require("../../IStrategy");
    const Person = require("../../../../Models/Domain/Person");

//Class for Validation of the Business Rule: RN00XX
    class ValCPF extends IStrategy{
        async process(entity){
            let sb = "";
            if(entity instanceof Person){
                let document = entity.getDocuments().find(element => element.getDocumentType().getName() == "CPF");
                if( document != undefined ){
                    if(document.getCode() != null && document.getCode().trim(" ") != ""){
                        if(await this.#validate(document)) {
                            sb += "CPF inválido!\n";
                        };
                    };
                }
                else{
                    sb += "Campo CPF é obrigatório!\n";
                }
            }
            else{
                sb += "Não foi possível validar, pois a entidade não é uma Pessoa!\n";
            };
            return sb;
        };

        async #validate(document){
            let sum = 0;
            let mod;
            let cpf = document.getCode();
            if (cpf.trim().length != 11){
                return false;
            };

            if (cpf.replace(/^0+/, '').length == 0){
                return false;
            };

            for (let i = 0; i <= 9; i++) {
                sum = sum + parseInt(cpf.substring(i, i+1)) * (11 - i);
            };

            mod = (sum * 10) % 11;
        
            if ((mod == 10) || (mod == 11)) {
                mod = 0
            };

            if (mod != parseInt(cpf.substring(9, 10)) ) {
                return false;
            };

            sum = 0;

            for (let i = 1; i <= 10; i++) {
                sum = sum + parseInt(cpf.substring(i, i+1)) * (12 - i-1);
            };

            mod = (sum * 10) % 11;
        
            if ((mod == 10) || (mod == 11)) {
                mod = 0;
            };

            if (mod != parseInt(cpf.substring(10, 11) ) ) {
                return false;
            };
            return true;
        };
    };

//Exports
    module.exports = new ValCPF();