generateOrderId();
loadAllItemIds();
loadAllCustomerIds();


function generateOrderId() {
    var tempId;
    if (orders.length !== 0) {

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

    $('#orderDatePlaceOrder').datepicker().datepicker('setDate', 'today');
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

$("#selectCustomer").on('change', function () {

    let selectedId = $(this).find('option:selected').html();

    customers.find(function (e) {
        if (e.getId() === selectedId) {
            $("#cusIdPlaceOrder").val(e.getId());
            $("#cusNamePlaceOrder").val(e.getName());
            $("#cusAddressPlaceOrder").val(e.getAddress());
            $("#cusTelPlaceOrder").val(e.getTel());
        }
    });


});


$("#selectItem").on('change', function () {

    let selectedId = $(this).find('option:selected').html();

    items.find(function (e) {
        if (e.getId() === selectedId) {
            $("#itemIdPlaceOrder").val(e.getId());
            $("#itemNamePlaceOrder").val(e.getName());
            $("#pricePlaceOrder").val(e.getPrice());
            $("#qtyPlaceOrder").val(e.getQty());
        }
    });


});



function saveOrder() {

}

var regExCusQty = /^([0-9]{1,})$/;
$("#cusQtyPlaceOrder").keyup(function (e) {
    let cusQty = parseInt( $("#cusQtyPlaceOrder").val());
    let qty = parseInt( $("#qtyPlaceOrder").val());
    if (regExCusQty.test($("#cusQtyPlaceOrder").val()) ) {
        $("#errorCustomerQty").text("");
        if (cusQty<=qty ){
            $("#cusQtyPlaceOrder").css('border-color', 'Green');
            $("#errorOverCustomerQty").text("");
            if (e.key == "Enter") {
                addItemToCart();
            }
        }else{
            $("#errorOverCustomerQty").text(`! Please enter an amount lover than ${qty}` );
            $("#cusQtyPlaceOrder").css('border-color', 'Red');
        }

    } else {
        $("#cusQtyPlaceOrder").css('border-color', 'Red');
        $("#errorCustomerQty").text("! Please enter an amount");
    }

});



var regDecimal = /^([0-9.]{1,})$/;

$("#cashPlaceOrder").keyup(function (e) {
    let cash = parseFloat( $("#cashPlaceOrder").val());
    let netTotal = parseFloat( $("#netTotalPlaceOrder").text());
    if (regDecimal.test($("#cashPlaceOrder").val()) && netTotal<=cash ) {
        setBalance();
        $("#cashPlaceOrder").css('border-color', 'Silver');
        $("#errorCash").css('display', 'none');
        if (e.key == "Enter") {

        }

    } else {
        $("#cashPlaceOrder").css('border-color', 'Red');
        $("#balancePlaceOrder").val("");
        $("#errorCash").css('display', 'block');
    }

});

$("#discountPlaceOrder").keyup(function (e) {
    let discount = parseFloat( $("#discountPlaceOrder").val());

    if (regDecimal.test($("#discountPlaceOrder").val()) && discount<=100 ) {
        $("#discountPlaceOrder").css('border-color', 'silver');
        $("#errorDiscount").css('display', 'none');
       setNetTotal();
       setBalance();
        if (e.key == "Enter") {

        }

    } else {
        $("#discountPlaceOrder").css('border-color', 'Red');
        $("#errorDiscount").css('display', 'block');
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
            if (cartItems[i].getId() === itemCode) {
                let newQty
                if ( $("#addCart").text()==="Add"){
                    newQty= parseInt(cartItems[i].getQty()) + parseInt(cusQty);
                }else {
                    newQty=cusQty;
                }

                cartItems[i].setQty(newQty);
                cartItems[i].setTotal(newQty * price);
                loadCartTable();
                clearItemFields();
                setGrossTotal();
                return;

            }

        }


        cartItems.push(new OrderDetail(itemCode, itemName, price, cusQty, total));



    loadCartTable();
    clearItemFields();
    setGrossTotal();

}

function loadCartTable() {

    $("#cartTbl>tr").remove();
    for (let cartItem of cartItems) {
        let total = parseFloat(cartItem.getTotal());
        let row = `<tr><td>${cartItem.getId()}</td><td>${cartItem.getName()}</td><td>${cartItem.getPrice()}</td><td>${cartItem.getQty()}</td><td>${total}</td></tr>`;
        $("#cartTbl").append(row);
    }


    $("#cartTbl>tr").off('click');

    $("#cartTbl>tr").click(function () {
        let id = $(this).children(':first-child').html();
        let itemName = $(this).children(':nth-child(2)').html();
        let price = $(this).children(':nth-child(3)').html();
        let qty = $(this).children(':nth-child(4)').html();

        $("#itemIdPlaceOrder").val(id);
        $("#itemNamePlaceOrder").val(itemName);
        $("#pricePlaceOrder").val(price);
        $("#cusQtyPlaceOrder").val(qty);

        items.find(function (e) {
            if (e.getId() === id) {
                $("#qtyPlaceOrder").val(e.getQty());
            }
        });

        $("#addCart").text("Update");
    });
}

function clearItemFields() {
    $("#itemIdPlaceOrder").val("");
    $("#itemNamePlaceOrder").val("");
    $("#pricePlaceOrder").val("");
    $("#cusQtyPlaceOrder").val("");
    $("#qtyPlaceOrder").val("");
    $("#cusQtyPlaceOrder").css('border-color', 'Silver');
    $("#addCart").text("Add");
}

function clearInvoiceFields() {
    $("#orderIdPlaceOrder").val("");
   // $("#orderDatePlaceOrder").val("");
    $("#cusIdPlaceOrder").val("");
    $("#cusNamePlaceOrder").val("");
    $("#cusAddressPlaceOrder").val("");
    $("#cusTelPlaceOrder").val("");
}

function clearBillDetails() {
    $("#grossTotalPlaceOrder").text("0.00");
    $("#netTotalPlaceOrder").text("0.00");
    $("#discountPlaceOrder").val("");
    $("#cashPlaceOrder").val("");
    $("#balancePlaceOrder").text("0.00");
    $("#discountPlaceOrder").css('border-color', 'Silver');
    $("#cashPlaceOrder").css('border-color', 'Silver');
}

function clearAll(){
    clearInvoiceFields();
    clearItemFields();
    clearBillDetails();
    $("#cartTbl>tr").remove();
    cartItems=[];
    generateOrderId();
}
function placeOrder(){
  let orderId=  $("#orderIdPlaceOrder").val();
  let orderDate=  $("#orderDatePlaceOrder").val();
  let orderCusId=  $("#cusIdPlaceOrder").val();

  orders.push(new Order(orderId,orderDate,orderCusId,cartItems));
  clearAll();
}

function setGrossTotal() {
    let grossTotal = 0;
    for (let cartItem of cartItems) {
        grossTotal = parseFloat(grossTotal) + parseFloat(cartItem.getTotal());
    }
    $("#grossTotalPlaceOrder").text(grossTotal);
    setNetTotal();
}
function setNetTotal() {
    let discount = parseFloat( $("#discountPlaceOrder").val());
    let grossTotal = parseFloat($("#grossTotalPlaceOrder").text());
    let netTotal=grossTotal;
    console.log(discount);
    console.log(netTotal);
    if (!isNaN(discount)){
        netTotal=grossTotal-((grossTotal*discount)/100.0);
        console.log(netTotal)
    }

    $("#netTotalPlaceOrder").text(netTotal);
}
function setBalance() {
    let cash = parseFloat( $("#cashPlaceOrder").val());
    let netTotal = parseFloat( $("#netTotalPlaceOrder").text());

    if (!isNaN(cash)){
        let balance=cash-netTotal;
        $("#balancePlaceOrder").text(balance);
    }

}


$("#addCart").click(function () {
    addItemToCart();
});

$("#btnPlaceOrder").click(function () {
    placeOrder();
});

$("#btnCancelPlaceOrder").click(function () {
    clearAll();
});

$("#orderIdPlaceOrder").keyup(function () {
    orders.find(function (o){
        if (o.getId()===$("#orderIdPlaceOrder").val()){
            $("#orderDatePlaceOrder").val(o.getDate());
            customers.find(function (c){
                if (c.getId()===o.getCusId()){
                    $("#cusIdPlaceOrder").val(c.getId());
                    $("#cusNamePlaceOrder").val(c.getName());
                    $("#cusAddressPlaceOrder").val(c.getAddress());
                    $("#cusTelPlaceOrder").val(c.getTel());
                }
            });
           cartItems=o.getOrderItems();
           loadCartTable();
        }
    });


});