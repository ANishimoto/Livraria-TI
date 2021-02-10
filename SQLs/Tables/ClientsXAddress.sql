Create Table If Not Exists clientsXaddress(
    CXA_PK_ClientXAddressId Int Not Null Primary Key Auto_Increment,
    CXA_FK_AddressId Int Not Null,
    CXA_FK_ClientId Int Not Null,
    FOREIGN KEY (CXA_FK_ClientId) REFERENCES clients(CLI_PK_ClientId),
    FOREIGN KEY (CXA_FK_AddressId) REFERENCES address(ADD_PK_AddressId)
);