function CreateDeleteButton(){
    const btn = document.createElement("button");
    btn.innerHTML = "X Remover";
    btn.className = "text-red-600 mt-2 ml-2 text-sm";
    btn.setAttribute("type", "button");
    btn.setAttribute("onclick", "removeField(this)");
    return btn;
};

function AddFieldSet(name){
    let Fieldset = document.getElementById(name);
    let children = Fieldset.children;
    
    let childrenQuantity = Fieldset.childElementCount;

    const btn = CreateDeleteButton();
    if(childrenQuantity == 2){
        children[1].appendChild(btn);
    };

    let child = children[1].cloneNode(true);

    let fields = child.querySelectorAll('input');
    fields.forEach(element => {
        if(element.getAttribute("type") == "radio"){
            element.checked = false;
        };
        if(element.name == "CEP"){
            element.setAttribute("data-index", childrenQuantity - 1);
        };
        element.value = "";
    }); 
    
    fields = child.querySelectorAll('textarea');
    fields.forEach(element => {
        element.value = "";
    }); 
    
    fields = child.querySelectorAll('select');
    fields.forEach(element => {
        element.value = "";
    }); 

    Fieldset.appendChild(child);
};

function removeField(element) {
    let parent = element.parentElement;
    let fieldSet = parent.parentElement;
    fieldSet.removeChild(parent);
    if(fieldSet.childElementCount == 2){
        let fields = fieldSet.children[1].querySelectorAll("input");
        fields.forEach(element => {
            if(element.getAttribute("type") == "radio"){
                element.checked = true;
            };
        });
        fieldSet.children[1].removeChild(fieldSet.children[1].lastChild);
    };    
};