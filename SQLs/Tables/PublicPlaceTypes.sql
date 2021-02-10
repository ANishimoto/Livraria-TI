Create Table If Not Exists PublicPlaceTypes(
    PPT_PK_PublicPlaceId Int Not Null Primary Key Auto_Increment,
    PPT_STR_Name Varchar(20) Not Null,
    PPT_BOL_Active TinyInt Not Null Default 1,
    PPT_DTT_InsertedDateTime DateTime not Null Default now(),
    PPT_DTT_UpdatedDateTime DateTime not Null Default now()
);