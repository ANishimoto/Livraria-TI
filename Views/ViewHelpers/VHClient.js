//Imports
    const IViewHelper = require("./IViewHelper");
    const Result = require("../../Models/Util/Result");
    const Client = require("../../Models/Domain/Client");
    const Document = require("../../Models/Domain/Document");
    const Phone = require("../../Models/Domain/Phone");
    const Address = require("../../Models/Domain/Address");
    const CreditCard = require("../../Models/Domain/CreditCard");

//ViewHelper of Clients
    class VHClient extends IViewHelper {
        getEntity(req) {
            let result = new Result();
            let client = new Client();
            
            let name = req.body.client_name;
            let birth = req.body.birth;
            let gender = parseInt(req.body.gender);
            let email = req.body.email;
            let password = req.body.password;

            client.setName(name);
            client.setBirth(birth);
            client.getGender().setId(gender);

            if(req.body.CPF != undefined){
                let document_cpf = new Document();
                document_cpf.setCode(req.body.CPF);
                document_cpf.getDocumentType().setName("CPF");
                document_cpf.getDocumentType().setDescription("Cadastro de Pessoa Física");
                client.addDocument(document_cpf);
            }
            
            client.getUser().setEmail(email);
            client.getUser().setPassword(password);

            if(!Array.isArray(req.body.tpPhone)){
                let phone = new Phone();
                phone.getPhoneType().setId(req.body.tpPhone);
                phone.setDDD(req.body.DDD);
                phone.setNumber(req.body.phone_number);
                client.addPhone(phone);
            }
            else{
                for (let i = 0; i < req.body.tpPhone.length; i++) {
                    let phone = new Phone();
                    phone.getPhoneType().setId(req.body.tpPhone[i]);
                    phone.setDDD(req.body.DDD[i]);
                    phone.setNumber(req.body.phone_number[i]);
                    client.addPhone(phone);
                };
            };

            
            if(!Array.isArray(req.body.default_bill)){
                let address = new Address();
                let option = 1;
                
                if(req.body.default_bill == "on"){
                    option += 1
                };
                if(req.body.default_delivery == "on"){
                    option += 2
                };
            
                address.getAddressType().setId(option);
                address.getResidenceType().setId(req.body.residence_types);
                address.setCep(req.body.CEP);
                address.getCity().getState().getCountry().setDescription(req.body.country);
                address.getCity().getState().setDescription(req.body.state);
                address.getCity().setDescription(req.body.city);
                address.getPublicPlaceType().setId(req.body.public_places_types);
                address.setPublicPlace(req.body.public_place);
                address.setNeighborhood(req.body.neighborhood);
                address.setNumber(req.body.address_number);
                address.setComplement(req.body.notes);
                client.addAddress(address); 
            }
            else{   
                for (let i = 0; i < req.body.default_bill.length; i++) {
                    let address = new Address();
                    let option = 1;
                    
                    if(req.body.default_bill[i] == "on"){
                        option += 1
                    };
                    if(req.body.default_delivery[i] == "on"){
                        option += 2
                    };
                    
                    address.getAddressType().setId(option);
                    address.getResidenceType().setId(req.body.residence_types[i]);
                    address.setCep(req.body.CEP[i]);
                    address.getCity().getState().getCountry().setDescription(req.body.country[i]);
                    address.getCity().getState().setDescription(req.body.state[i]);
                    address.getCity().setDescription(req.body.city[i]);
                    address.getPublicPlaceType().setId(req.body.public_places_types[i]);
                    address.setPublicPlace(req.body.public_place[i]);
                    address.setNeighborhood(req.body.neighborhood[i]);
                    address.setNumber(req.body.address_number[i]);
                    address.setComplement(req.body.notes[i]);
                    client.addAddress(address);
                };
            };

            if(!Array.isArray(req.body.card_company)){
                let creditCard = new CreditCard();
                creditCard.getCompany().setId(req.body.card_company);
                creditCard.setNumber(req.body.card_number);
                creditCard.setPrintedName(req.body.printed_name);
                creditCard.setSecureCode(req.body.secure_code);
                client.addCreditCard(creditCard);
            }
            else{
                for (let i = 0; i < req.body.card_company.length; i++) {
                    let creditCard = new CreditCard();
                    creditCard.getCompany().setId(req.body.card_company[i]);
                    creditCard.setNumber(req.body.card_number[i]);
                    creditCard.setPrintedName(req.body.printed_name[i]);
                    creditCard.setSecureCode(req.body.secure_code[i]);
                    client.addCreditCard(creditCard);
                };
            };
                
            result.setEntities(client);
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
    module.exports = VHClient;