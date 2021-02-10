function onlyNumbers(element) {
    element.value = element.value.replace(/[^0-9]+/g, "");
    if(element.name == "CEP"){
        if(element.value.length == 8){
            SearchCEP(element);
        };
    };
};

function SearchCEP(element){
    axios.get(`http://viacep.com.br/ws/${element.value}/json/`).then(res => {
        let index = element.getAttribute("data-index");

        let publicPlace = document.getElementsByName(`public_place`); 
        publicPlace[index].value = res.data.logradouro;

        let city = document.getElementsByName(`city`);
        city[index].value = res.data.localidade;
        
        let state = document.getElementsByName(`state`);
        state[index].value = res.data.uf;

        let  neighborhood = document.getElementsByName(`neighborhood`);
        neighborhood[index].value = res.data.bairro;
        
        let  country = document.getElementsByName(`country`);
        country[index].value = "Brasil";

        let publicPlaceName = publicPlace[index].value.split(" ")[0];
        let publicPlaceTypes = document.getElementsByName(`public_places_types`)
        let publicPlacesTypesOptions = publicPlaceTypes[index].getElementsByTagName("option");
        for (let option of publicPlacesTypesOptions) {
            let text = option.innerHTML.trim(" ");
            if(text == publicPlaceName){
                option.selected = true;
                break;
            };
        };
      }).catch(err => {
        console.log(err);
    });
};