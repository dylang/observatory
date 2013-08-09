/*
 * taskwatch
 * https://github.com/dylang/taskwatch
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */

'use strict';

var cliColor = require('cli-color');
var ansiTrim = require('cli-color/lib/trim');
var currentLine = 0;

function writeln(text) {
    write(text);
    write('\n');
    currentLine++;
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

var STATE = {
    init: function(status) {
        return status || '';
    },
    start: function(status) {
        return cliColor.yellow(status || 'running');
    },
    done: function(status) {
        return cliColor.green(status || '✓ done');
    },
    fail: function(status) {
        return cliColor.red(status || '✗ failed');
    }
};


function Task(label) {

    this.label = label;
    this.status = '';
    this.postfixLabel = '';
    this.state = STATE.init;
    this.line = currentLine;
    this.longest = 0;

    this.render = function render() {
        var min = 60;
        var minStatus = 0;
        var status = this.state(this.status);
        var margin = padding((min - ln(this.label)) + (minStatus - ln(status)));
        var output = ' ⫸  ' + this.label + margin + status + ' ' + this.postfixLabel;
        var length = ln(output);
        var clear = padding(this.longest - length + 1);
        this.longest = Math.max(length, this.longest);
        return output + clear;
    };

    this.update = function (output) {
        output = output || this.render();
        var change = currentLine - this.line + 1;
        write(cliColor.up(change));
        write(output);
        write(cliColor.down(change));
        write(cliColor.left(ln(output)));
    };

    writeln(this.render());
    this.line = currentLine;

    return this;
}

Task.prototype.postfix = function(label) {
    this.postfixLabel = label;
    this.update();
    return this;
};

Task.prototype.start = function(statusLabel) {
    this.status = statusLabel;
    this.state = STATE.start;
    this.update();
    return this;
};

Task.prototype.continue = function(statusLabel) {
    this.status = statusLabel;
    this.update();
    return this;
};

Task.prototype.done = function(statusLabel) {
    this.status = statusLabel;
    this.state = STATE.done;
    this.update();
    return this;
};

Task.prototype.fail = function(statusLabel) {
    this.status = statusLabel;
    this.state = STATE.fail;
    this.update();
    return this;
};

function add (label) {
    return new Task(label);
}

module.exports = {
    add: add
};