//Imports
    const DomainEntity = require("../Util/DomainEntity");
    const PhoneType = require("./PhoneType");

//Phone Class
    class Phone extends DomainEntity {
        #DDD;
        #number;
        #phoneType;

        constructor(){
            super();
            this.#DDD = null;
            this.#number = null;
            this.#phoneType = new PhoneType();
        };

        getDDD(){
            return this.#DDD;
        };

        getNumber(){
            return this.#number;
        };

        getPhoneType(){
            return this.#phoneType;
        };

        setDDD(ddd){
            this.#DDD = ddd;
        };

        setNumber(number){
            this.#number = number;
        };

        setPhoneType(phoneType){
            this.#phoneType = phoneType;
        };

    };

//Exports
    module.exports = Phone;