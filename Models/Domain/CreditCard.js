//Imports
    const DomainEntity = require("../Util/DomainEntity");
    const CreditCardCompany = require("./CreditCardCompany");

//Credit Card Class
    class CreditCard extends DomainEntity {
        #printedName;
        #number;
        #company;
        #secureCode;

        constructor(){
            super();
            this.#printedName = null;
            this.#number = null;
            this.#company = new CreditCardCompany();
            this.#secureCode = null;
        };

        setPrintedName(printedName){
            this.#printedName = printedName;
        };
        
        setNumber(number){
            this.#number = number;
        };
        
        setCompany(company){
            this.#company = company;
        };
        
        setSecureCode(secureCode){
            this.#secureCode = secureCode;
        };

        getPrintedName(){
            return this.#printedName;
        };

        getNumber(){
            return this.#number;
        };
        
        getCompany(){
            return this.#company;
        };
        
        getSecureCode(){
            return this.#secureCode;
        };
    };

//Exports
    module.exports = CreditCard;