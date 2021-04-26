//Imports
    const Person = require("./Person");
    const Phone = require("./Phone");
    const User = require("./User");
    const EmployeeType = require("./EmployeeType");

//Employee Class
    class Employee extends Person {
        #EmployeeType;
        #phone;
        #user;

        constructor(){
            super();
            this.#EmployeeType = new EmployeeType();
            this.#phone = new Phone();
            this.#user = new User();
        };

        getEmployeeType(){
            return this.#EmployeeType;
        };

        getPhone(){
            return this.#phone;
        };

        getUser(){
            return this.#user;
        };

        setEmployeeType(EmployeeType){
            this.#EmployeeType = EmployeeType;
        };

        setPhone(phone){
            return this.#phone = phone;
        };

        setUser(user){
            this.#user = user;
        };

    };

//Exports
    module.exports = Employee;