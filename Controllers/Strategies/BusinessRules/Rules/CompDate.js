//Imports
    const IStrategy = require("../../IStrategy");
    const GetDateNow = require("../../Dates/GetDateNow");

//
    class CompDate extends IStrategy{
        process(entity){
            let sb = "";
            if(entity != undefined && entity != null){
                let today = GetDateNow.process(new Date());
                entity.setCreateDate(today);
                entity.setUpdateDate(today);
            }
            else{
                sb += "Não foi possível incluir data, pois a entidade está vazia!\n";
            };
            return sb;
        };
    };

//Exports
    module.exports = new CompDate();