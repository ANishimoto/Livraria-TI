Create Table If Not Exists employeesXusers(
    EXU_PK_EmployeeXUserId Int Not Null Primary Key Auto_Increment,
    EXU_FK_UserId Int Not Null,
    EXU_FK_EmployeeId Int Not Null,
    FOREIGN KEY (EXU_FK_EmployeeId) REFERENCES employees(EMP_PK_EmployeeId),
    FOREIGN KEY (EXU_FK_UserId) REFERENCES users(USE_PK_UserId)
);