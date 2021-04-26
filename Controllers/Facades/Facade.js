//Imports
    const IFacade = require("./IFacade");
    const Result = require("../../Models/Util/Result");

//Facade - Depending on the entity and the operation, this class execute the business rules necessary
    class Facade extends IFacade{
        #daos;              //Map of entity's DAO 
        #businessRules;     //Map of entity's business rules

        constructor(){
            super();
            this.#daos = new Map();
            this.#businessRules = new Map();
        }

        //Execute the validation rules and call the respective DAO of the entity, to save the entity in the DataBase
            async create(entity) {
                this.#setDAOs(entity);
                let result = new Result();
                let nmClass = entity.constructor.name;
                let msg = await this.#executeRules(entity, "Create")
                if (msg == undefined) {
                    let dao = this.#daos.get(nmClass);
                    try {
                        await dao.create(entity);
                    } catch (err) {
                        console.log(err);
                    };
                }
                else {
                    result.setMsg(msg);
                };
                return result;
            };
            
        //Execute the validation rules and call the respective DAO of the entity, to update the datas of the entity in the DataBase
            async update(entity) {
                this.#setDAOs(entity);
                let result = new Result();
                let nmClass = entity.constructor.name;
                let msg = await this.#executeRules(entity, "Update");
                if (msg == undefined) {
                    let dao = this.#daos.get(nmClass);
                    try {
                        await dao.update(entity);
                    } catch (err) {
                        console.log(err);
                    };
                }
                else {
                    result.setMsg(msg);
                };
                return result;
            };

        //Execute the validation rules and call the respective DAO of the entity, to delete the entity in the DataBase
            async delete(entity) {
                this.#setDAOs(entity);
                let result = new Result();
                let nmClass = entity.constructor.name;
                let msg = await this.#executeRules(entity, "Delete");
                if (msg == undefined) {
                    let dao = this.#daos.get(nmClass);
                    try {
                        await dao.delete(entity);
                    } catch (err) {
                        console.log(err);
                    };
                }
                else {
                    result.setMsg(msg);
                };
                return result;
            };

        
        //Execute the validation rules and call the respective DAO of the entity, to search the entity in the DataBase
            async search(entity) {
                this.#setDAOs(entity);
                let result = new Result();
                let nmClass = entity.constructor.name;
                let msg = await this.#executeRules(entity, "Search");
                if (msg == undefined) {
                    let dao = this.#daos.get(nmClass);
                    try {
                        let entities = await dao.search(entity);
                        result.setEntities(entities);
                    } catch (err) {
                        console.log(err);
                    };
                }
                else {
                    result.setMsg(msg);
                };
                return result;
            };

        
        //Execute the list of businnes rules
            async #executeRules(entity, operation) {
                this.#setBusinessRules(entity, operation);
                let nmClass = entity.constructor.name;
                var msg = "";
                let operationRules = this.#businessRules.get(nmClass); 
                if(operationRules != undefined){
                    let rules = operationRules.get(operation);
                    if(rules.length > 0){
                        for (const rule of rules) {
                            msg += await rule.process(entity);   
                        };
                    };
                    if(msg != ''){
                        return msg;
                    };
                };
                return undefined;
            };
                

        //Sets de List of Business Rules of the entity and the operation 
            #setBusinessRules(entity, operation){
                let nmClass = entity.constructor.name;
                if(this.#businessRules.get(nmClass) == undefined){
                    let rules = require(`../Strategies/BusinessRules/Lists/${nmClass}/${operation}Rules`);
                    let entitiesOperations = new Map();
                    entitiesOperations.set(operation, rules);
                    this.#businessRules.set(nmClass, entitiesOperations);
                }else {
                    let businessRule = this.#businessRules.get(nmClass);
                    if(businessRule.get(operation) == undefined){
                        let rules = require(`../Strategies/BusinessRules/Lists/${nmClass}/${operation}Rules`);
                        businessRule.set(operation, rules);
                    };   
                };
            };
            
        //Sets de List of DAOs of the entity 
            #setDAOs(entity){
                let nmClass = entity.constructor.name;
                if(this.#daos.get(nmClass) == undefined){
                    let DAO = require(`../DataBase/DAOs/${nmClass}DAO`);
                    this.#daos.set(nmClass, new DAO());
                };
            };
    };
    	
//Exports
    module.exports = new Facade();