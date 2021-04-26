//Forms Copies
    let formsView = new Map();
    formsView.set("Profile", document.getElementById("Profile").cloneNode(true));
    formsView.set("Password", document.getElementById("Password").cloneNode(true));
    formsView.set("PhonesView", document.getElementById("PhonesView").cloneNode(true));
    formsView.set("AddressesView", document.getElementById("AddressesView").cloneNode(true));
    formsView.set("CreditCardsView", document.getElementById("CreditCardsView").cloneNode(true));

//Set the first div as the current view
    let view = document.getElementById("Profile");

//Set the first view as visible
    view.hidden = false;

//When a sidebar button is clicked, this function is activated and the form or div showed is changed
    function changeView(fieldSet){
        let component = document.getElementById(fieldSet);
        if(view != component){
            component.hidden = false;
            view.hidden = true;
            view = component;   
        };
    };

//Create cloneField button
    function CreateCloneFieldButton(element){
        let names = new Map();
        names.set("Phones","Telefone");
        names.set("Addresses","Endereço");
        names.set("CreditCards","Cartão de Crédito");
        const btn = document.createElement("button");
        btn.innerHTML = "+ Novo " + names.get(element.id);
        btn.className = "inline-block float-right text-right";
        btn.setAttribute("type", "button");
        btn.setAttribute("name", element.id);
        btn.setAttribute("onclick", "AddFieldSet(name)");
        return btn;
    };

//When the edit button is clicked, this function remove de disabled attribute of the form's components and create de button to clone field when needed
    let exceptions = new Map();
    exceptions.set('CPF',1);
    exceptions.set('country',2);
    exceptions.set('state',3);
    exceptions.set('city',4);
    exceptions.set('public_places_types',5);
    exceptions.set('public_place',6);
    exceptions.set('neighborhood',7);

    function enableEdition(element){
        let form = element.parentElement.parentElement;
        let fieldSet = form.children[0];
        let title = fieldSet.children[0];
        if(fieldSet.id != "Datas"){
            let cloneBtn = CreateCloneFieldButton(fieldSet);
            title.appendChild(cloneBtn);
            let name = `${fieldSet.id}-item`;
            let datas = document.getElementsByName(name);
            if(datas.length > 1){
                datas.forEach(element => {
                    let removeBtn = CreateDeleteButton();
                    element.appendChild(removeBtn);
                });
            };
        }else{
            document.getElementById(`PasswordEdit`).hidden = true;
            document.getElementById(`DeleteAccount`).hidden = true;
        };
        document.getElementById(`${fieldSet.id}Edit`).hidden = true;
        document.getElementById(`${fieldSet.id}Cancel`).hidden = false;
        document.getElementById(`${fieldSet.id}Submit`).hidden = false;

        let elements = fieldSet.querySelectorAll("input");
        elements.forEach(e => {
            if(exceptions.get(e.name) == undefined){ 
                e.disabled = false;
            };
        });

        elements = fieldSet.querySelectorAll("select");
        elements.forEach(e => {
            if(exceptions.get(e.name) == undefined){ 
                e.disabled = false;
            };
        });

        elements = fieldSet.querySelectorAll("textarea");
        elements.forEach(e => {
            if(exceptions.get(e.name) == undefined){ 
                e.disabled = false;
            };
        });
    };

//When the edit password button is clicked, this function set de Password Edition View
    function enablePassword() {
        let component = document.getElementById("Password");
        if(view != component){
            component.hidden = false;
            view.hidden = true;
            view = component;   
        };
    };

//Cancel the edition and overwrite the view
    function disableEdition(element){
        let form = element.parentElement.parentElement;
        let parent = form.parentElement;
        let id = form.id;
        parent.removeChild(form);
        view = formsView.get(id).cloneNode(true);
        view.hidden = false;
        parent.appendChild(view);
    };