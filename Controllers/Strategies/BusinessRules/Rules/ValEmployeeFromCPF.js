//Imports
    const IStrategy = require("../../IStrategy");
    const Employee = require("../../../../Models/Domain/Employee");
    const Command = require("../../../Commands/SearchCommand");

//Class for Validation of the Business Rule: Validar Existência de funcionário com base no CPF
    class ValEmployeeFromCPF extends IStrategy{
        async process(entity){
            let sb = "";
            if(entity instanceof Employee){
                let document = entity.getDocuments().find(element => element.getDocumentType().getName() == "CPF");
                if(document != null){
                    if(document.getCode() != null && document.getCode().trim() != ""){
                        let employee = new Employee();
                        employee.addDocument(document);
                        let command = new Command();
                        let result = await command.execute(employee);
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
                sb += "Não foi possível validar, pois a entidade não é um Funcionário!\n";
            };
            return sb;
        };
    };

//Exports
    module.exports = new ValEmployeeFromCPF();