//Imports
    const CreditCardCompany = require("../../../Models/Domain/CreditCardCompany");
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
                let companies = [];
                await connection.transaction(async trans => {
                    let description = (entity.getDescription() == null) ? null : `"${entity.getDescription()}"`;
                    let id = (entity.getId() == null) ? null : `${entity.getId()}`;
                    let isActive = (entity.getIsActive() == null) ? null : `${entity.getIsActive()}`;
                    await connection.raw( `
                                            SELECT * 
                                            FROM CreditCardCompanies
                                            WHERE (
                                                    (     
                                                        ${isActive}  IS NULL
                                                            OR
                                                        (
                                                            ${isActive} IS NOT NULL
                                                                AND
                                                            ${isActive} = CCC_BOL_Active
                                                        )
                                                    )
                                                    AND (
                                                            ${description}  IS NULL
                                                                OR
                                                            (
                                                                ${description} IS NOT NULL
                                                                    AND
                                                                ${description} = CCC_STR_CompanyName
                                                            )
                                                        )
                                                    AND (
                                                        ${id} IS NULL
                                                            OR
                                                        (
                                                            ${id} IS NOT NULL
                                                                AND
                                                            ${id} = CCC_PK_CompanyId
                                                        )
                                                    )
                                            )
                                            ORDER BY CCC_STR_CompanyName
                                        `).then(datas => {
                                            datas[0].forEach( data => {
                                                let company = new CreditCardCompany();
                                                company.setId(data.CCC_PK_CompanyId);
                                                company.setDescription(data.CCC_STR_CompanyName);
                                                company.setIsActive(data.CCC_BOL_Active);
                                                company.setCreateDate(data.CCC_DTT_CreateDateTime);
                                                company.setUpdateDate(data.CCC_DTT_UpdateDateTime);
                                                companies.push(company);
                                            });
                                        }).catch(err => {
                                            console.log(err);
                                        });
                });
                return companies;
            } catch (err) {
                console.log(err);
            };
        };
    };

//Exports
    module.exports = DAO;