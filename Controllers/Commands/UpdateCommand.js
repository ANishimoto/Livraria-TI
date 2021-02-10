//Imports
    const AbstractCommand = require("./AbstractCommand");

//Command for update
    class UpdateCommand extends AbstractCommand{
        execute(entity){
            return this.facade.update(entity)
        };
    };

//Exports
    module.exports = UpdateCommand;