//Imports
    const Gender = require("../../../Models/Domain/Gender");
    const connection = require("../database");
    const IDAO = require("./IDAO");

//DAO class
    class DAO extends IDAO{
        
        create(entity){
            try{      
                connection.query(`
                                    INSERT 
                                    INTO  ()
                                    VALUES ()
                                `)
            } catch (err) {
                console.log(err);
            };
        };

        update(entity){
            try{      
                connection.query(`
                                    UPDATE 
                                    SET 
                                    WHERE 
                                `)
            } catch (err) {
                console.log(err);
            };
        };
        
        delete(entity){
            try{      
                connection.query(`
                                    DELETE 
                                    FROM 
                                    WHERE 
                                `)
            } catch (err) {
                console.log(err);
            };
        };
    
        async search(entity){
            try{      
                let types = [];
                await connection.transaction(async trans => {
                    await connection.raw( `
                                            SELECT * 
                                            FROM Genders
                                            WHERE GEN_BOL_Active = 1
                                            ORDER BY GEN_STR_Description
                                        `).then(datas => {
                                            datas[0].forEach( data => {
                                                let type = new Gender();
                                                type.setId(data.GEN_PK_GenderId);
                                                type.setDescription(data.GEN_STR_Description);
                                                type.setIsActive(data.GEN_BOL_Active);
                                                type.setCreateDate(data.GEN_DTT_CreateDateTime);
                                                type.setUpdateDate(data.GEN_DTT_UpdateDateTime);
                                                types.push(type);
                                            });
                                        }).catch(err => {
                                            console.log(err);
                                        });
                });
                return types;
            } catch (err) {
                console.log(err);
            };
        };
    };

//Exports
    module.exports = DAO;