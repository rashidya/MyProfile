function OrderDetailDTO(oId,itemId,qty){

    this.orderId=oId;
    this.orderItemId=itemId;
    this.orderQty=qty;


    this.getOrderId = function () {
        return this.orderId;
    }
    this.setId = function (_oId) {
        this.orderId = _oId;
    }

    this.getOrderItemId = function () {
        return this.orderItemId;
    }

    this.setOrderItemId = function (_itemId) {
        this.orderDate = _itemId;
    }
    this.getCusQty = function () {
        return this.orderQty;
    }

    this.setCusQty = function (_cusQty) {
        this.orderQty = _cusQty;
    }

}