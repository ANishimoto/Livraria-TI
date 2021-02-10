//Imports
    const DomainEntity = require("../Util/DomainEntity");

//User's Type Class
    class UserType extends DomainEntity {
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
    module.exports = UserType;