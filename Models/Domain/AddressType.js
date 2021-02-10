//Imports
    const DomainEntity = require("../Util/DomainEntity");

//Address's Type Class
    class AddressType extends DomainEntity{
        #description;
        #name;
        
        constructor(){
            super();
            this.#description = null;
            this.#name = null;
        };

        getDescription(){
            return this.#description;
        };

        getName(){
            return this.#name;
        };

        setDescription(description){
            this.#description = description;
        };

        setName(name){
            this.#name = name;
        };

    };

//Exports
    module.exports = AddressType;