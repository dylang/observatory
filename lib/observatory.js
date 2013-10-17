'use strict';
/*
 * observatory
 * https://github.com/dylang/observatory
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */

var cliColor = require('cli-color');

// treat it like a const
var STATE = require('./state');
var utils = require('./utils');
var setSettings = require('./set-settings');

// global state
var currentLine = 1;
var settings = {};

setSettings(null, settings);

function Task(description) {

    this.description = description;
    this.statusLabel = '';
    this.detailsLabel = '';
    this.state = STATE.active;
    this.line = currentLine;
    this.longest = 0;

    this.render = function render() {
        var statusLabel = ' ' + settings.formatStatus(this.statusLabel, this.state);
        var margin = utils.padding((settings.width - utils.ln(this.description)) - utils.ln(statusLabel));
        var output = settings.prefix + this.description + margin + statusLabel + ' ' + this.detailsLabel;
        var length = utils.ln(output);
        var clear = utils.padding(this.longest - length + 1);
        this.longest = Math.max(length, this.longest);
        return output + clear;
    };

    this.update = function() {
        var output =this.render();
        var change = currentLine - this.line;
        utils.write(cliColor.up(change));
        utils.write(output);
        utils.write(cliColor.down(change - (utils.height(output) - 1)));
        utils.write(cliColor.left(utils.ln(output)));
        return this;
    };

    this.setStatusLabel = function(statusLabel, defaultValue) {
        this.statusLabel = (typeof statusLabel === 'string') ? statusLabel : defaultValue;
    };

    this.setState = function(state) {
        this.state = state;
    };

    currentLine = utils.writeln(currentLine, this.render());

    return this;
}

Task.prototype.details = function(detailsLabel) {
    this.detailsLabel = detailsLabel;
    return this.update();
};

Task.prototype.status = function(status) {
    this.setStatusLabel(status, '');
    return this.update();
};

Task.prototype.done = function(status) {
    this.setState(STATE.done);
    this.setStatusLabel(status, '✓ Done');  //move to constant
    return this.update();
};

Task.prototype.fail = function(status) {
    this.setState(STATE.fail);
    this.setStatusLabel(status, '✗ Failed'); //move to constant
    return this.update();
};

function add (description) {
    return new Task(description);
}

module.exports = {
    add: add,
    STATE: STATE
};

module.exports.settings = setSettings(module.exports, settings);
