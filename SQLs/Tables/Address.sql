Create Table If Not Exists phones(
    ADD_PK_AddressId Int Not Null Primary Key Auto_Increment,
    ADD_BOL_DefaultBill TinyInt Not Null Default 0,
    ADD_BOL_DefaultDelivery TinyInt Not Null Default 0,
    ADD_INT_TpResidence Int Not Null Default 0,
    ADD_INT_TpPublicPlace Int Not Null Default 0,
    ADD_STR_PublicPlace Varchar(70) Not Null,
    ADD_STR_Neighborhood Varchar(70) Not Null,
    ADD_STR_Number Char(3) Not Null,
    ADD_STR_CEP Char(8) Not Null,
    ADD_FK_CityId Int Not Null,
    ADD_STR_Notes Varchar(255),
    ADD_BOL_Active TinyInt Not Null Default 1,
    ADD_DTT_InsertedDateTime DateTime not Null Default now(),
    ADD_DTT_UpdatedDateTime DateTime not Null Default now(),
    FOREIGN KEY (ADD_FK_CityId) REFERENCES cities(CIT_PK_CityId)
);