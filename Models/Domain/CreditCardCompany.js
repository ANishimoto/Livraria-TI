//Imports
    const DomainEntity = require("../Util/DomainEntity");

//Credit Card's Company Class
    class CreditCardCompany extends DomainEntity {
        #name;

        constructor(){
            super();
        };
        
        setName(name){
            this.#name = name;
        };

        getName(){
            return this.#name;
        };
    };

//Exports
    module.exports = CreditCardCompany;