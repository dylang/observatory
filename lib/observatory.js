'use strict';
/*
 * observatory
 * https://github.com/dylang/observatory
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */

var cliColor = require('cli-color');
var ansiTrim = require('cli-color/lib/trim');
var OS = require('os');

// treat it like a const
var STATE = require('./state');

var currentLine = 1;


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

var settings = {};
setSettings(defaults);

/**
 * Set defaults for observatory
 * @param options
 * width: how many characters over should the status be displayed
 * prefix: text to show on every line before the description
 * formatStatus: function(status, STATE) used to format the status.
 */
function setSettings(options) {
     /*jshint validthis:true */

    options = options || {};


    if (typeof options.prefix === 'string') {
        settings.prefix = options.prefix;
    }

    if (typeof options.width === 'number') {
        settings.width = options.width;
    }

    if (typeof options.formatStatus === 'function') {
        settings.formatStatus = options.formatStatus;
    }

    return this;
}

/**
 * figure out how many lines a string of text will use
 * @param text
 * @returns {number}
 */
function height(text) {
    // todo: add in \n
    return Math.ceil(text.length/cliColor.width);
}

function writeln(text) {
    currentLine += height(text);
    write(text + OS.EOL);
}

function write(text) {
    process.stdout.write(text);
}

function ln(text) {
    return ansiTrim(text || '').length;
}

function padding(n) {
    return n > 0 ? (new Array(n)).join(' ') : '';
}

function Task(description) {

    this.description = description;
    this.statusLabel = '';
    this.detailsLabel = '';
    this.state = STATE.active;
    this.line = currentLine;
    this.longest = 0;

    this.render = function render() {
        var statusLabel = ' ' + settings.formatStatus(this.statusLabel, this.state);
        var margin = padding((settings.width - ln(this.description)) - ln(statusLabel));
        var output = settings.prefix + this.description + margin + statusLabel + ' ' + this.detailsLabel;
        var length = ln(output);
        var clear = padding(this.longest - length + 1);
        this.longest = Math.max(length, this.longest);
        return output + clear;
    };

    this.update = function() {
        var output =this.render();
        var change = currentLine - this.line;
        write(cliColor.up(change));
        write(output);
        write(cliColor.down(change - (height(output) - 1)));
        write(cliColor.left(ln(output)));
        return this;
    };

    this.setStatusLabel = function(statusLabel, defaultValue) {
        this.statusLabel = (typeof statusLabel === 'string') ? statusLabel : defaultValue;
    };

    this.setState = function(state) {
        this.state = state;
    };

    writeln(this.render());

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
    settings: setSettings,
    STATE: STATE
};