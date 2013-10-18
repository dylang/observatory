'use strict';
/*
 * observatory
 * https://github.com/dylang/observatory
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */

var cliColor = require('cli-color');
var _ = require('lodash');

// treat it like a const
var STATE = require('./state');
var utils = require('./utils');
var setSettings = require('./set-settings');

// global state
var currentLine = 1;
var settings = {};

setSettings(null, settings);

function createTask(description) {

    var task = {        
        description: description,
        statusLabel: '',
        detailsLabel: '',
        state: STATE.active,
        line: currentLine,
        longest: 0
    };

    function render() {
        var statusLabel = ' ' + settings.formatStatus(task.statusLabel, task.state);
        var margin = utils.padding((settings.width - utils.ln(task.description)) - utils.ln(statusLabel));
        var output = settings.prefix + task.description + margin + statusLabel + ' ' + task.detailsLabel;
        var length = utils.ln(output);
        var clear = utils.padding(task.longest - length + 1);
        task.longest = Math.max(length, task.longest);
        return output + clear;
    };

    function update() {
        var output = task.render();
        var change = currentLine - task.line;
        utils.write(cliColor.up(change));
        utils.write(output);
        utils.write(cliColor.down(change - (utils.height(output) - 1)));
        utils.write(cliColor.left(utils.ln(output)));
        return task;
    };

    function setStatusLabel(statusLabel, defaultValue) {
        task.statusLabel = (typeof statusLabel === 'string') ? statusLabel : defaultValue;
    }

    function setState(state) {
        task.state = state;
    }

    function details(detailsLabel) {
        task.detailsLabel = detailsLabel;
        return task.update();
    }

    function status(status) {
        task.setStatusLabel(status, '');
        return task.update();
    }

    function done(status) {
        task.setState(STATE.done);
        task.setStatusLabel(status, '✓ Done');  //move to constant
        return task.update();
    }

    function fail(status) {
        task.setState(STATE.fail);
        task.setStatusLabel(status, '✗ Failed'); //move to constant
        return task.update();
    }
    
    _.merge(task, {
        render: render,
        update: update,
        setStatusLabel: setStatusLabel,
        setState: setState,
        details: details,
        status: status,
        done: done,
        fail: fail
    });

    currentLine = utils.writeln(currentLine, task.render());

    return task;
}


function add(description) {
    return createTask(description);
}

module.exports = {
    add: add,
    STATE: STATE
};

module.exports.settings = setSettings(module.exports, settings);
