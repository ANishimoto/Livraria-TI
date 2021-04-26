//Imports
    const User = require("../../../Models/Domain/User");
    const connection = require("../database");
    const IDAO = require("./IDAO");

//DAO class
    class DAO extends IDAO{
        
        create(entity){
            try{      
                connection.transaction(async trans => {
                    connection.raw(`
                                            INSERT 
                                            INTO users (USE_STR_Email, USE_STR_Password, USE_FK_TpUser)
                                            VALUES ("${entity.getEmail()}", "${entity.getPassword()}", ${entity.getUserType().getId()})
                                        `)
                });
            } catch (err) {
                console.log(err);
            };
        };

        update(entity){
            try{      
                connection.transaction(async trans => {
                    connection.raw(`
                                            UPDATE users
                                            SET USE_STR_Email = "${entity.getEmail()}", 
                                                USE_STR_Password = "${entity.getPassword()}",
                                                USE_FK_TpUser = "${entity.getUserType().getId()}",
                                            WHERE USE_PK_UserId = "${entity.getId()}"; 
                                        `)
                });
            } catch (err) {
                console.log(err);
            };
        };
        
        delete(entity){
            try{      
                connection.transaction(async trans => {
                    connection.raw(`
                                            DELETE 
                                            FROM users
                                            WHERE USE_PK_UserId
                                        `)
                });
            } catch (err) {
                console.log(err);
            };
        };
    
        async search(entity){
            try{      
                let users = [];
                await connection.transaction(async trans => {
                    let email = (entity.getEmail() == null) ? null : `"${entity.getEmail()}"`;
                    let id = (entity.getId() == null) ? null : `${entity.getId()}`;
                    let isActive = (entity.getIsActive() == null) ? null : `${entity.getIsActive()}`;
                    let userTypeId = (entity.getUserType().getId() == null) ? null : `${entity.getUserType().getId()}`;
                    let typeIsActive = (entity.getUserType().getIsActive() == null) ? null : `${entity.getUserType().getIsActive()}`;
                    await connection.raw( `
                                            SELECT * 
                                            FROM users 
                                                INNER JOIN UsersTypes
                                                    ON (USE_FK_TpUser = UTP_PK_UserTypeId) 
                                            WHERE   (
                                                        (     
                                                            ${isActive}  IS NULL
                                                                OR
                                                            (
                                                                ${isActive} IS NOT NULL
                                                                    AND
                                                                ${isActive} = USE_BOL_Active
                                                            )
                                                        )
                                                        AND (
                                                                ${email}  IS NULL
                                                                    OR
                                                                (
                                                                    ${email} IS NOT NULL
                                                                        AND
                                                                    ${email} = USE_STR_Email
                                                                )
                                                            )
                                                        AND (
                                                            ${id} IS NULL
                                                                OR
                                                            (
                                                                ${id} IS NOT NULL
                                                                    AND
                                                                ${id} = USE_PK_UserId
                                                            )
                                                        )
                                                        AND (
                                                            ${userTypeId} IS NULL
                                                                OR
                                                            (
                                                                ${userTypeId} IS NOT NULL
                                                                    AND
                                                                ${userTypeId} = USE_FK_TpUser
                                                            )
                                                        )
                                                        AND (     
                                                            ${typeIsActive}  IS NULL
                                                                OR
                                                            (
                                                                ${typeIsActive} IS NOT NULL
                                                                    AND
                                                                ${typeIsActive} = UTP_BOL_Active
                                                            )
                                                        )
                                            )
                                        `).then(datas => {
                                            datas[0].forEach( data => {
                                                let user = new User();
                                                user.setId(data.USE_PK_UserId)
                                                user.setEmail(data.USE_STR_Email);
                                                user.setPassword(data.USE_STR_Password);
                                                user.getUserType().setId(data.USE_FK_TpUser);
                                                user.getUserType().setDescription(data.UTP_STR_Description);
                                                users.push(user);
                                            });
                                        }).catch(err => {
                                            console.log(err);
                                        });
                                    });
                return users;
            } catch (err) {
                console.log(err);
            };
        };
    };

//Exports
    module.exports = DAO;