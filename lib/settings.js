'use strict';

var constants = require('./constants');
var _ = require('lodash');

var settings = {};

function setSettings(options) {

    if (!options) {
        return _.merge(constants.defaultSettings, {});
    }

    return _.merge(settings, options);
}

function width() {
    return settings.width;
}

function prefix() {
    return settings.prefix;
}

function write(text){
    return settings.write(text);
}

function formatStatus (statusLabel, state) {
    return settings.formatStatus(statusLabel, state);
}


settings = setSettings();

module.exports = {
    setSettings: setSettings,
    width: width,
    prefix: prefix,
    write: write,
    formatStatus: formatStatus
};
