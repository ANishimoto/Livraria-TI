//Imports
    const IFacade = require("./IFacade");
    const Result = require("../../Models/Util/Result");

//Facade - Depending on the entity and the operation, this class execute the business rules necessary
    class Facade extends IFacade{

        constructor(){
            super();
        }

        //Execute the 
            sendEmail(strategy) {
                this.#executeRules(strategy.constructor.name);
            };

        
        //Execute the list of Email Models
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

        //Sets de List of Email Models 
            #setEmailModels(strategy){
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
    };
    	
//Exports
    module.exports = new Facade();