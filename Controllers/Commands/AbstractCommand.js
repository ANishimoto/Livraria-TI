//Imports
    const ICommand = require("./ICommand");
    const Facade = require("../Facades/Facade");

//Abstract Class for commands
    class AbstractCommand extends ICommand{
        constructor(){
            super();
            this.facade = Facade;
        };
    };

//Exports
    module.exports = AbstractCommand;