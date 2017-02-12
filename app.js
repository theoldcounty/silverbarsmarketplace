// app.js
var LiveOrderBoard = require('./liveOrderBoard');
var liveOrderBoard = new LiveOrderBoard();

liveOrderBoard.register("user1", 3.5, 306, "SELL");
liveOrderBoard.register("user2", 1.2, 310, "SELL");
liveOrderBoard.register("user3", 1.5, 307, "SELL");
liveOrderBoard.register("user4", 2.0, 306, "SELL");


//liveOrderBoard.register("user5", 2.0, 206, "BUY");

//liveOrderBoard.cancel("user4", 2.0, 306, "SELL");

liveOrderBoard.summary();

/*
Our ‘Live Order Board’ should provide us the following summary information:
5.5 kg for £306 // order a + order d
1.5 kg for £307 // order c
1.2 kg for £310 // order b
*/