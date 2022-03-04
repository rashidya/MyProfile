generateOrderId();
loadAllCustomersAndItems();

function generateOrderId(){
    var tempId;
    if (orders.length!=0){

        var id =orders[orders.length-1].getId();
        var temp=id.split("-")[1];
        temp++;
        tempId = (temp<10)? "OD-00"+ temp : (temp<100) ? "OD-0"+temp :"OD-"+temp;

    }else{
        tempId="OD-001";
    }

    $("#orderIdPlaceOrder").val(tempId);
}

function setDate(){
    let d =new Date();
    let date =d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    $("#orderDatePlaceOrder").val(date);
}



function loadAllCustomersAndItems(){
    $("#selectCustomer>option").remove();
    let i=1;
    for (let customer of customers) {
        let option= <option value="i">{customer.getId()}</option>
        $("#selectCustomer").append(option);
        i++
    }

}

function saveOrder(){

}

function addItem(){

}