//Imports
    const DomainEntity = require("../Util/DomainEntity");

//Phone's Type Class
    class Justification extends DomainEntity {
        #description;
        #entity;
        #Category;

        constructor(){
            super();
            this.#description = null;
            this.#entity = null;
            this.#Category = null;
        };
        
        setDescription(description){
            this.#description = description;
        };

        getDescription(){
            return this.#description;
        };
        
        setEntity(entity){
            this.#entity = entity;
        };

        getEntity(){
            return this.#entity;
        };
        
        setCategory(category){
            this.#Category = category;
        };

        getCategory(){
            return this.#Category;
        };
    };

//Exports
    module.exports = Justification;