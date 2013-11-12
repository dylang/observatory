'use strict';
var cliColor = require('cli-color');

var states = {
    active: 'active',
    done: 'done',
    fail: 'fail'
};

var defaultSettings = {
    width: 55,
    prefix: ' ⫸  ',
    write: process.stdout.write.bind(process.stdout),
    formatStatus: function(statusLabel, state) {
        if (!statusLabel) {
            return '';
        }
        else if (state === states.active) {
            return cliColor.yellow(statusLabel);
        }
        else if (state === states.done) {
            return cliColor.green(statusLabel);
        }
        else if (state === states.fail) {
            return cliColor.red(statusLabel);
        }

        return statusLabel;
    }
};

module.exports = {
    state: states,
    defaultSettings: defaultSettings
};
