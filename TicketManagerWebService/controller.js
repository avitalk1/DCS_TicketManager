const url = require('url');
const addOrder = require('./handler').addOrder;
const viewAllOrders = require('./handler').viewAllOrders;
const deleteOrder = require('./handler').deleteOrder;
const updateOrder = require('./handler').updateOrder;
const resetOrders = require('./handler').resetOrders;
const viewLogs = require('./handler').viewLogs;
module.exports = (req, res) => {
    console.log(`Request ${req.method} came from ${req.url}`);
    const urlObject = url.parse(req.url, true, false);
    req.urlObject = urlObject;
    switch (req.method) {
        case 'POST':
            if (urlObject.path.startsWith('/addOrder')) {
                addOrder(req, res);
            } else if (urlObject.path.startsWith('/resetOrder')) {
                resetOrders(req, res);
            } else if (urlObject.path.startsWith('/viewAllOrders')) {
                viewAllOrders(req, res);
            } else if (urlObject.path.startsWith('/viewLogs')) {
                viewLogs(req, res);
            } else {
                res.write('Invalid Path: No such path for POST method');
                res.end();
            }
            break;
        case 'PUT':
            if (urlObject.path.startsWith('/updateOrder')) {
                updateOrder(req, res);
            } else {
                res.write('Invalid Path: No such path for PUT method');
            }
            break;

        case 'DELETE':
            if (urlObject.path.startsWith('/deleteOrder')) {
                deleteOrder(req, res);
            } else {
                res.write('Invalid Path: No such path for DELETE method');
                res.end();
            }
            break;
        default:
            res.write('Invalid Path');
            res.end();
            break;
    }

}