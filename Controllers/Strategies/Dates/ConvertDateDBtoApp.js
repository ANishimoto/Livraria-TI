//Imports
    const IStrategy = require("../IStrategy");

    class ConvertDate extends IStrategy{

        process(dateDB){
            let month = new Map();
            month.set("Jan", "01");
            month.set("Fev", "02");
            month.set("Mar", "03");
            month.set("Apr", "04");
            month.set("May", "05");
            month.set("Jun", "06");
            month.set("Jul", "07");
            month.set("Ago", "08");
            month.set("Set", "09");
            month.set("Out", "10");
            month.set("Nov", "11");
            month.set("Dez", "12");
            let date = String(new Date(dateDB)).split(" ");
            let dd = date[2];
            let MM = month.get(date[1]);
            let yyyy = date[3];
            return `${yyyy}-${MM}-${dd}`
        };
    };

//Exports
    module.exports = new ConvertDate();