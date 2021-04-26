//Imports
    const DomainEntity = require("../Util/DomainEntity");

//Credit Card Class
    class PublicPlaceType extends DomainEntity {
        #description;

        constructor(){
            super();
        };
        
        setDescription(description){
            this.#description = description;
        };

        getDescription(){
            return this.#description;
        };
    };

//Exports
    module.exports = PublicPlaceType;