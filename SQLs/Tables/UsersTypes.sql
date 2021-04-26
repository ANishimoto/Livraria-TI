Create Table If Not Exists usersTypes(
    UTP_PK_UserTypeId Int Not Null Primary Key Auto_Increment,
    UTP_STR_Description Varchar(255) Not Null,
    UTP_BOL_Active TinyInt Not Null Default 1,
    UTP_DTT_CreateDateTime DateTime not Null Default now(),
    UTP_DTT_UpdateDateTime DateTime not Null Default now()
);