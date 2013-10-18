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

/**
 * Set defaults for observatory
 * @param options
 * width: how many characters over should the status be displayed
 * prefix: text to show on every line before the description
 * formatStatus: function(status, STATE) used to format the status.
 */
function setSettings(toChain, settings, rawOpts) {
    /*jshint validthis:true */

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
