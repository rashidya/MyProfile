/*Customer*/

function enableAddCustomer() {
    if (regExCustomerId.test($("#cusId").val()) && regExPersonName.test($("#name").val()) && regExAddress.test($("#address").val()) && regExTel.test($("#tel").val())) {
        $("#AddCustomer").attr('disabled', false);
    } else {
        $("#AddCustomer").attr('disabled', true);
    }
}

function addCustomer() {
    let cusName = $("#name").val();
    let cusId = $("#cusId").val();
    let cusAddress = $("#address").val();
    let cusTel = $("#tel").val();

    customers.push(new CustomerDTO(cusId,cusName,cusAddress,cusTel));


    loadAllCustomers();

    clearCustomer();


}

function updateCustomer() {
    customers.find(function (e){
        if(e.id==$("#cusId").val()){
            e.name= $("#name").val();
            e.address=$("#address").val();
            e.tel=$("#tel").val();
        }
    });

    loadAllCustomers();
    clearCustomer();
}

function deleteCustomer(){
    customers.find(function (e){
        if(e.id==$("#cusId").val()){
            console.log(customers.indexOf(e));
            customers.splice(customers.indexOf(e),1);
        }
    });

    console.log(customers);

    loadAllCustomers();
    clearCustomer();
}

function loadAllCustomers(){
    $("#cusTbl>tr").remove();

    for (let customer of customers) {
        let row = `<tr><td>${customer.get}</td><td>${customer.getName}</td><td>${customer.getAddress}</td><td>${customer.getTel}</td></tr>`;
        $("#cusTbl").append(row)
    }

    /*To unbind click events added to rows*/
    $("#cusTbl>tr").off('click');
   /* $("#cusTbl>tr").off('dblclick');*/

    $("#cusTbl>tr").click(function () {
        let id = $(this).children(':first-child').html();
        let name = $(this).children(':nth-child(2)').html();
        let address = $(this).children(':nth-child(3)').html();
        let tel = $(this).children(':nth-child(4)').html();

        $("#cusId").val(id);
        $("#name").val(name);
        $("#address").val(address);
        $("#tel").val(tel);
    });


  /*  $("#cusTbl>tr").dblclick(function () {

        $(this).remove();
        clearCustomer();
    });*/
}

function clearCustomer() {
    $("#cusId").val("");
    $("#cusId").css('border-color', 'Silver');
    $("#name").val("");
    $("#name").css('border-color', 'Silver');
    $("#address").val("");
    $("#address").css('border-color', 'Silver');
    $("#tel").val("");
    $("#tel").css('border-color', 'Silver');
    enableAddCustomer();
}

function findCustomer(){
    customers.find(function (e){
        if(e.id==$("#CustomerID").val()){
            $("#cusId").val(e.id);
            $("#name").val(e.name);
            $("#address").val(e.address);
            $("#tel").val(e.tel);
        }
    });
}



var regExCustomerId = /^(C-)[0-9]{3}$/;
var regExPersonName = /^([A-z\s. ]{3,80})$/;
var regExAddress = /^([A-z0-9/,\s]{3,})$/;
var regExTel = /^([0][0-9]{9}|[0][0-9]{2}[-\s][0-9]{7})$/;

/*Focusing and Validating Customer*/
$("#cusId").keyup(function (e) {
    enableAddCustomer();
    if(regExCustomerId.test($("#cusId").val()) ){
        $("#cusId").css('border-color', 'Green');
        $("#errorCustomerId").css('display','none');
        if (e.key == "Enter") {
            $("#name").focus();
        }

    }else{
        $("#cusId").css('border-color', 'Red');
        $("#errorCustomerId").css('display','block');
    }



});

$("#name").keyup(function (e) {
    enableAddCustomer();
    if(regExCustomerId.test($("#cusId").val()) ){
        $("#name").css('border-color', 'Green');
        $("#errorCustomerName").css('display','none');
        if (e.key == "Enter" ) {
            $("#address").focus();
        }

    }else{
        $("#name").css('border-color', 'Red');
        $("#errorCustomerName").css('display','block');
    }


});

$("#address").keyup(function (e) {
    enableAddCustomer();
    if (regExAddress.test($("#address").val())) {
        $("#address").css('border-color', 'Green');
        if (e.key == "Enter") {
            $("#tel").focus();
        }
    } else {
        $("#address").css('border-color', 'Red');
    }

});

$("#tel").keyup(function (e) {
    enableAddCustomer();
    if (regExTel.test($("#tel").val())) {
        $("#tel").css('border-color', 'Green');
        if ($('#AddCustomer').is(':enabled') && e.key == "Enter") {
            addCustomer();
            $("#cusId").focus();
        }
    } else {
        $("#tel").css('border-color', 'Red');
    }

});




$("#AddCustomer").click(function () {
    addCustomer();
});

$("#UpdateCustomer").click(function () {
    updateCustomer();
});

$("#DeleteCustomer").click(function () {
    deleteCustomer();
});

$("#searchCustomer").click(function () {
    findCustomer();

});

$("#cancelCustomer").click(function () {
    clearCustomer();
});