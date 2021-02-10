//Imports
    const DomainEntity = require("../Util/DomainEntity");

//Generic Person Class
    class Person extends DomainEntity{
        #documents;
        #gender;

        constructor(){
            super();
            this.#documents = [];
            this.#gender = null;
        };

        getDocuments(){
            return this.#documents;
        };

        getGender(){
            return this.#gender;
        };

        addDocument(document){
            this.#documents.push(document);
        };

        setGender(gender){
            this.#gender = gender;
        };
    };

//Exports
    module.exports = Person;