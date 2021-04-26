Create Table If Not Exists ClientTypes(
    CTP_PK_ClientTypeId Int Not Null Primary Key Auto_Increment,
    CTP_STR_Description Varchar(255) Not Null,
    CTP_BOL_Active TinyInt Not Null Default 1,
    CTP_DTT_CreateDateTime DateTime not Null Default now(),
    CTP_DTT_UpdateDateTime DateTime not Null Default now()
);