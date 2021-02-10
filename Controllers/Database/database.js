//Imports
    const knex = require("knex");
     
//Knex MySQL DataBase Config
    const connection = knex({
        client: "mysql2",
        connection: {
            host : "localhost",
            user : "teste",
            password : "12345",
            database : "projeto-les"
        }
    });
    
//Exports
    module.exports = connection; //Exports a DataBase connection