//Imports
    const DomainEntity = require("../Util/DomainEntity");

//Credit Card Class
    class Gender extends DomainEntity {
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
    module.exports = Gender;