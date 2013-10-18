var cliColor = require('cli-color');
var STATE = require('./state');
var _ = require('lodash');

var defaults = {
    width: 55,
    prefix: ' ⫸  ',
    formatStatus: function(statusLabel, state) {

        if (!statusLabel) {
            return '';
        }

        if (state === STATE.active) {
            return cliColor.yellow(statusLabel);
        }

        if (state === STATE.done) {
            return cliColor.green(statusLabel);
        }

        if (state === STATE.done) {
            return cliColor.red(statusLabel);
        }

        return statusLabel;
    }
};

function setSettings(toChain, settings, rawOpts) {

    var options = _.merge(defaults, rawOpts);

    if (typeof options.prefix === 'string') {
        settings.prefix = options.prefix;
    }

    if (typeof options.width === 'number') {
        settings.width = options.width;
    }

    if (typeof options.formatStatus === 'function') {
        settings.formatStatus = options.formatStatus;
    }

    return toChain;
}

module.exports = _.curry(setSettings);
