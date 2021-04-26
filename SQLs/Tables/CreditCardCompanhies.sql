Create Table If Not Exists CreditCardCompanies(
    CCC_PK_CompanyId Int Not Null Primary Key Auto_Increment,
    CCC_STR_CompanyName Varchar(255) Not Null,
    CCC_BOL_Active TinyInt Not Null Default 1,
    CCC_DTT_CreateDateTime DateTime not Null Default now(),
    CCC_DTT_UpdateDateTime DateTime not Null Default now()
);