//Imports
    const AbstractCommand = require("./AbstractCommand");

//Command for create
    class CreateCommand extends AbstractCommand{
        execute(entity){
            return this.facade.create(entity);
        };
    };

//Exports
    module.exports = CreateCommand;