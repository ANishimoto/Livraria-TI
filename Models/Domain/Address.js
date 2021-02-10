//Imports
    const DomainEntity = require("../Util/DomainEntity");
    const City = require("./City");
    const AddressType = require("./AddressType");

//Address Class
    class Address extends DomainEntity{
        #publicPlace;
        #number;
        #cep;
        #complement;
        #city;
        #addressType;

        constructor(){
            super();
            this.#publicPlace = null;
            this.#number = null;
            this.#cep = null;
            this.#complement = null;
            this.#city = new City();
            this.#addressType = new AddressType()
        };

        getPublicPlace(){
            return this.#publicPlace;
        };

        getNumber(){
            return this.#number;
        };

        getCep(){
            return this.#cep;
        };

        getComplement(){
            return this.#complement;
        };

        getCity(){
            return this.#city;
        };

        getAddressType(){
            return this.#addressType;
        };

        setPublicPlace(publicPlace){
            this.#publicPlace = publicPlace;
        };

        setNumber(number){
            this.#number = number;
        };

        setCep(cep){
            this.#cep = cep;
        };

        setComplement(complement){
            this.#complement = complement;
        };

        setCity(city){
            this.#city = city;
        };

        setAddressType(addressType){
            this.#addressType = addressType;
        };

    };

//Exports
    module.exports = Address;