//Imports
    const DomainEntity = require("../Util/DomainEntity");

//State's Country Class
    class Country extends DomainEntity{
        #description;

        constructor(){
            super();
            this.#description = null;
        };

        getDescription(){
            return this.#description;
        };

        setDescription(description){
            this.#description = description;
        };

    };

//Exports
    module.exports = Country;