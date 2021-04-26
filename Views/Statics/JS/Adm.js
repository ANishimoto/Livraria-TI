//Forms Copies
    let formsView = new Map();
    formsView.set("Products", document.getElementById("Products").cloneNode(true));
    formsView.set("Clients", document.getElementById("Clients").cloneNode(true));
    formsView.set("Returns", document.getElementById("Returns").cloneNode(true));
    formsView.set("Employees", document.getElementById("Employees").cloneNode(true));

//Set the first div as the current view
    let view = document.getElementById("Employees");

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

//Cancel the edition and overwrite the view
    function disableEdition(element){
        let div = element.parentElement.parentElement.parentElement;
        let parent = div.parentElement;
        let id = div.id;
        parent.removeChild(div);
        view = formsView.get(id).cloneNode(true);
        view.hidden = false;
        parent.appendChild(view);
    };

//Enable the registration div
    function EnableViewForm(element){
        element.parentElement.parentElement.parentElement.children[2].hidden = false;
        element.hidden = true;
    };
