//Imports
    const IStrategy = require("../../IStrategy");
    const User = require("../../../../Models/Domain/User");
    const bcrypt = require("bcryptjs");

//Class for Validation of the Business Rule: RN0026 - Dados obrigatórios para o cadastro de um cliente - Senha
    class ValPassword extends IStrategy{
        process(entity){
            let sb = "";
            if(entity instanceof User){
                let regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[a-z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/; 
                let password = entity.getPassword(); 
                if(password == null || password.trim() == ""){
                    sb += "Campo Senha é obrigatório!\n";
                };
                if(password.length < 8){
                    sb += "A Senha deve ter no mínimo 8 caracteres!\n";
                };
                if(!regex.exec(password)){
                    sb += "A senha deve conter no mínimo 1 caractere maiúsculo, 1 número e 1 caractere especial!\n";
                };
                if(sb == ''){
                    let salt = bcrypt.genSaltSync(10);
                    entity.setPassword(bcrypt.hashSync(password, salt));
                };
            }
            else{
                sb += "Não foi possível validar, pois a entidade não é um Usuário!\n";
            };
            return sb;
        };
    };

//Exports
    module.exports = new ValPassword();