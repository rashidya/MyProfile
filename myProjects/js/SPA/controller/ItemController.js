/*Item*/

generateItemId();

var regExItemId = /^(I-)[0-9]{3}$/;
var regExItemName = /^([A-z0-9/,\s]{3,})$/;
var regExPrice = /^([0-9.]{1,})$/;
var regExQty = /^([0-9]{1,})$/;


/*Focusing Item*/
$("#itemId").keyup(function (e) {
    enableAddItem();
    if (regExItemId.test($("#itemId").val())) {
        $("#itemId").css('border-color', 'Green');
        $("#errorItemId").css('display', 'none');
        if (e.key == "Enter") {
            $("#itemName").focus();
        }
    } else {
        $("#itemId").css('border-color', 'Red');
        $("#errorItemId").css('display', 'block');
    }

});

$("#itemName").keyup(function (e) {
    enableAddItem();
    if (regExItemName.test($("#itemName").val())) {
        $("#itemName").css('border-color', 'Green');
        $("#errorItem").css('display', 'none');
        if (e.key == "Enter") {
            $("#price").focus();
        }
    } else {
        $("#itemName").css('border-color', 'Red');
        $("#errorItem").css('display', 'block');
    }
});

$("#price").keyup(function (e) {
    enableAddItem();
    if (regExPrice.test($("#price").val())) {
        $("#price").css('border-color', 'Green');
        $("#errorPrice").css('display', 'none');
        if (e.key == "Enter") {
            $("#Qty").focus();
        }
    } else {
        $("#price").css('border-color', 'Red');
        $("#errorPrice").css('display', 'block');
    }

});

$("#Qty").keyup(function (e) {
    enableAddItem();
    if (regExQty.test($("#Qty").val())) {
        $("#Qty").css('border-color', 'Green');
        $("#errorQty").css('display', 'none');

        if ($('#AddItem').is(':enabled') && e.key == "Enter") {
            addItem();
            $("#itemId").focus();
        }
    } else {
        $("#Qty").css('border-color', 'Red');
        $("#errorQty").css('display', 'block');
    }
});

function generateItemId(){
    var tempId;
    if (items.length!=0){

        var id =items[items.length-1].getId();
        var temp=id.split("-")[1];
        temp++;
        tempId = (temp<10)? "I-00"+ temp : (temp<100) ? "I-0"+temp :"I-"+temp;

    }else{
        tempId="I-001";
    }
    $("#itemId").val(tempId);
}


function enableAddItem() {
    if (itemNotExist() && regExItemId.test($("#itemId").val()) && regExItemName.test($("#itemName").val()) && regExPrice.test($("#price").val()) && regExQty.test($("#Qty").val())) {
        $("#AddItem").attr('disabled', false);
    } else {
        $("#AddItem").attr('disabled', true);
    }
}

function addItem() {
    let saveItem = confirm("Do you want to save this item?");
    if (saveItem.valueOf()) {
        let itemName = $("#itemName").val();
        let itemId = $("#itemId").val();
        let itemPrice = $("#price").val();
        let itemQty = $("#Qty").val();

        items.push(new ItemDTO(itemId, itemName, itemPrice, itemQty));


        loadAllItems();
        clearItem();
        generateItemId();
    }

}

function updateItem() {
    let updateItem = confirm("Do you want to update this item?");
    if (updateItem.valueOf()) {
        items.find(function (e) {
            if (e.getId() == $("#itemId").val()) {
                e.setName($("#itemName").val());
                e.setPrice($("#price").val());
                e.setQty($("#Qty").val());
            }
        });

        loadAllItems();
        clearItem();
        generateItemId();
    }

}

function deleteItem() {
    let deleteItem = confirm("Do you want to delete this item?");
    if (deleteItem.valueOf()) {
        items.find(function (e) {
            if (e.getId() == $("#itemId").val()) {
                items.splice(items.indexOf(e), 1);
            }
        });

        loadAllItems();
        clearItem();
        generateItemId();
    }

}

function loadAllItems(){
    $("#itemTbl>tr").remove();

    for (let item of items) {

        let row = `<tr><td>${item.getId()}</td><td>${item.getName()}</td><td>${item.getPrice()}</td><td>${item.getQty()}</td></tr>`;
        $("#itemTbl").append(row);

        $("#itemTbl>tr").off('click');
        $("#itemTbl>tr").off('dblclick');

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

        $("#itemTbl>tr").dblclick(function () {
           var itemRowId =$(this).children(':first-child').html();
            items.find(function (e){
                if(e.getId()==itemRowId){
                    items.splice(items.indexOf(e),1);
                }
            });

            loadAllItems();
            clearItem();
        });
    }



}

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

function itemNotExist(){
    for (let item of items) {
        if (item.getId()==$("#itemId").val()){
            return false;
        }
    }
    return true;
}


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
    generateItemId();
});

