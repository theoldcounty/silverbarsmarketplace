// order.js
module.exports = function(userId, quantity, price, orderType) {
	
    this.userId = userId;
    this.quantity = quantity;
    this.price = price;
    this.orderType = orderType;

    this.getUserId = function() {
        return this.userId;
    }

    this.getQuantity = function() {
        return this.quantity;
    }

    this.getPrice = function() {
        return this.price;
    }

    this.getOrderType = function() {
        return this.orderType;
    }

    this.getOrder = function() {
        return {
        			"userId" : this.getUserId(),
        			"quantity" : this.getQuantity(),
        			"price" : this.getPrice(),
        			"orderType" : this.getOrderType()
        		};
    }

};