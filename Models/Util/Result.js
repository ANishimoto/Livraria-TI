//Class for validation results
    class Result {
        #msg;
        #entities;

        constructor(){
            this.#msg = null;
            this.#entities = null;
        };
        
        getMsg() {
            return this.#msg;
        };

        setMsg(msg) {
            this.#msg = msg;
        };

        getEntities() {
            return this.#entities;
        };

        setEntities(entities) {
            this.#entities = entities;
        };
    };

//Exports
    module.exports = Result;