//Imports
    const DomainEntity = require("../Util/DomainEntity");
    const Gender = require("./Gender");

//Generic Person Class
    class Person extends DomainEntity{
        #name;
        #documents;
        #gender;
        #birth;

        constructor(){
            super();
            this.#name = null;
            this.#documents = [];
            this.#gender = new Gender();
            this.#birth = null;
        };

        getName(){
            return this.#name;
        };

        getDocuments(){
            return this.#documents;
        };

        getGender(){
            return this.#gender;
        };

        getBirth(){
            return this.#birth;
        };

        addDocument(document){
            this.#documents.push(document);
        };

        setName(name){
            this.#name = name;
        };

        setGender(gender){
            this.#gender = gender;
        };

        setBirth(birth){
            this.#birth = birth;
        };
    };

//Exports
    module.exports = Person;