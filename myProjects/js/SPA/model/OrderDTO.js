function OrderDTO(id,date,cusId,total){

    this.orderId=id;
    this.orderDate=date;
    this.orderCusId=cusId;
    this.orderTotal=total;

    this.getId = function () {
        return this.orderId;
    }
    this.setId = function (_id) {
        this.orderId = _id;
    }

    this.getDate = function () {
        return this.orderDate;
    }

    this.setName = function (_date) {
        this.orderDate = _date;
    }
    this.getCusId = function () {
        return this.orderCusId;
    }

    this.setCusId = function (_cusId) {
        this.orderCusId = _cusId;
    }
    this.getTotal = function () {
        return this.orderTotal;
    }

    this.setTotal= function (_total) {
        this.orderTotal = _total ;
    }
}