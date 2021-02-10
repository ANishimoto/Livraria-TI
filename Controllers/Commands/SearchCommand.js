//Imports
    const AbstractCommand = require("./AbstractCommand");

//Command for search
    class SearchCommand extends AbstractCommand{
        execute(entity){
            return this.facade.search(entity);
        };
    };

//Exports
    module.exports = SearchCommand;