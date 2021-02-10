Create Table If Not Exists clientsXusers(
    CXU_PK_ClientXUserId Int Not Null Primary Key Auto_Increment,
    CXU_FK_UserId Int Not Null,
    CXU_FK_ClientId Int Not Null,
    FOREIGN KEY (CXU_FK_ClientId) REFERENCES clients(CLI_PK_ClientId),
    FOREIGN KEY (CXU_FK_UserId) REFERENCES users(USE_PK_UserId)
);