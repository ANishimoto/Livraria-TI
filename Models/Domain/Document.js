//Imports
    const DomainEntity = require("../Util/DomainEntity");
    const DocumentType = require("./DocumentType");

//Person's Document Class
    class Document extends DomainEntity{
        #code;
        #expiration;
        #DocumentType;

        constructor(){
            super();
            this.#code = null;
            this.#expiration = null;
            this.#DocumentType = new DocumentType();
        };

        getCode(){
            return this.#code;
        };

        getExpiration(){
            return this.#expiration;
        };

        getDocumentType(){
            return this.#DocumentType;
        };

        setCode(code){
            this.#code = code;
        };

        setExpiration(expiration){
            this.#expiration = expiration;
        };

        setDocumentType(DocumentType){
            this.#DocumentType = DocumentType;
        };
        
    };

//Exports
    module.exports = Document;