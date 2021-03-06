//Imports
    const DomainEntity = require("../Util/DomainEntity");

//Phone's Type Class
    class PhoneType extends DomainEntity {
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
    module.exports = PhoneType;