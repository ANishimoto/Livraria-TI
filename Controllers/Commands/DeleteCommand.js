//Imports
    const AbstractCommand = require("./AbstractCommand");

//Command for delete
    class DeleteCommand extends AbstractCommand{
        execute(entity){
            return this.facade.delete(entity);
        };
    };

//Exports
    module.exports = DeleteCommand;