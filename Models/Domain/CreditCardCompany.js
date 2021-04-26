//Imports
    const DomainEntity = require("../Util/DomainEntity");

//Credit Card's Company Class
    class CreditCardCompany extends DomainEntity {
        #description;

        constructor(){
            super();
            this.#description = null;
        };
        
        setDescription(description){
            this.#description = description;
        };

        getDescription(){
            return this.#description;
        };
    };

//Exports
    module.exports = CreditCardCompany;