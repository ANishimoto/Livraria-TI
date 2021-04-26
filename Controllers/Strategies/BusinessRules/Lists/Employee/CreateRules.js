//Imports
    const ValCPF = require("../../Rules/ValCPF");
    const CompDate = require("../../Rules/CompDate");
    const ValEmployeeFromCPF = require("../../Rules/ValEmployeeFromCPF");
    const ValEmployeeAttributes = require("../../Rules/ValEmployeeAttributes");

//Business Rules List
let list = [];
    list.push(ValEmployeeFromCPF);
    list.push(ValCPF);
    list.push(ValEmployeeAttributes);
    list.push(CompDate);

//Exports
    module.exports = list;