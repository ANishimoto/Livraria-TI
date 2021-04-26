//Imports
    const IStrategy = require("../IStrategy");

    class GetDateNow extends IStrategy{

        process(dateNow){
            let dd = String(dateNow.getDate()).padStart(2, '0');
            let MM = String(dateNow.getMonth() + 1).padStart(2, '0');
            let yyyy = dateNow.getFullYear();
            let hh = String(dateNow.getHours()).padStart(2, '0');
            let mm = String(dateNow.getMinutes()).padStart(2, '0');
            let ss = String(dateNow.getSeconds()).padStart(2, '0'); 
            return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`
        };
    };

//Exports
    module.exports = new GetDateNow();