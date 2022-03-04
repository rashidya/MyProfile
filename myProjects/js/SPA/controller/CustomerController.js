generateCustomerId();

var regExCustomerId = /^(C-)[0-9]{3}$/;
var regExPersonName = /^([A-z\s. ]{3,80})$/;
var regExAddress = /^([A-z0-9/,\s]{3,})$/;
var regExTel = /^([0][0-9]{9}|[0][0-9]{2}[-\s][0-9]{7})$/;

/*Focusing and Validating Customer*/
$("#cusId").keyup(function (e) {
    enableAddCustomer();
    if (regExCustomerId.test($("#cusId").val())) {
        $("#cusId").css('border-color', 'Green');
        $("#errorCustomerId").css('display', 'none');
        if (e.key == "Enter") {
            $("#name").focus();
        }

    } else {
        $("#cusId").css('border-color', 'Red');
        $("#errorCustomerId").css('display', 'block');
    }


});

$("#name").keyup(function (e) {
    enableAddCustomer();
    if (regExPersonName.test($("#name").val())) {
        $("#name").css('border-color', 'Green');
        $("#errorCustomerName").css('display', 'none');
        if (e.key == "Enter") {
            $("#address").focus();
        }

    } else {
        $("#name").css('border-color', 'Red');
        $("#errorCustomerName").css('display', 'block');
    }


});

$("#address").keyup(function (e) {
    enableAddCustomer();
    if (regExAddress.test($("#address").val())) {
        $("#address").css('border-color', 'Green');
        $("#errorCustomerAddress").css('display', 'none');
        if (e.key == "Enter") {
            $("#tel").focus();
        }
    } else {
        $("#address").css('border-color', 'Red');
        $("#errorCustomerAddress").css('display', 'block');
    }

});

$("#tel").keyup(function (e) {
    enableAddCustomer();
    if (regExTel.test($("#tel").val())) {
        $("#tel").css('border-color', 'Green');
        $("#errorCustomerTel").css('display', 'none');

        if ($('#AddCustomer').is(':enabled') && e.key == "Enter") {
            addCustomer();
            $("#cusId").focus();
        }
    } else {
        $("#tel").css('border-color', 'Red');
        $("#errorCustomerTel").css('display', 'block');
    }

});


function generateCustomerId() {
    var tempId;
    if (customers.length != 0) {

        var id = customers[customers.length - 1].getId();
        var temp = id.split("-")[1];
        temp++;
        tempId = (temp < 10) ? "C-00" + temp : (temp < 100) ? "C-0" + temp : "C-" + temp;

    } else {
        tempId = "C-001";
    }
    $("#cusId").val(tempId);
}


function enableAddCustomer() {
    if (customerNotExist() && regExCustomerId.test($("#cusId").val()) && regExPersonName.test($("#name").val()) && regExAddress.test($("#address").val()) && regExTel.test($("#tel").val())) {
        $("#AddCustomer").attr('disabled', false);
    } else {
        $("#AddCustomer").attr('disabled', true);
    }
}

function addCustomer() {
    let saveCustomer = confirm("Do you want to save this customer?");
    if (saveCustomer.valueOf()) {
        let cusName = $("#name").val();
        let cusId = $("#cusId").val();
        let cusAddress = $("#address").val();
        let cusTel = $("#tel").val();


        customers.push(new CustomerDTO(cusId, cusName, cusAddress, cusTel));

        loadAllCustomers();

        clearCustomer();
        generateCustomerId();
        loadAllCustomersAndItems();
    }


}

function updateCustomer() {
    let updateCustomer = confirm("Do you want to update this customer?");
    if (updateCustomer.valueOf()) {
        customers.find(function (e) {
            if (e.getId() == $("#cusId").val()) {
                e.setName($("#name").val());
                e.setAddress($("#address").val());
                e.setTel($("#tel").val());
            }
        });

        loadAllCustomers();
        clearCustomer();
        generateCustomerId();
    }
}

function deleteCustomer() {
    let deleteCustomer = confirm("Do you want to delete this customer?");
    if (deleteCustomer.valueOf()) {
        customers.find(function (e) {
            if (e.getId() == $("#cusId").val()) {
                customers.splice(customers.indexOf(e), 1);
            }
        });

        loadAllCustomers();
        clearCustomer();
        generateCustomerId();
    }
}

function loadAllCustomers() {
    $("#cusTbl>tr").remove();

    for (let customer of customers) {
        let row = `<tr><td>${customer.getId()}</td><td>${customer.getName()}</td><td>${customer.getAddress()}</td><td>${customer.getTel()}</td></tr>`;
        $("#cusTbl").append(row)
    }

    /*To unbind click events added to rows*/
    $("#cusTbl>tr").off('click');
    $("#cusTbl>tr").off('dblclick');

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

    $("#cusTbl>tr").dblclick(function () {
        let deleteCustomer = confirm("Do you want to delete this customer?");
        if (deleteCustomer.valueOf()) {
            let rowCusId = $(this).children(':first-child').html();
            customers.find(function (e) {
                if (e.getId() == rowCusId) {

                    customers.splice(customers.indexOf(e), 1);
                }
            });

            loadAllCustomers();
            clearCustomer();
        }
    });
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

function findCustomer() {
    customers.find(function (e) {
        if (e.getId() == $("#CustomerID").val()) {
            $("#cusId").val(e.getId());
            $("#name").val(e.getName());
            $("#address").val(e.getAddress());
            $("#tel").val(e.getTel());
        }
    });
}

function customerNotExist(){
    for (let customer of customers) {
        if (customer.getId()==$("#cusId").val()){
            return false;
        }
    }
    return true;
}

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
    generateCustomerId();
});

