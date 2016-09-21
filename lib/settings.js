'use strict';

var constants = require('./constants');
var assign = require('object-assign');

var settings = {};

function setSettings(options) {

    if (!options) {
        return assign(constants.defaultSettings, {});
    }

    return assign(settings, options);
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
