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

    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
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
$("#cusQtyPlaceOrder").keyup(function (e){
    console.log( $("#cusQtyPlaceOrder").val()<=$("#qtyPlaceOrder").val());
    if (regExCusQty.test($("#cusQtyPlaceOrder").val()) && $("#cusQtyPlaceOrder").val()<=$("#qtyPlaceOrder").val()){
        $("#cusQtyPlaceOrder").css('border-color', 'Green');
        $("#errorCustomerQty").css('display', 'none');
        if (e.key == "Enter") {

        }

    }else{
        $("#cusQtyPlaceOrder").css('border-color', 'Red');
        $("#errorCustomerQty").css('display', 'block');
    }

});

/*$("#selectCustomer").off('click');*/

function addItemToCart(){

}
