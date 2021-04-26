//Imports
    const IViewHelper = require("./IViewHelper");
    const Result = require("../../Models/Util/Result");
    const Employee = require("../../Models/Domain/Employee");
    const Document = require("../../Models/Domain/Document");
    const Phone = require("../../Models/Domain/Phone");

//ViewHelper of Employees
    class VHEmployee extends IViewHelper {
        getEntity(req) {
            let result = new Result();
            let employee = new Employee();
            
            let name = req.body.name;
            if(name != undefined){employee.setName(name);};

            let birth = req.body.birth;
            if(birth != undefined) {employee.setBirth(birth);};
            
            let gender = req.body.gender
            if(gender != undefined) {employee.getGender().setId(parseInt(gender));};

            let cpf = req.body.CPF;
            if(cpf != undefined){
                let document_cpf = new Document();
                document_cpf.setCode(cpf);
                document_cpf.getDocumentType().setName("CPF");
                document_cpf.getDocumentType().setDescription("Cadastro de Pessoa Física");
                employee.addDocument(document_cpf);
            };
            
            employee.getUser().setEmail(req.body.email);
            employee.getUser().setPassword("12345Ab!");
            employee.getPhone().getPhoneType().setId(req.body.phone.tpPhone);
            employee.getPhone().setDDD(req.body.phone.DDD);
            employee.getPhone().setNumber(req.body.phone.number);
            result.setEntities(employee);
            return result;
        };

        setView(result, req, res){
            let operation = req.body.button;
            let status = result.getMsg().split(" ");
            if(status == "200"){
                res.redirect("/");
            }  			
            else{
                res.redirect("/");
            };
        };
    };

//Exports
    module.exports = VHEmployee;