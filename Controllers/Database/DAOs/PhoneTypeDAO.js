//Imports
    const PhoneType = require("../../../Models/Domain/PhoneType");
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
                                            FROM PhoneTypes
                                            WHERE   (     
                                                        ${id}  IS NULL
                                                            OR
                                                        (
                                                            ${id} IS NOT NULL
                                                                AND
                                                            ${id} = PTP_PK_PhoneTypeId
                                                        )
                                                    )
                                            ORDER BY PTP_STR_Description
                                        `).then(datas => {
                                            datas[0].forEach( data => {
                                                let type = new PhoneType();
                                                type.setId(data.PTP_PK_PhoneTypeId);
                                                type.setDescription(data.PTP_STR_Description);
                                                type.setIsActive(data.PTP_BOL_Active);
                                                type.setCreateDate(data.PTP_DTT_CreateDateTime);
                                                type.setUpdateDate(data.PTP_DTT_UpdateDateTime);
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