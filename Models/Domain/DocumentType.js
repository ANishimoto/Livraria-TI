//Imports
    const DomainEntity = require("../Util/DomainEntity");

//Document's Type Class
    class Document extends DomainEntity{
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
    module.exports = Document;