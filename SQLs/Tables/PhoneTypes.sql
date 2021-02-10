Create Table If Not Exists PhoneTypes(
    PTP_PK_PhoneTypeId Int Not Null Primary Key Auto_Increment,
    PTP_STR_Name Varchar(255) Not Null,
    PTP_BOL_Active TinyInt Not Null Default 1,
    PTP_DTT_InsertedDateTime DateTime not Null Default now(),
    PTP_DTT_UpdatedDateTime DateTime not Null Default now()
);