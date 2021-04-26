Create Table If Not Exists creditcards(
    CRE_PK_CreditCardId Int Not Null Primary Key Auto_Increment,
    CRE_FK_Company Int Not Null Default 0,
    CRE_STR_PrintedName Varchar(45) Not Null,
    CRE_STR_Number Varchar(19) Not Null,
    CRE_STR_SecureCode Char(3) Not Null,
    CRE_BOL_Active TinyInt Not Null Default 1,
    CRE_DTT_InsertedDateTime DateTime not Null Default now(),
    CRE_DTT_UpdatedDateTime DateTime not Null Default now(),
    FOREIGN KEY (CRE_FK_Company) REFERENCES creditcardcompanies(CCC_PK_CompanyId)
);