//Imports
    const DomainEntity = require("../Util/DomainEntity");

//Client's Type Class
    class ClientType extends DomainEntity {
        #name;
        #description;

        constructor(){
            super();
            this.#name = null;
            this.#description = null;
        };

        getName(){
            return this.#name;
        };

        getDescription(){
            return this.#description;
        };

        setName(name){
            this.#name = name;
        };

        setDescription(description){
            this.#description = description;
        };
        
    };

//Exports
    module.exports = ClientType;