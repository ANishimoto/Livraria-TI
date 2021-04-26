Create Table If Not Exists users(
    USE_PK_UserId Int Not Null Primary Key Auto_Increment,
    USE_FK_TpUser Int Not Null Default 0,
    USE_STR_Email Varchar(255) Not Null,
    USE_STR_Password Varchar(255) Not Null,
    USE_BOL_Active TinyInt Not Null Default 1,
    USE_DTT_CreateDateTime DateTime not Null Default now(),
    USE_DTT_UpdateDateTime DateTime not Null Default now(),
    FOREIGN KEY (USE_FK_TpUser) REFERENCES UsersTypes(UTP_PK_UserTypeId)
);