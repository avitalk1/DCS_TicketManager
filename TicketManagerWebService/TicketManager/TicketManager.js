const EventEmitter = require('events');
const moment = require('../node_modules/moment');

var idCounter = 1;
const MAX_TICKETS = 10;

class Order {
    constructor(name, numberOfTickets, id) {
        this.name = name;
        this.numberOfTickets = numberOfTickets;
        this.id = id;
        this.date = moment().format();
    }
}

class TicketManager extends EventEmitter {
    constructor() {
        super();
        this.ticketOrdersList = [];
        this.numberOfTickets = 0;
    }

    addOrder(_name, _numberOfTickets) {
        if (this.numberOfTickets + _numberOfTickets > MAX_TICKETS) {
            let msg = `Error: Cannot make an order for ${_name}, Not enoghg tickets left`;
            this.emit('ErorrHandler', msg);
            return msg;
        }
        else {
            let newOrderId = idCounter;
            var data = { name: _name, numberOfTickets: _numberOfTickets, id: newOrderId };
            idCounter++;
            this.emit('addOrder', data);
            return `Addedd order for ${_name}, ${_numberOfTickets} number of tickets, Your order number is ${newOrderId}`;
        }
    }

    deleteOrder(id) {
        let foundFlag = false;
        var indexToRemove;
        for (let i = 0; i < this.ticketOrdersList.length && !foundFlag; i++) {
            if (this.ticketOrdersList[i].id == id) {
                indexToRemove = i;
                foundFlag = true;
            }
        }
        if (!foundFlag) {
            let ErrorMsg = `Error: did not delete order with id ${id} can't find order with id ${id}`
            this.emit('ErorrHandler', ErrorMsg);
            return ErrorMsg;
        } else {
            this.emit('deleteOrder', indexToRemove);
            return `Removed order with id : ${id}`;
        }

    }

    resetOrders() {
        this.emit('resetOrders');
        return 'Reset All Orders';
    }

    getAll() {
        if (this.ticketOrdersList.length == 0) {
            let msg = 'No orders to show';
            this.emit('ErorrHandler', msg);
            return msg;
        } else {
            this.emit('getAll');
            return this.ticketOrdersList;
        }
    }

    updateOrder(_name, _num) {
        let i;
        let foundFlag = false;
        for (i = 0; i < this.ticketOrdersList.length && !foundFlag; i++) {
            if (this.ticketOrdersList[i].name === _name) foundFlag = true;
        }
        if (!foundFlag) {
            let msg = `Error: did not update order with name ${_name} can't find order with name ${_name}`
            this.emit('ErorrHandler', msg);
            return msg;
        } else {
            if (this.numberOfTickets - this.ticketOrdersList[i - 1].numberOfTickets + _num > MAX_TICKETS) {
                let msg = `Error: did not update order with name ${_name} not enough tickets left`;
                this.emit('ErorrHandler', msg);
                return msg;
            } else {
                this.emit('updateOrder', { name: _name, num: _num, index: i - 1 });
                return `Updated Order for ${_name} successfully`;
            }
        }
    }

}
module.exports = {
    TicketManager,
    Order
}