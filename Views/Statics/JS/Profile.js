let view = document.getElementById("Profile");
view.hidden = false;
function mudarView(fieldSet){
    let component = document.getElementById(fieldSet);
    if(view != component){
        component.hidden = false;
        view.hidden = true;
        view = component;   
    };
};