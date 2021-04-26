//Imports
    const ResidenceType = require("../../../Models/Domain/ResidenceType");
    const connection = require("../database");
    const IDAO = require("./IDAO");

//DAO class
    class DAO extends IDAO{
        
        create(entity){
            try{      
                connection.query(`
                                    INSERT 
                                    INTO  ()
                                    VALUES 
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
                    let id = (entity.getId() == null) ? null : `${entity.getId()}`;
                    await connection.raw( `
                                            SELECT * 
                                            FROM ResidenceTypes
                                            WHERE   (     
                                                        ${id}  IS NULL
                                                            OR
                                                        (
                                                            ${id} IS NOT NULL
                                                                AND
                                                            ${id} = RDT_PK_ResidenceTypeId
                                                        )
                                                    )
                                            ORDER BY RDT_STR_Description
                                        `).then(datas => {
                                            datas[0].forEach( data => {
                                                let type = new ResidenceType();
                                                type.setId(data.RDT_PK_ResidenceTypeId);
                                                type.setDescription(data.RDT_STR_Description);
                                                type.setIsActive(data.RDT_BOL_Active);
                                                type.setCreateDate(data.RDT_DTT_CreateDateTime);
                                                type.setUpdateDate(data.RDT_DTT_UpdateDateTime);
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