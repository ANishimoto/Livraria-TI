Create Table If Not Exists employees(
    EMP_PK_EmployeeId Int Not Null Primary Key Auto_Increment,
    EMP_STR_Name Varchar(255) Not Null,
    EMP_STR_CPF Char(14) Not Null,
    EMP_FK_GenderId Int Not Null,
    EMP_FK_EmployeeTypeId Int Not Null,
    EMP_DTD_Birth Date Not Null,
    EMP_BOL_Active TinyInt Not Null Default 1,
    EMP_DTT_CreateDateTime DateTime Not Null Default now(),
    EMP_DTT_UpdateDateTime DateTime not Null Default now(),
    FOREIGN KEY (EMP_FK_GenderId) REFERENCES genders(GEN_PK_GenderId),
    FOREIGN KEY (EMP_FK_EmployeeTypeId) REFERENCES EmployeeTypes(ETP_PK_EmployeeTypeId)
);