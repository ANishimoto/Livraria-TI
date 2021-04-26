//Imports
    const DomainEntity = require("../Util/DomainEntity");

//Book's Publisher Class
    class Publisher extends DomainEntity {
        #name;

        constructor(){
            super();
            this.#name = null;
        };

        getName(){
            return this.#name;
        };

        setName(name){
            this.#name = name;
        };

    };

//Exports
    module.exports = Publisher;