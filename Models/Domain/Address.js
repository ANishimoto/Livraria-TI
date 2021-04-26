//Imports
    const DomainEntity = require("../Util/DomainEntity");
    const City = require("./City");
    const AddressType = require("./AddressType");
    const ResidenceType = require("./ResidenceType");
    const PublicPlaceType = require("./PublicPlaceType");

//Address Class
    class Address extends DomainEntity{
        #publicPlace;
        #number;
        #cep;
        #complement;
        #city;
        #addressType;
        #residenceType;
        #publicPlaceType;
        #neighborhood;

        constructor(){
            super();
            this.#publicPlace = null;
            this.#number = null;
            this.#cep = null;
            this.#complement = null;
            this.#city = new City();
            this.#residenceType = new ResidenceType();
            this.#publicPlaceType = new PublicPlaceType();
            this.#addressType = new AddressType()
            this.#neighborhood = null;
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

        getResidenceType(){
            return this.#residenceType;
        };

        getPublicPlaceType(){
            return this.#publicPlaceType;
        };

        getNeighborhood(){
            return this.#neighborhood;
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

        setResidenceType(residenceType){
            this.#residenceType = residenceType;
        };

        setPublicPlaceType(publicPlaceType){
            this.#publicPlaceType = publicPlaceType;
        };

        setNeighborhood(neighborhood){
            this.#neighborhood = neighborhood;
        };

    };

//Exports
    module.exports = Address;