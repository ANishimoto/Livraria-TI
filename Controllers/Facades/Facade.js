//Imports
    const IFacade = require("./IFacade");
    const Result = require("../../Model/Util/Result");

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
            create(entity) {
                this.#setDAOs(entity);
                let result = new Result();
                let nmClass = entity.constructor.name;
                let msg = executeRules(entity, "Create");
                if (msg == undefined) {
                    let dao = this.#daos.get(nmClass);
                    try {
                        dao.create(entity);
                        result.setMsg("Status: 200");
                    } catch (err) {
                        console.log(err);
                        result.setMsg("Status: 500");
                    };
                }
                else {
                    result.setMsg(msg);
                };
                return result;
            };
            
        //Execute the validation rules and call the respective DAO of the entity, to update the datas of the entity in the DataBase
            update(entity) {
                this.#setDAOs(entity);
                let result = new Result();
                let nmClass = entity.constructor.name;
                let msg = executeRules(entity, "Update");
                if (msg == undefined) {
                    let dao = this.#daos.get(nmClass);
                    try {
                        dao.update(entity);
                        result.setMsg("Status: 200");
                    } catch (err) {
                        console.log(err);
                        result.setMsg("Status: 500");
                    };
                }
                else {
                    result.setMsg(msg);
                };
                return result;
            };

        //Execute the validation rules and call the respective DAO of the entity, to delete the entity in the DataBase
            delete(entity) {
                this.#setDAOs(entity);
                let result = new Result();
                let nmClass = entity.constructor.name;
                let msg = executeRules(entity, "Delete");
                if (msg == undefined) {
                    let dao = this.#daos.get(nmClass);
                    try {
                        dao.delete(entity);
                        result.setMsg("Status: 200");
                    } catch (err) {
                        console.log(err);
                        result.setMsg("Status: 500");
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
                let msg = this.#executeRules(entity, "Search");
                if (msg == undefined) {
                    let dao = this.#daos.get(nmClass);
                    try {
                        let entities = await dao.search(entity);
                        await result.setEntities(entities);
                        await result.setMsg("Status: 200");
                    } catch (err) {
                        console.log(err);
                        result.setMsg("Status: 500");
                    };
                }
                else {
                    result.setMsg(msg);
                };
                return result;
            };

        
        //Execute the list of businnes rules
            #executeRules(entity, operation){
                this.#setBusinessRules(entity, operation);
                let nmClass = entity.constructor.name;
                let msg = "";
                let operationRules = this.#businessRules.get(nmClass);  
                if(operationRules != undefined){
                    let rules = operationRules.get(operation);
                    if(rules != undefined){
                        rules.forEach(rule => {
                            let m = rule.process(entity);
                            if(m != undefined){
                                msg += `${m}\n`;
                            };
                        });
                    };
                };
                if(msg.length > 0)
                    return msg;
                else
                    return undefined;
            };

        //Sets de List of Business Rules of the entity and the operation 
            #setBusinessRules(entity, operation){
                let nmClass = entity.constructor.name;
                if(this.#businessRules == undefined || this.#businessRules.get(nmClass) == undefined){
                    let rules = require(`../Strategies/${nmClass}/${operation}Rules`);
                    let entitiesOperations = new Map();
                    entitiesOperations.set(operation, rules);
                    this.#businessRules.set(nmClass, entitiesOperations);
                }else {
                    let businessRule = this.#businessRules.get(nmClass);
                    if(businessRule.get(operation) == undefined){
                        let rules = require(`../Strategies/${nmClass}/${operation}Rules`);
                        businessRule.set(operation, rules);
                    };   
                };
            };
            
        //Sets de List of DAOs of the entity 
            #setDAOs(entity){
                let nmClass = entity.constructor.name;
                if(this.#daos == undefined || this.#daos.get(nmClass) == undefined){
                    let DAO = require(`../DataBase/DAOs/${nmClass}/DAO`);
                    this.#daos.set(nmClass, new DAO());
                };
            };
    };
    	
//Exports
    module.exports = new Facade();