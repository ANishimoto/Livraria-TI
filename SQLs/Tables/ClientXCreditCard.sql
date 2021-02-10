Create Table If Not Exists clientsXcreditcards(
    CXC_PK_ClientsXCreditCardsId Int Not Null Primary Key Auto_Increment,
    CXC_FK_CreditCardId Int Not Null,
    CXC_FK_ClientId Int Not Null,
    FOREIGN KEY (CXC_FK_ClientId) REFERENCES clients(CLI_PK_ClientId),
    FOREIGN KEY (CXC_FK_CreditCardId) REFERENCES creditcards(CRE_PK_CreditCardId)
);