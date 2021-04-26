Create Table If Not Exists employeesXphones(
    EXP_PK_EmployeeXPhoneId Int Not Null Primary Key Auto_Increment,
    EXP_FK_PhoneId Int Not Null,
    EXP_FK_EmployeeId Int Not Null,
    FOREIGN KEY (EXP_FK_EmployeeId) REFERENCES employeess(EMP_PK_EmployeeId),
    FOREIGN KEY (EXP_FK_PhoneId) REFERENCES phones(PHO_PK_PhoneId)
);