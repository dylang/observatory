'use strict';
var chalk = require('chalk');

var states = {
    active: 'active',
    done: 'done',
    fail: 'fail'
};

var defaultSettings = {
    width: 55,
    prefix: ' ⫸  ',
    stream: process.stdout,
    formatStatus: function(statusLabel, state) {

        if (!statusLabel) {
            return '';
        }

        if (state === states.active) {
            return chalk.yellow(statusLabel);
        }

        if (state === states.done) {
            return chalk.green(statusLabel);
        }

        if (state === states.fail) {
            return chalk.red(statusLabel);
        }

        return statusLabel;
    }
};

module.exports = {
    state: states,
    defaultSettings: defaultSettings
};
