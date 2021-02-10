Create Table If Not Exists Sexs(
    SEX_PK_SexId Int Not Null Primary Key Auto_Increment,
    SEX_STR_Name Varchar(255) Not Null,
    SEX_BOL_Active TinyInt Not Null Default 1,
    SEX_DTT_InsertedDateTime DateTime not Null Default now(),
    SEX_DTT_UpdatedDateTime DateTime not Null Default now()
);