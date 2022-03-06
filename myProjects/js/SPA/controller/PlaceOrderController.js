generateOrderId();
loadAllItemIds();
loadAllCustomerIds();

function generateOrderId() {
    var tempId;
    if (orders.length != 0) {

        var id = orders[orders.length - 1].getId();
        var temp = id.split("-")[1];
        temp++;
        tempId = (temp < 10) ? "OD-00" + temp : (temp < 100) ? "OD-0" + temp : "OD-" + temp;

    } else {
        tempId = "OD-001";
    }

    $("#orderIdPlaceOrder").val(tempId);
}

function setDate() {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    $("#orderDatePlaceOrder").autocomplete;
}

function loadAllItemIds() {
    $("#selectItem>option").remove();
    let i = 1;

    for (let item of items) {
        let option = `<option value="i">${item.getId()}</option>`;
        $("#selectItem").append(option);
        i++;
    }

}

function loadAllCustomerIds() {
    $("#selectCustomer>option").remove();

    let i = 1;
    for (let customer of customers) {
        let option = `<option value="i">${customer.getId()}</option>`;
        $("#selectCustomer").append(option);
        i++;
    }

}


$("#selectItem").on('change', function () {

    let selectedId = $(this).find('option:selected').html();

    items.find(function (e) {
        if (e.getId() == selectedId) {
            $("#itemIdPlaceOrder").val(e.getId());
            $("#itemNamePlaceOrder").val(e.getName());
            $("#pricePlaceOrder").val(e.getPrice());
            $("#qtyPlaceOrder").val(e.getQty());
        }
    });


});


$("#selectCustomer").on('change', function () {

    let selectedId = $(this).find('option:selected').html();

    customers.find(function (e) {
        if (e.getId() == selectedId) {
            $("#cusIdPlaceOrder").val(e.getId());
            $("#cusNamePlaceOrder").val(e.getName());
            $("#cusAddressPlaceOrder").val(e.getAddress());
            $("#cusTelPlaceOrder").val(e.getTel());
        }
    });


});

function saveOrder() {

}

var regExCusQty = /^([0-9]{1,})$/;
$("#cusQtyPlaceOrder").keyup(function (e) {
    console.log($("#cusQtyPlaceOrder").val() <= $("#qtyPlaceOrder").val());
    if (regExCusQty.test($("#cusQtyPlaceOrder").val()) && $("#cusQtyPlaceOrder").val() <= $("#qtyPlaceOrder").val()) {
        $("#cusQtyPlaceOrder").css('border-color', 'Green');
        $("#errorCustomerQty").css('display', 'none');
        if (e.key == "Enter") {

        }

    } else {
        $("#cusQtyPlaceOrder").css('border-color', 'Red');
        $("#errorCustomerQty").css('display', 'block');
    }

});

/*$("#selectCustomer").off('click');*/

function addItemToCart() {
    let itemCode = $("#itemIdPlaceOrder").val();
    let itemName = $("#itemNamePlaceOrder").val();
    let price = $("#pricePlaceOrder").val();
    let cusQty = $("#cusQtyPlaceOrder").val();
    let total = (cusQty) * (price);

    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].getId() == itemCode) {
            let newQty = parseInt(cartItems[i].getQty()) + parseInt(cusQty);
            cartItems[i].setQty(newQty);
            cartItems[i].setTotal(newQty * price);
            loadCartTable();
            clearItemFields();
            setGrossTotal();
            return;

        }

    }

    console.log(total);
    cartItems.push(new CartTM(itemCode, itemName, price, cusQty, total));
    loadCartTable();
    clearItemFields();
    setGrossTotal();

}

function loadCartTable() {

    $("#cartTbl>tr").remove();
    for (let cartItem of cartItems) {
        console.log(cartItem.getTotal());
        let row = `<tr><td>${cartItem.getId()}</td><td>${cartItem.getName()}</td><td>${cartItem.getPrice()}</td><td>${cartItem.getQty()}</td><td>${cartItem.getTotal()}</td></tr>`;
        $("#cartTbl").append(row);
    }


    $("#cartTbl>tr").off('click');

    $("#cartTbl>tr").click(function () {
        let id = $(this).children(':first-child').html();
        let itemName = $(this).children(':nth-child(2)').html();
        let price = $(this).children(':nth-child(4)').html();
        let qty = $(this).children(':nth-child(3)').html();

        $("#itemIdPlaceOrder").val(id);
        $("#itemNamePlaceOrder").val(itemName);
        $("#pricePlaceOrder").val(price);
        $("#cusQtyPlaceOrder").val(qty);

        items.find(function (e) {
            if (e.getId() == id) {
                $("#qtyPlaceOrder").val(e.getQty());
            }
        });

    });
}

function clearItemFields() {
    $("#itemIdPlaceOrder").val("");
    $("#itemNamePlaceOrder").val("");
    $("#pricePlaceOrder").val("");
    $("#cusQtyPlaceOrder").val("");
    $("#qtyPlaceOrder").val("");
}


function setGrossTotal() {
    let grossTotal = 0;
    for (let cartItem of cartItems) {
        grossTotal = parseInt(grossTotal) + parseInt(cartItem.getTotal());
    }
    $("#grossTotalPlaceOrder").val(grossTotal);
}

$("#addCart").click(function () {
    addItemToCart();
});