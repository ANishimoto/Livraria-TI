//Imports
    const IStrategy = require("../../IStrategy");
    const Client = require("../../../../Models/Domain/Client");
    const Command = require("../../../Commands/SearchCommand");

//Class for Validation of the Business Rule: RN00XX - Validar Existência de cliente com base no CPF
    class ValClientFromCPF extends IStrategy{
        async process(entity){
            let sb = "";
            if(entity instanceof Client){
                let document = entity.getDocuments().find(element => element.getDocumentType().getName() == "CPF");
                if(document != null){
                    if(document.getCode() != null && document.getCode().trim() != ""){
                        let client = new Client();
                        client.addDocument(document);
                        let command = new Command();
                        let result = await command.execute(client);
                        let data = result.getEntities();
                        if(data.length != 0){
                            sb += "CPF já se encontra cadastrado na base!\n";
                        }
                    }
                    else{
                        sb += "É obrigatório o preenchimento do CPF!\n";
                    };
                }
                else{
                    sb += "É obrigatório o preenchimento do CPF!\n";
                };
            }
            else{
                sb += "Não foi possível validar, pois a entidade não é um Cliente!\n";
            };
            return sb;
        };
    };

//Exports
    module.exports = new ValClientFromCPF();