//Imports
    const DomainEntity = require("../Util/DomainEntity");
    const UserType = require("./UserType");

//User Class
    class User extends DomainEntity {
        #email;
        #password;
        #userType;

        constructor(){
            super();
            this.#email = null;
            this.#password = null;
            this.userType = new UserType();
        };

        setUserType(userType){
            this.#userType = userType;
        };

        setEmail(email){
            this.#email = email;
        };

        setPassword(password){
            this.#password = password;
        };

        getEmail(){
            return this.#email;
        };

        getPassword(){
            return this.#password;
        };

        getUserType(){
            return this.#userType;
        };
    };

//Exports
    module.exports = User;