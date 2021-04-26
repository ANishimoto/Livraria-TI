//Imports
    const DomainEntity = require("../Util/DomainEntity");

//Book's Price Group Class
    class PriceGroup extends DomainEntity {
        #markup;

        constructor(){
            super();
            this.#markup = null;
        };

        getMarkup(){
            return this.#markup;
        };

        setMarkup(markup){
            this.#markup = markup;
        };

    };

//Exports
    module.exports = PriceGroup;