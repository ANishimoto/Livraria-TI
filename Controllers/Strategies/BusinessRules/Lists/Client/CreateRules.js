//Imports
    const ValClientFromCPF = require("../../Rules/ValClientFromCPF");
    const ValCPF = require("../../Rules/ValCPF");
    const ValClientAttributes = require("../../Rules/ValClientAttributes");
    const CompDate = require("../../Rules/CompDate");

//Business Rules List
    let list = [];
    list.push(ValClientFromCPF);
    list.push(ValCPF);
    list.push(ValClientAttributes);
    list.push(CompDate);

//Exports
    module.exports = list;