// liveorderboard.js
var Order = require('./order');

module.exports = function() {
	
    this.orders = new Array();

    this.LiveOrderBoard = function(){
        this.orders = new Array();
    }

    this.anOrderWith = function(userId, quantity, price, orderType) {
        return new Order(userId, quantity, price, orderType).getOrder();
    }

    this.register = function(userId, quantity, price, orderType) {
        this.orders.push(this.anOrderWith(userId, quantity, price, orderType));
    }

    this.summary = function() {
        // use slice() to copy the array and not just make a reference
        var summaries = this.orders.slice(0);
        
        byType(summaries);
        byPrice(summaries);

        function byType(obj) {
            obj.sort(function(a,b) {
                var x = a.orderType.toLowerCase();
                var y = b.orderType.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });
        }

        function byPrice(obj) {
            obj.sort(function(a,b) {
                return a.price - b.price;
            });
        }

        function getOrderName(i){
            return (i+1);
        }
        
        function merge(obj1, obj2){
            var obj = obj1;

                obj.quantity+=obj2.quantity;
                obj.userId+= ","+obj2.userId;
                obj.orderNames+= ","+obj2.orderNames;

            return obj;
        }        
 
        function orderNames(orderNames){
            var orderNameArray = orderNames.toString().split(",");
            var orderNames = "";

            for (var i = 0; i < orderNameArray.length; i++) {
                orderNames += "order "+orderNameArray[i]+" + ";
            }

            orderNames = orderNames.substring(0, orderNames.length - 3);
            return orderNames;
        }

        /*
        5.5 kg for £306 // order a + order d
        1.5 kg for £307 // order c
        1.2 kg for £310 // order b
        */

        var previousPrice;
        var newSummary = new Array();

        for (var i = 0; i < summaries.length; i++) {
            var ordObj = summaries[i];
                ordObj["orderNames"] = getOrderName(i);

            if(summaries[i].price == previousPrice){
                newSummary.pop();
                newSummary.push(merge(summaries[i], summaries[i-1]));
            }
            else{
                newSummary.push(summaries[i]);
            }

            previousPrice = summaries[i].price;
        } 

        for (var i = 0; i < newSummary.length; i++) {            
            console.log(newSummary[i].quantity + " kg for £"+ newSummary[i].price +" // "+ orderNames(newSummary[i].orderNames));
        }

        /*
            The first thing to note here is that orders for the same price should be merged together 
            (even when they are from different users). In this case it can be seen that order a) and d) 
            were for the same amount (£306) and this is why only their sum (5.5 kg) is displayed (for £306) 
            and not the individual orders (3.5 kg and 2.0 kg).

            The last thing to note is that for SELL orders the orders with lowest prices are displayed first. 
            Opposite is true for the BUY orders. 
        */
    }

    this.cancel  = function(userId, quantity, price, orderType) {
        function equals(obj1, obj2) {
            if (obj1.orderType != obj2.orderType) return false;
            if (obj1.price != obj2.price) return false;
            if (obj1.quantity != obj2.quantity) return false;

            return true;
        }

        for(var i = this.orders.length; i--;) {
            if(equals(this.orders[i], this.anOrderWith(userId, quantity, price, orderType))) {
                this.orders.splice(i, 1);
            }
        }
    }
};