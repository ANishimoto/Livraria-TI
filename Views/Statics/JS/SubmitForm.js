async function submitForm() {
    let message = "";

    let flgPassword = false;
    if (document.getElementById("password").value == document.getElementById("conf_password").value) {
        flgPassword = true;
    }
    else {
        message += "As senhas digitadas não são iguais.\n";
    };

    let flgBill = false;
    let address = document.getElementsByName("default_bill");
    address.forEach(element => {
        if (element.checked == true) {
            flgBill = true;
        };
    });

    if (!flgBill){
        message += "É obrigatório selecionar um endereço como endereço padrão de cobrança.\n";
    };

    let flgDelivery = false;
    address = document.getElementsByName("default_delivery");
    address.forEach(element => {
        if (element.checked == true) {
            flgDelivery = true;
        };
    });

    if (!flgDelivery){
        message += "É obrigatório selecionar um endereço como endereço padrão de entrega.\n";
    };

    if (!flgBill || !flgDelivery || !flgPassword){
        alert(message);
        preventDefault();
    };
};
