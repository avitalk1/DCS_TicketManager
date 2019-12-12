const TicketManager = require("./TicketManager").TicketManager;
const Order = require("./TicketManager").Order;
const Logger = require("../Logger").Logger;
const moment = require("../node_modules/moment");

var ticketManager = new TicketManager();
var ticketManagerLogger = new Logger();

ticketManager.on("ErorrHandler", msg => {
    displayAndSaveMsg(msg);
});

ticketManager.on("addOrder", data => {
    var newOrder = new Order(data.name, data.numberOfTickets, data.id);
    ticketManager.ticketOrdersList.push(newOrder);
    ticketManager.numberOfTickets += data.numberOfTickets;

    displayAndSaveMsg(
        `added an order id ${data.id} for ${data.name} for ${data.numberOfTickets} tickets`
    );
});

ticketManager.on("deleteOrder", index => {
    var orderToDelete = ticketManager.ticketOrdersList[index];
    ticketManager.numberOfTickets -= orderToDelete.numberOfTickets;
    ticketManager.ticketOrdersList.splice(index, 1);

    displayAndSaveMsg(`Deleted order with id ${orderToDelete.id}`);
});

ticketManager.on("resetOrders", () => {
    ticketManager.ticketOrdersList = [];
    ticketManager.numberOfTickets = 0;

    displayAndSaveMsg("Reset tickets Orders");
});

ticketManager.on("getAll", () => {
    displayAndSaveMsg("View all Ticket Orders");
});

ticketManager.on("updateOrder", data => {
    ticketManager.ticketOrdersList[data.index].numberOfTickets = data.num;
    ticketManager.ticketOrdersList[data.index].name = data.name;
    ticketManager.ticketOrdersList[data.index].date = moment().format();

    displayAndSaveMsg(`Updated Order for ${data.name} successfully`);
});

function displayAndSaveMsg(msg) {
    console.log(msg);
    ticketManagerLogger.addToLog(msg);
}

module.exports = {
    ticketManager,
    ticketManagerLogger
};
