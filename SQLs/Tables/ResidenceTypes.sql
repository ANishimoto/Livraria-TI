Create Table If Not Exists ResidenceTypes(
    RDT_PK_ResidenceId Int Not Null Primary Key Auto_Increment,
    RDT_STR_Name Varchar(20) Not Null,
    RDT_BOL_Active TinyInt Not Null Default 1,
    RDT_DTT_InsertedDateTime DateTime not Null Default now(),
    RDT_DTT_UpdatedDateTime DateTime not Null Default now()
);