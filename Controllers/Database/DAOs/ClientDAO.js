//Imports
    const Client = require("../../../Models/Domain/Client");
    const connection = require("../database");
    const IDAO = require("./IDAO");
    const GetDateNow = require("../../Strategies/Dates/GetDateNow");
    const Address = require("../../../Models/Domain/Address");
    const Phone = require("../../../Models/Domain/Phone");
    const CreditCard = require("../../../Models/Domain/CreditCard");
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
                                                            INTO clients (  
                                                                            CLI_STR_Name, 
                                                                            CLI_STR_CPF, 
                                                                            CLI_DTD_Birth, 
                                                                            CLI_FK_GenderId,
                                                                            CLI_FK_ClientTypeId,
                                                                            CLI_DTT_CreateDateTime, 
                                                                            CLI_DTT_UpdateDateTime
                                                                        )
                                                            VALUES      (
                                                                            "${entity.getName()}",
                                                                            "${cpf.getCode()}",
                                                                            "${entity.getBirth()}",
                                                                            ${entity.getGender().getId()},
                                                                            ${entity.getClientType().getId()},
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
                                                INTO clientsXusers (    
                                                                        CXU_FK_UserId, 
                                                                        CXU_FK_ClientId
                                                                    )
                                                VALUES      (
                                                                ${entity.getUser().getId()},
                                                                ${entity.getId()}
                                                            )
                                            `)
                    entity.getPhones().forEach(async phone => {
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
                                                                            "${phone.getNumber()}",
                                                                            "${phone.getDDD()}",
                                                                            ${phone.getPhoneType().getId()},
                                                                            "${phone.getCreateDate()}",
                                                                            "${phone.getUpdateDate()}"
                                                                        )
                                                        `)
                        phone.setId(result[0].insertId);
                        await connection.raw  (`
                                                    INSERT 
                                                    INTO clientsXphones (    
                                                                            CXP_FK_PhoneId, 
                                                                            CXP_FK_ClientId
                                                                        )
                                                    VALUES      (
                                                                    ${phone.getId()},
                                                                    ${entity.getId()}
                                                                )
                                                `);
                        });
                    entity.getCreditCards().forEach(async creditCard => {
                        result = await connection.raw   (`
                                                            INSERT 
                                                            INTO creditcards (    
                                                                                CRE_FK_Company, 
                                                                                CRE_STR_PrintedName,
                                                                                CRE_STR_Number, 
                                                                                CRE_STR_SecureCode,
                                                                                CRE_DTT_InsertedDateTime, 
                                                                                CRE_DTT_UpdatedDateTime
                                                                            )
                                                            VALUES  (
                                                                        ${creditCard.getCompany().getId()},
                                                                        "${creditCard.getPrintedName()}",
                                                                        "${creditCard.getNumber()}",
                                                                        "${creditCard.getSecureCode()}",
                                                                        "${creditCard.getCreateDate()}",
                                                                        "${creditCard.getUpdateDate()}"
                                                                    )
                                                        `)
                        creditCard.setId(result[0].insertId);
                        await connection.raw  (`
                                                    INSERT 
                                                    INTO clientsXcreditcards (    
                                                                                CXC_FK_CreditCardId, 
                                                                                CXC_FK_ClientId
                                                                            )
                                                    VALUES      (
                                                                    ${creditCard.getId()},
                                                                    ${entity.getId()}
                                                                )
                                                `);
                    });
                    entity.getAddresses().forEach(async address => {
                        result = await connection.raw   (`
                                                            INSERT 
                                                            INTO addresses (     
                                                                                ADD_FK_AddressType,
                                                                                ADD_FK_ResidenceType, 
                                                                                ADD_FK_PublicPlaceType,
                                                                                ADD_STR_PublicPlace, 
                                                                                ADD_STR_Neighborhood,
                                                                                ADD_STR_Number,
                                                                                ADD_STR_CEP,
                                                                                ADD_STR_City,
                                                                                ADD_STR_State,
                                                                                ADD_STR_Country,
                                                                                ADD_STR_Notes,
                                                                                ADD_DTT_CreateDateTime,
                                                                                ADD_DTT_UpdateDateTime
                                                                            )
                                                            VALUES  (
                                                                        ${address.getAddressType().getId()},
                                                                        ${address.getResidenceType().getId()},
                                                                        ${address.getPublicPlaceType().getId()},
                                                                        "${address.getPublicPlace()}",
                                                                        "${address.getNeighborhood()}",
                                                                        "${address.getNumber()}",
                                                                        "${address.getCep()}",
                                                                        "${address.getCity().getDescription()}",
                                                                        "${address.getCity().getState().getDescription()}",
                                                                        "${address.getCity().getState().getCountry().getDescription()}",
                                                                        "${address.getComplement()}",
                                                                        "${address.getCreateDate()}",
                                                                        "${address.getUpdateDate()}"
                                                                    )
                                                        `)
                        address.setId(result[0].insertId);
                        await connection.raw  (`
                                                    INSERT 
                                                    INTO clientsXaddress    (    
                                                                                CXA_FK_AddressId, 
                                                                                CXA_FK_ClientId
                                                                            )
                                                    VALUES      (
                                                                    ${address.getId()},
                                                                    ${entity.getId()}
                                                                )
                                                `);
                    });
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
                    let clientType = (entity.getClientType().getId() == null) ? null : `${entity.getClientType().getId()}`;
                    let birth = (entity.getBirth() == null) ? null : `"${entity.getBirth()}"`;
                    let ranking = (entity.getRanking() == null) ? null : `${entity.getRanking()}`;

                    let sets = '';
                    if(name != null && name.trim() != '') {sets += `, CLI_STR_Name = "${name}"`}
                    if(isActive != null && isActive.trim() != '') {sets += `, CLI_BOL_Active = ${isActive}`}
                    if(gender != null && gender.trim() != '') {sets += `, CLI_FK_GenderId = ${gender}`}
                    if(clientType != null && clientType.trim() != '') {sets += `, CLI_FK_ClientTypeId = ${clientType}`}
                    if(birth != null && birth.trim() != '') {sets += `, CLI_DTD_Birth = "${birth}"`}
                    if(ranking != null && ranking.trim() != '') {sets += `, CLI_INT_Rank = ${ranking}`} 

                    let dateNow = GetDateNow.process(new Date());
                    if(id != null && !isNaN(id.trim())){
                        await connection.query  (`
                                                    UPDATE clients
                                                    SET CLI_DTT_UpdateDateTime = ${dateNow} ${sets} 
                                                    WHERE CLI_PK_ClientId = ${id}
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
                                                    FROM clients
                                                    WHERE CLI_PK_ClientId = ${id}
                                                `)
                    }
                });
            } catch (err) {
                console.log(err);
            };
        };

        async search(entity){
            try{      
                let clients = [];
                await connection.transaction(async trans => {
                    let name = (entity.getName() == null) ? null : `"${entity.getName()}"`;
                    let id = (entity.getId() == null) ? null : `${entity.getId()}`;
                    let userId = (entity.getUser().getId() == null) ? null : `${entity.getUser().getId()}`;
                    let userTypeId = (entity.getUser().getUserType().getId() == null) ? null : `${entity.getUser().getUserType().getId()}`;
                    let isActive = (entity.getIsActive() == null) ? null : `${entity.getIsActive()}`;
                    let gender = (entity.getGender().getId() == null) ? null : `${entity.getGender().getId()}`;
                    let clientType = (entity.getClientType().getId() == null) ? null : `${entity.getClientType().getId()}`;
                    let birth = (entity.getBirth() == null) ? null : `"${entity.getBirth()}"`;
                    let ranking = (entity.getRanking() == null) ? null : `${entity.getRanking()}`;
                    let document = entity.getDocuments().find(element => element.getDocumentType().getName() == "CPF");
                    let cpf = null;  
                    if(document != undefined){
                        cpf = (document.getCode() == null) ? null : `"${document.getCode()}"`;
                    };
                    await connection.raw( `
                                            SELECT clients.*,  
                                                   users.*
                                            FROM clients
                                                    INNER JOIN 
                                                 clientsXusers ON (CLI_PK_ClientId = CXU_FK_ClientId)
                                                    INNER JOIN 
                                                 users ON (CXU_FK_UserId = USE_PK_UserId)
                                                    INNER JOIN 
                                                 usersTypes ON (UTP_PK_UserTypeId = USE_FK_TpUser)
                                            WHERE (
                                                    (     
                                                        ${isActive}  IS NULL
                                                            OR
                                                        (
                                                            ${isActive} IS NOT NULL
                                                                AND
                                                            ${isActive} = CLI_BOL_Active
                                                        )
                                                    )
                                                    AND (
                                                            ${name}  IS NULL
                                                                OR
                                                            (
                                                                ${name} IS NOT NULL
                                                                    AND
                                                                ${name} = CLI_STR_Name
                                                            )
                                                        )
                                                    AND (
                                                        ${id} IS NULL
                                                            OR
                                                        (
                                                            ${id} IS NOT NULL
                                                                AND
                                                            ${id} = CLI_PK_ClientId
                                                        )
                                                    )
                                                    AND (
                                                        ${gender} IS NULL
                                                            OR
                                                        (
                                                            ${gender} IS NOT NULL
                                                                AND
                                                            ${gender} = CLI_FK_GenderId
                                                        )
                                                    )
                                                    AND (
                                                        ${clientType} IS NULL
                                                            OR
                                                        (
                                                            ${clientType} IS NOT NULL
                                                                AND
                                                            ${clientType} = CLI_FK_ClientTypeId
                                                        )
                                                    )
                                                    AND (
                                                        ${birth} IS NULL
                                                            OR
                                                        (
                                                            ${birth} IS NOT NULL
                                                                AND
                                                            ${birth} = CLI_DTD_Birth
                                                        )
                                                    )
                                                    AND (
                                                        ${ranking} IS NULL
                                                            OR
                                                        (
                                                            ${ranking} IS NOT NULL
                                                                AND
                                                            ${ranking} = CLI_INT_Rank
                                                        )
                                                    )
                                                    AND (
                                                        ${cpf} IS NULL
                                                            OR
                                                        (
                                                            ${cpf} IS NOT NULL
                                                                AND
                                                            ${cpf} = CLI_STR_CPF
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
                                            ORDER BY CLI_PK_ClientId
                                        `).then(async datas => {
                                            for (const data of datas[0]) {
                                                let client = new Client();
                                                let document_cpf = new Document();
                                                document_cpf.setCode(data.CLI_STR_CPF);
                                                document_cpf.getDocumentType().setName("CPF");
                                                client.addDocument(document_cpf);
                                                client.setId(data.CLI_PK_ClientId);
                                                client.setName(data.CLI_STR_Name);
                                                client.getGender().setId(data.CLI_FK_GenderId);
                                                client.getClientType().setId(data.CLI_FK_ClientTypeId);
                                                client.setBirth(ConvertDateDBtoApp.process(data.CLI_DTD_Birth));
                                                client.setRanking(data.CLI_INT_Rank);
                                                client.setIsActive(data.CLI_BOL_Active == 1 ? true : false);
                                                client.setCreateDate(data.CLI_DTT_CreateDateTime);
                                                client.setUpdateDate(data.CLI_DTT_UpdateDateTime);
                                                client.getUser().setId(data.USE_PK_UserId);
                                                client.getUser().setEmail(data.USE_STR_Email);
                                                client.getUser().getUserType().setId(data.USE_FK_TpUser);

                                                await connection.raw( ` 
                                                                        SELECT addresses.*
                                                                        FROM clientsXaddress
                                                                                INNER JOIN
                                                                                addresses ON (CXA_FK_AddressId = ADD_PK_AddressId)
                                                                        WHERE (CXA_FK_ClientId = ${client.getId()})
                                                                    `).then(datas => {
                                                                        datas[0].forEach( data => {
                                                                            let address = new Address();
                                                                            address.setId(data.ADD_PK_AddressId);
                                                                            address.setPublicPlace(data.ADD_STR_PublicPlace);
                                                                            address.setNumber(data.ADD_STR_Number);
                                                                            address.setCep(data.ADD_STR_CEP);
                                                                            address.setComplement(data.ADD_STR_Notes);
                                                                            address.getCity().setDescription(data.ADD_STR_City);
                                                                            address.getCity().getState().setDescription(data.ADD_STR_State);
                                                                            address.getCity().getState().getCountry().setDescription(data.ADD_STR_Country);
                                                                            address.getAddressType().setId(data.ADD_FK_AddressType);
                                                                            address.getResidenceType().setId(data.ADD_FK_ResidenceType);
                                                                            address.getPublicPlaceType().setId(data.ADD_FK_PublicPlaceType);
                                                                            address.setNeighborhood(data.ADD_STR_Neighborhood);
                                                                            address.setIsActive(data.ADD_BOL_Active == 1 ? true : false);
                                                                            address.setCreateDate(data.ADD_DTT_CreateDateTime);
                                                                            address.setUpdateDate(data.ADD_DTT_UpdateDateTime);
                                                                            client.addAddress(address);
                                                                        });
                                                                    }).catch(err => {
                                                                        console.log(err);
                                                                    });
                                                                    
                                                await connection.raw( ` 
                                                                        SELECT phones.* 
                                                                        FROM clientsXphones
                                                                                INNER JOIN
                                                                             phones ON (CXP_FK_PhoneId = PHO_PK_PhoneId)
                                                                        WHERE (CXP_FK_ClientId = ${client.getId()})
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
                                                                            client.addPhone(phone);
                                                                        };
                                                                        }).catch(err => {
                                                                            console.log(err);
                                                                        });
                                                                    
                                                await connection.raw( ` 
                                                                        SELECT creditcards.* 
                                                                        FROM clientsXcreditcards
                                                                                INNER JOIN
                                                                             creditcards ON (CXC_FK_CreditCardId = CRE_PK_CreditCardId)
                                                                        WHERE (CXC_FK_ClientId = ${client.getId()})
                                                                    `).then(datas => {
                                                                        for (const data of datas[0]) {
                                                                            let creditCard = new CreditCard();
                                                                            creditCard.setId(data.CRE_PK_CreditCardId);
                                                                            creditCard.setPrintedName(data.CRE_STR_PrintedName);
                                                                            creditCard.setNumber(data.CRE_STR_Number);
                                                                            creditCard.setSecureCode(data.CRE_STR_SecureCode);
                                                                            creditCard.getCompany().setId(data.CRE_FK_Company);
                                                                            creditCard.setIsActive(data.CRE_BOL_Active == 1 ? true : false);
                                                                            creditCard.setCreateDate(data.CRE_DTT_InsertedDateTime);
                                                                            creditCard.setUpdateDate(data.CRE_DTT_UpdatedDateTime);
                                                                            client.addCreditCard(creditCard);
                                                                        };
                                                                        }).catch(err => {
                                                                            console.log(err);
                                                                        });

                                                clients.push(client);
                                            };
                                        }).catch(err => {
                                            console.log(err);
                                        });
                });
                return clients;
            } catch (err) {
                console.log(err);
            };
        };
    };

//Exports
    module.exports = DAO;