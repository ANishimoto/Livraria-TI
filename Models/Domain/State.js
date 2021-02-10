//Imports
    const DomainEntity = require("../Util/DomainEntity");
    const Country = require("./Country");

//City's State Class
    class State extends DomainEntity{
        #description;
        #country;

        constructor(){
            super();
            this.#description = null;
            this.#country = new Country();
        };

        getDescription(){
            return this.#description;
        };

        getCountry(){
            return this.#country;
        };

        setDescription(description){
            this.#description = description;
        };

        setCountry(country){
            this.#country = country;
        };

    };

//Exports
    module.exports = State;