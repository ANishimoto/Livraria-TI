//Imports
    const Employee = require("../../../Models/Domain/Employee");
    const connection = require("../database");
    const IDAO = require("./IDAO");
    const GetDateNow = require("../../Strategies/Dates/GetDateNow");
    const Phone = require("../../../Models/Domain/Phone");
    const Document = require("../../../Models/Domain/Document");
    const ConvertDateDBtoApp = require("../../Strategies/Dates/ConvertDateDBtoApp");

//DAO class
    class DAO extends IDAO{
        
        async create(entity){
            try{      
                await connection.transaction(async trans => {
                    let cpf = entity.getDocuments().find(element => element.getDocumentType().getName() == "CPF");
                    let result = await connection.raw   (`
                                                            INSERT 
                                                            INTO employees (  
                                                                            EMP_STR_Name, 
                                                                            EMP_STR_CPF, 
                                                                            EMP_DTD_Birth, 
                                                                            EMP_FK_GenderId,
                                                                            EMP_FK_EmployeeTypeId,
                                                                            EMP_DTT_CreateDateTime, 
                                                                            EMP_DTT_UpdateDateTime
                                                                        )
                                                            VALUES      (
                                                                            "${entity.getName()}",
                                                                            "${cpf.getCode()}",
                                                                            "${entity.getBirth()}",
                                                                            ${entity.getGender().getId()},
                                                                            ${entity.getEmployeeType().getId()},
                                                                            "${entity.getCreateDate()}",
                                                                            "${entity.getUpdateDate()}"
                                                                        )
                                                        `);
                    entity.setId(result[0].insertId);
                    result = await connection.raw   (`
                                                        INSERT 
                                                        INTO users (  
                                                                        USE_FK_TpUser, 
                                                                        USE_STR_Email, 
                                                                        USE_STR_Password, 
                                                                        USE_DTT_CreateDateTime, 
                                                                        USE_DTT_UpdateDateTime
                                                                    )
                                                        VALUES      (
                                                                        ${entity.getUser().getUserType().getId()},
                                                                        "${entity.getUser().getEmail()}",
                                                                        "${entity.getUser().getPassword()}",
                                                                        "${entity.getUser().getCreateDate()}",
                                                                        "${entity.getUser().getUpdateDate()}"
                                                                    )
                                                    `)
                    entity.getUser().setId(result[0].insertId);
                    await connection.raw  (`
                                                INSERT 
                                                INTO employeesXusers (    
                                                                        EXU_FK_UserId, 
                                                                        EXU_FK_EmployeeId
                                                                    )
                                                VALUES      (
                                                                ${entity.getUser().getId()},
                                                                ${entity.getId()}
                                                            )
                                            `)
                    result = await connection.raw   (`
                                                        INSERT 
                                                        INTO phones (    
                                                                        PHO_STR_Number, 
                                                                        PHO_STR_DDD,
                                                                        PHO_FK_PhoneTypeId, 
                                                                        PHO_DTT_InsertedDateTime, 
                                                                        PHO_DTT_UpdatedDateTime
                                                                    )
                                                        VALUES      (
                                                                        "${entity.getPhone().getNumber()}",
                                                                        "${entity.getPhone().getDDD()}",
                                                                        ${entity.getPhone().getPhoneType().getId()},
                                                                        "${entity.getPhone().getCreateDate()}",
                                                                        "${entity.getPhone().getUpdateDate()}"
                                                                    )
                                                    `)
                    entity.getPhone().setId(result[0].insertId);
                    await connection.raw  (`
                                                INSERT 
                                                INTO employeesXphones (    
                                                                        EXP_FK_PhoneId, 
                                                                        EXP_FK_EmployeeId
                                                                    )
                                                VALUES      (
                                                                ${entity.getPhone().getId()},
                                                                ${entity.getId()}
                                                            )
                                            `);
                });
            } catch (err) {
                console.log(err);
            };
        };

        async update(entity){
            try{
                await connection.transaction(async trans => {
                    let id = (entity.getId() == null) ? null : `${entity.getId()}`;
                    let name = (entity.getName() == null) ? null : `"${entity.getName()}"`;
                    let isActive = (entity.getIsActive() == null) ? null : `${entity.getIsActive()}`;
                    let gender = (entity.getGender().getId() == null) ? null : `${entity.getGender().getId()}`;
                    let employeeType = (entity.getEmployeeType().getId() == null) ? null : `${entity.getEmployeeType().getId()}`;
                    let birth = (entity.getBirth() == null) ? null : `"${entity.getBirth()}"`;

                    let sets = '';
                    if(name != null && name.trim() != '') {sets += `, EMP_STR_Name = "${name}"`}
                    if(isActive != null && isActive.trim() != '') {sets += `, EMP_BOL_Active = ${isActive}`}
                    if(gender != null && gender.trim() != '') {sets += `, EMP_FK_GenderId = ${gender}`}
                    if(employeeType != null && employeeType.trim() != '') {sets += `, EMP_FK_EmployeeTypeId = ${employeeType}`}
                    if(birth != null && birth.trim() != '') {sets += `, EMP_DTD_Birth = "${birth}"`}

                    let dateNow = GetDateNow.process(new Date());
                    if(id != null && !isNaN(id.trim())){
                        await connection.query  (`
                                                    UPDATE emlpoyees
                                                    SET EMP_DTT_UpdateDateTime = ${dateNow} ${sets} 
                                                    WHERE EMP_PK_EmployeeId = ${id}
                                                `)
                    };
                });
            } catch (err) {
                console.log(err);
            };
        };
        
        async delete(entity){
            try{
                await connection.transaction(async trans => {
                    let id = entity.getId();
                    if(id != null && !isNaN(id.trim())){
                        await connection.query  (`
                                                    DELETE 
                                                    FROM employees
                                                    WHERE EMP_PK_EmployeeId = ${id}
                                                `)
                    }
                });
            } catch (err) {
                console.log(err);
            };
        };

        async search(entity){
            try{      
                let employees = [];
                await connection.transaction(async trans => {
                    let name = (entity.getName() == null) ? null : `"${entity.getName()}"`;
                    let id = (entity.getId() == null) ? null : `${entity.getId()}`;
                    let userId = (entity.getUser().getId() == null) ? null : `${entity.getUser().getId()}`;
                    let userTypeId = (entity.getUser().getUserType().getId() == null) ? null : `${entity.getUser().getUserType().getId()}`;
                    let isActive = (entity.getIsActive() == null) ? null : `${entity.getIsActive()}`;
                    let gender = (entity.getGender().getId() == null) ? null : `${entity.getGender().getId()}`;
                    let employeeType = (entity.getEmployeeType().getId() == null) ? null : `${entity.getEmployeeType().getId()}`;
                    let birth = (entity.getBirth() == null) ? null : `"${entity.getBirth()}"`;
                    let document = entity.getDocuments().find(element => element.getDocumentType().getName() == "CPF");
                    let cpf = null;  
                    if(document != undefined){
                        cpf = (document.getCode() == null) ? null : `"${document.getCode()}"`;
                    };
                    await connection.raw( `
                                            SELECT employees.*,  
                                                   users.*
                                            FROM employees
                                                    INNER JOIN 
                                                 employeesXusers ON (EMP_PK_EmployeeId = EXU_FK_EmployeeId)
                                                    INNER JOIN 
                                                 users ON (EXU_FK_UserId = USE_PK_UserId)
                                                    INNER JOIN 
                                                 usersTypes ON (UTP_PK_UserTypeId = USE_FK_TpUser)
                                            WHERE (
                                                    (     
                                                        ${isActive}  IS NULL
                                                            OR
                                                        (
                                                            ${isActive} IS NOT NULL
                                                                AND
                                                            ${isActive} = EMP_BOL_Active
                                                        )
                                                    )
                                                    AND (
                                                            ${name}  IS NULL
                                                                OR
                                                            (
                                                                ${name} IS NOT NULL
                                                                    AND
                                                                ${name} = EMP_STR_Name
                                                            )
                                                        )
                                                    AND (
                                                        ${id} IS NULL
                                                            OR
                                                        (
                                                            ${id} IS NOT NULL
                                                                AND
                                                            ${id} = EMP_PK_EmployeeId
                                                        )
                                                    )
                                                    AND (
                                                        ${gender} IS NULL
                                                            OR
                                                        (
                                                            ${gender} IS NOT NULL
                                                                AND
                                                            ${gender} = EMP_FK_GenderId
                                                        )
                                                    )
                                                    AND (
                                                        ${employeeType} IS NULL
                                                            OR
                                                        (
                                                            ${employeeType} IS NOT NULL
                                                                AND
                                                            ${employeeType} = EMP_FK_EmployeeTypeId
                                                        )
                                                    )
                                                    AND (
                                                        ${birth} IS NULL
                                                            OR
                                                        (
                                                            ${birth} IS NOT NULL
                                                                AND
                                                            ${birth} = EMP_DTD_Birth
                                                        )
                                                    )
                                                    AND (
                                                        ${cpf} IS NULL
                                                            OR
                                                        (
                                                            ${cpf} IS NOT NULL
                                                                AND
                                                            ${cpf} = EMP_STR_CPF
                                                        )
                                                    )
                                                    AND (
                                                        ${userId} IS NULL
                                                            OR
                                                        (
                                                            ${userId} IS NOT NULL
                                                                AND
                                                            ${userId} = USE_PK_UserId
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
                                            )
                                            ORDER BY EMP_PK_EmployeeId
                                        `).then(async datas => {
                                            for (const data of datas[0]) {
                                                let employee = new Employee();
                                                let document_cpf = new Document();
                                                document_cpf.setCode(data.EMP_STR_CPF);
                                                document_cpf.getDocumentType().setName("CPF");
                                                employee.addDocument(document_cpf);
                                                employee.setId(data.EMP_PK_EmployeeId);
                                                employee.setName(data.EMP_STR_Name);
                                                employee.getGender().setId(data.EMP_FK_GenderId);
                                                employee.getEmployeeType().setId(data.EMP_FK_EmployeeTypeId);
                                                employee.setBirth(ConvertDateDBtoApp.process(data.EMP_DTD_Birth));
                                                employee.setIsActive(data.EMP_BOL_Active == 1 ? true : false);
                                                employee.setCreateDate(data.EMP_DTT_CreateDateTime);
                                                employee.setUpdateDate(data.EMP_DTT_UpdateDateTime);
                                                employee.getUser().setId(data.USE_PK_UserId);
                                                employee.getUser().setEmail(data.USE_STR_Email);
                                                employee.getUser().getUserType().setId(data.USE_FK_TpUser);
                                                                    
                                                await connection.raw( ` 
                                                                        SELECT phones.* 
                                                                        FROM employeesXphones
                                                                                INNER JOIN
                                                                             phones ON (EXP_FK_PhoneId = PHO_PK_PhoneId)
                                                                        WHERE (EXP_FK_EmployeeId = ${employee.getId()})
                                                                    `).then(datas => {
                                                                        for (const data of datas[0]) {
                                                                            let phone = new Phone();
                                                                            phone.setId(data.PHO_PK_PhoneId);
                                                                            phone.setDDD(data.PHO_STR_DDD);
                                                                            phone.setNumber(data.PHO_STR_Number);
                                                                            phone.getPhoneType().setId(data.PHO_FK_PhoneTypeId);
                                                                            phone.setIsActive(data.PHO_BOL_Active == 1 ? true : false);
                                                                            phone.setCreateDate(data.PHO_DTT_InsertedDateTime);
                                                                            phone.setUpdateDate(data.PHO_DTT_UpdatedDateTime);
                                                                            employee.setPhone(phone);
                                                                        };
                                                                        }).catch(err => {
                                                                            console.log(err);
                                                                        });

                                                employees.push(employee);
                                            };
                                        }).catch(err => {
                                            console.log(err);
                                        });
                });
                return employees;
            } catch (err) {
                console.log(err);
            };
        };
    };

//Exports
    module.exports = DAO;