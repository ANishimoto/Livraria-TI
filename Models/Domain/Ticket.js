//Imports
    const DomainEntity = require("../Util/DomainEntity");
    const TicketType = require("./TicketType");

//Phone Class
    class Ticket extends DomainEntity {
        #code;
        #value;
        #expirationDate;
        #TicketType;

        constructor(){
            super();
            this.#code = null;
            this.#value = null;
            this.#expirationDate = null;
            this.#TicketType = new TicketType();
        };

        getCode(){
            return this.#code;
        };

        getValue(){
            return this.#value;
        };

        getExpirationDate(){
            return this.#expirationDate;
        };

        getTicketType(){
            return this.#TicketType;
        };

        setCode(code){
            this.#code = code;
        };

        setValue(value){
            this.#value = value;
        };

        setExpirationDate(expirationDate){
            this.#expirationDate = expirationDate;
        };

        setTicketType(TicketType){
            this.#TicketType = TicketType;
        };

    };

//Exports
    module.exports = Ticket;