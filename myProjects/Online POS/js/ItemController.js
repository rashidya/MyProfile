/*Item*/

function enableAddItem() {
    if (regExPrice.test($("#price").val()) && regExItemName.test($("#itemName").val()) && regExItemId.test($("#itemId").val()) && regExQty.test($("#Qty").val())) {
        $("#AddOrUpdateItem").attr('disabled', false);
    } else {
        $("#AddOrUpdateItem").attr('disabled', true);
    }
}

function addItem() {
    let itemName = $("#itemName").val();
    let itemId = $("#itemId").val();
    let itemPrice = $("#price").val();
    let itemQty = $("#Qty").val();

    var itemOb ={


        id:itemId,
        name:itemName,
        price:itemPrice,
        qty:itemQty
    }

    items.push(itemOb);


    loadAllItems();
    clearItem();

}

function updateItem() {
    items.find(function (e){
        if(e.id==$("#itemId").val()){
            e.name= $("#itemName").val();
            e.price=$("#price").val();
            e.qty=$("#Qty").val();
        }
    });

    loadAllItems();
    clearItem();

}

function deleteItem() {
    items.find(function (e){
        if(e.id==$("#itemId").val()){
            console.log(items.indexOf(e));
            customers.splice(items.indexOf(e),1);
        }
    });

    loadAllItems();
    clearItem();

}

function loadAllItems(){

    for (let i = 0; i < items.length; i++) {
        var tempItem = items[i];


        let row = `<tr><td>${tempItem.id}</td><td>${tempItem.name}</td><td>${tempItem.price}</td><td>${tempItem.qty}</td></tr>`;
        $("#itemTbl").append(row);

        $("#itemTbl>tr").off('click');

        $("#itemTbl>tr").click(function () {
            let id = $(this).children(':first-child').html();
            let itemName = $(this).children(':nth-child(2)').html();
            let price = $(this).children(':nth-child(3)').html();
            let qty = $(this).children(':nth-child(4)').html();

            $("#itemId").val(id);
            $("#itemName").val(itemName);
            $("#price").val(price);
            $("#Qty").val(qty);
        });
    }

};

function clearItem() {
    $("#itemId").val("");
    $("#itemId").css('border-color', 'Silver');
    $("#itemName").val("");
    $("#itemName").css('border-color', 'Silver');
    $("#price").val("");
    $("#price").css('border-color', 'Silver');
    $("#Qty").val("");
    $("#Qty").css('border-color', 'Silver');
    enableAddItem();
}

var regExItemId = /^(I-)[0-9]{3}$/;
var regExItemName = /^([A-z0-9/,\s]{3,})$/;
var regExPrice = /^([0-9.]{1,})$/;
var regExQty = /^([0-9]{1,})$/;


/*Focusing Item*/
$("#itemId").keyup(function (e) {
    enableAddItem();
    if (regExItemId.test($("#itemId").val())) {
        $("#itemId").css('border-color', 'Green');
        if (e.key == "Enter") {
            $("#itemName").focus();
        }
    } else {
        $("#itemId").css('border-color', 'Red');
    }

});

$("#itemName").keyup(function (e) {
    enableAddItem();
    if (regExItemName.test($("#itemName").val())) {
        $("#itemName").css('border-color', 'Green');
        if (e.key == "Enter") {
            $("#price").focus();
        }
    } else {
        $("#itemName").css('border-color', 'Red');
    }
});

$("#price").keyup(function (e) {
    enableAddItem();
    if (regExPrice.test($("#price").val())) {
        $("#price").css('border-color', 'Green');
        if (e.key == "Enter") {
            $("#Qty").focus();
        }
    } else {
        $("#price").css('border-color', 'Red');
    }

});

$("#Qty").keyup(function (e) {
    enableAddItem();
    if (regExQty.test($("#Qty").val())) {
        $("#Qty").css('border-color', 'Green');

        if ($('#AddOrUpdateItem').is(':enabled') && e.key == "Enter") {
            addItem();
            $("#itemId").focus();
        }
    } else {
        $("#Qty").css('border-color', 'Red');
    }
});

$("#AddItem").click(function () {
    addItem();
});

$("#UpdateItem").click(function () {
    updateItem();
});

$("#DeleteItem").click(function () {
    deleteItem();
});

$("#cancelItem").click(function () {
    clearItem();
});

