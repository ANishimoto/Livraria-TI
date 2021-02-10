Create Table If Not Exists clientsXphones(
    CXP_PK_ClientXPhoneId Int Not Null Primary Key Auto_Increment,
    CXP_FK_PhoneId Int Not Null,
    CXP_FK_ClientId Int Not Null,
    FOREIGN KEY (CXP_FK_ClientId) REFERENCES clients(CLI_PK_ClientId),
    FOREIGN KEY (CXP_FK_PhoneId) REFERENCES phones(PHO_PK_PhoneId)
);