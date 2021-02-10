//Imports
    const DomainEntity = require("../Util/DomainEntity");
    const State = require("./State");

//Address's City Class
    class City extends DomainEntity{
        #description;
        #state;

        constructor(){
            super();
            this.#description = null;
            this.#state = new State();
        };

        getDescription(){
            return this.#description;
        };

        getState(){
            return this.#state;
        };

        setDescription(description){
            this.#description = description;
        };

        setState(state){
            this.#state = state;
        };

    };

//Exports
    module.exports = City;