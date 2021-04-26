Create Table If Not Exists Genders(
    GEN_PK_GenderId Int Not Null Primary Key Auto_Increment,
    GEN_STR_Description Varchar(255) Not Null,
    GEN_BOL_Active TinyInt Not Null Default 1,
    GEN_DTT_CreateDateTime DateTime not Null Default now(),
    GEN_DTT_UpdateDateTime DateTime not Null Default now()
);