//Imports
    const Person = require("./Person");
    const Address = require("./Address");
    const Phone = require("./Phone");
    const CreditCard = require("./CreditCard");
    const ClientType = require("./ClientType");
    const User = require("./User");

//Client Class
    class Client extends Person {
        #ClientType;
        #addresses;
        #phones;
        #creditCards;
        #user;
        #ranking;
        #tickets

        constructor(){
            super();
            this.#ClientType = new ClientType();
            this.#addresses = [];
            this.#phones = [];
            this.#creditCards = [];
            this.#user = new User();
            this.#ranking = null;
            this.#tickets = [];
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

        getRanking(){
            return this.#ranking;
        };

        getTickets(){
            return this.#tickets;
        };

        setClientType(ClientType){
            this.#ClientType = ClientType;
        };

        addAddress(address){
            this.#addresses.push(address);
        };

        addPhone(phone){
            this.#phones.push(phone);
        };

        addCreditCard(creditCard){
            this.#creditCards.push(creditCard);
        };

        setUser(user){
            this.#user = user;
        };

        setRanking(ranking){
            this.#ranking = ranking;
        };

        addTicket(ticket){
            this.#tickets.push(ticket);
        };

    };

//Exports
    module.exports = Client;