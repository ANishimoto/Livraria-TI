//Imports
    const DomainEntity = require("../Util/DomainEntity");

//Book's Category Class
    class Category extends DomainEntity {
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
    module.exports = Category;