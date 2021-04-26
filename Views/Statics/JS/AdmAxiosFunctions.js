//
    function SaveEmployee(){
        let employee = {
            name: document.getElementById("employee_name").value,
            birth: document.getElementById("employee_birth").value,
            gender: document.getElementById("employee_gender").value,
            CPF: document.getElementById("employee_CPF").value,
            email: document.getElementById("employee_email").value,
            phone: {
                tpPhone: document.getElementById("employee_tpPhone").value,
                DDD: document.getElementById("employee_DDD").value,
                number: document.getElementById("employee_phone_number").value
            }
        }
        axios.post("http://localhost:8080/adm/Employee", employee).then(res => {
            if(res.status == 200){
                if(res.data != ''){
                    alert(res.data);
                }
                else{
                    alert("Funcionário cadastrado!");
                };
            };
        }).catch(err => {
            alert("Erro ao cadastrar o funcionário!")
            console.log(err);
        })
    }