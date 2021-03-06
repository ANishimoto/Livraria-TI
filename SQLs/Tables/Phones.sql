Create Table If Not Exists phones(
    PHO_PK_PhoneId Int Not Null Primary Key Auto_Increment,
    PHO_STR_Number Char(9) Not Null,
    PHO_STR_DDD Char(2) Not Null,
    PHO_FK_PhoneTypeId Int Not Null,
    PHO_BOL_Active TinyInt Not Null Default 1,
    PHO_DTT_InsertedDateTime DateTime not Null Default now(),
    PHO_DTT_UpdatedDateTime DateTime not Null Default now(),
    FOREIGN KEY (PHO_FK_PhoneTypeId) REFERENCES PhoneTypes(PTP_PK_PhoneTypeId)
);