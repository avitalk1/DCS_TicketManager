const ticketManager = require('./TicketManager/TicketManagerEvents').ticketManager;
const ticketManagerLogger = require('./TicketManager/TicketManagerEvents').ticketManagerLogger;
const viewAllOrders = (req, res) => {
    let dataChunks = [];
    req.on('data', (chunk) => {
        dataChunks.push(chunk);
    });
    req.on('end', () => {
        let dataObject = JSON.parse(Buffer.concat(dataChunks));
        if (dataObject.admin) {
            var returnedData = ticketManager.getAll();
            returnedData = JSON.stringify(returnedData);
            res.write(returnedData);
            res.end();
        } else {
            res.write('Invalid Input: You are not authorized to view this page ');
            res.end();
        }
    });

}
const viewLogs = (req, res) => {
    let dataChunks = [];
    req.on('data', (chunk) => {
        dataChunks.push(chunk);
    });
    req.on('end', () => {
        let dataObject = JSON.parse(Buffer.concat(dataChunks));
        if (dataObject.admin) {
            var returnedData = ticketManagerLogger.viewLog();
            returnedData = JSON.stringify(returnedData);
            res.write(returnedData);
            res.end();
        } else {
            res.write('Invalid Input: You are not authorized to view this page ');
            res.end();
        }
    });

}
const deleteOrder = (req, res) => {
    let dataChunks = [];
    req.on('data', (chunk) => {
        dataChunks.push(chunk);
    });
    req.on('end', () => {
        let dataObject = JSON.parse(Buffer.concat(dataChunks));
        if (!isNaN(dataObject.id) && dataObject.id) {
            const returnedData = ticketManager.deleteOrder(dataObject.id);
            res.write(returnedData);
            res.end();
        } else {
            res.write('Invalid Input: Make sure you enterd the order id you wish to delete');
            res.end();
        }
    });
}
const addOrder = (req, res) => {
    let dataChunks = [];
    req.on('data', (chunk) => {
        dataChunks.push(chunk);
    });
    req.on('end', () => {
        let dataObject = JSON.parse(Buffer.concat(dataChunks));
        if (dataObject.name && !isNaN(dataObject.numOfTickets)) {
            const returnedData = ticketManager.addOrder(dataObject.name, dataObject.numOfTickets);
            res.write(returnedData);
            res.end();
        } else {
            res.write('Invalid Input: Make sure you enterd a name for the who ordered the tickets, and the number of tickets (numOfTickets) you wish to order');
            res.end();
        }
    });

}
const updateOrder = (req, res) => {
    let dataChunks = [];
    req.on('data', (chunk) => {
        dataChunks.push(chunk);
    });
    req.on('end', () => {
        let dataObject = JSON.parse(Buffer.concat(dataChunks));
        if (dataObject.name && !isNaN(dataObject.numOfTickets) && dataObject.numOfTickets) {
            const returnedData = ticketManager.updateOrder(dataObject.name, dataObject.numOfTickets);
            res.write(returnedData);
            res.end();
        } else {
            res.write('Invalid Input: Make sure you enterd a name for the who ordered the tickets, and the number of tickets (numOfTickets) you wish to update');
            res.end();
        }
    });
}
const resetOrders = (req, res) => {
    let dataChunks = [];
    req.on('data', (chunk) => {
        dataChunks.push(chunk);
    });
    req.on('end', () => {
        let dataObject = JSON.parse(Buffer.concat(dataChunks));
        if (dataObject.admin) {
            const returnedData = ticketManager.resetOrders();
            res.write(returnedData);
            res.end();
        } else {
            res.write('Invalid Input: You are not authorized to view this page ');
            res.end();
        }
    });
}

module.exports = {
    viewAllOrders,
    deleteOrder,
    addOrder,
    updateOrder,
    resetOrders,
    viewLogs
}