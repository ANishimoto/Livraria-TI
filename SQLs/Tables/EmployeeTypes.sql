Create Table If Not Exists EmployeeTypes(
    ETP_PK_EmployeeTypeId Int Not Null Primary Key Auto_Increment,
    ETP_STR_Description Varchar(255) Not Null,
    ETP_BOL_Active TinyInt Not Null Default 1,
    ETP_DTT_CreateDateTime DateTime not Null Default now(),
    ETP_DTT_UpdateDateTime DateTime not Null Default now()
);