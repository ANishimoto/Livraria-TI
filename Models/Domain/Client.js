//Imports
    const Person = require("./Person");
    const Address = require("./Address");
    const Phone = require("./Phone");
    const CreditCard = require("./CreditCard");
    const User = require("./User");

//Client Class
    class Client extends Person {
        #name;
        #ClientType;
        #addresses;
        #phones;
        #creditCards;
        #user;

        constructor(){
            super();
            this.#name = null;
            this.#ClientType = null;
            this.#addresses = [];
            this.#phones = [];
            this.#creditCards = [];
            this.#user = new User();
        };

        getName(){
            return this.#name;
        };

        getClientType(){
            return this.#ClientType;
        };

        getAddresses(){
            return this.#addresses;
        };

        getPhones(){
            return this.#phones;
        };

        getCreditCards(){
            return this.#creditCards;
        };

        getUser(){
            return this.#user;
        };

        setName(name){
            this.#name = name;
        };

        setClientType(ClientType){
            this.#ClientType = ClientType;
        };

        addAddress(address){
            return this.#addresses.push(address);
        };

        addPhone(phone){
            return this.#phones.push(phone);
        };

        addCreditCard(creditCard){
            return this.#creditCards.push(creditCard);
        };

        setUser(user){
            this.#user = user;
        };

    };

//Exports
    module.exports = Client;