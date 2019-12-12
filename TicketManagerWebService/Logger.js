class Logger {
    constructor() {
        this.log = [];
    }
    addToLog(msg) {
        this.log.push(msg);
    }
    viewLog() {
        return this.log;
    }
}
module.exports = {
    Logger
};
