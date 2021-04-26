Create Table If Not Exists clients(
    CLI_PK_ClientId Int Not Null Primary Key Auto_Increment,
    CLI_STR_Name Varchar(255) Not Null,
    CLI_STR_CPF Char(14) Not Null,
    CLI_FK_GenderId Int Not Null,
    CLI_FK_ClientTypeId Int Not Null,
    CLI_DTD_Birth Date Not Null,
    CLI_BOL_Active TinyInt Not Null Default 1,
    CLI_INT_Rank Int Default Null,
    CLI_DTT_CreateDateTime DateTime Not Null Default now(),
    CLI_DTT_UpdateDateTime DateTime not Null Default now(),
    FOREIGN KEY (CLI_FK_GenderId) REFERENCES genders(GEN_PK_GenderId),
    FOREIGN KEY (CLI_FK_ClientTypeId) REFERENCES ClientTypes(CTP_PK_ClientTypeId)
);