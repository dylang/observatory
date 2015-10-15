'use strict';

var position = require('ansi-escapes');
var _ = require('lodash');

var constants = require('./constants');

var out = require('./out');
var settings = require('./settings');

// global state
var currentLine = 1;

function createTask(description) {

    var task = {
        description: description,
        statusLabel: '',
        detailsLabel: '',
        state: constants.state.active,
        line: currentLine,
        longest: 0
    };

    function render() {
        var statusLabel = ' ' + settings.formatStatus(task.statusLabel, task.state);
        var margin = out.padding((settings.width() - out.ln(task.description)) - out.ln(statusLabel));
        var output = settings.prefix() + task.description + margin + statusLabel + ' ' + task.detailsLabel;
        var length = out.ln(output);
        var clear = out.padding(task.longest - length + 1);
        task.longest = Math.max(length, task.longest);
        return output + clear;
    }

    function update() {
        var output = task.render();
        var change = currentLine - task.line;
        out.write(position.cursorUp(change));
        out.write(output);
        out.write(position.cursorDown(change - (out.height(output) - 1)));
        out.write(position.cursorBackward(out.ln(output)));
        return task;
    }

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

    function status(status_) {
        task.setStatusLabel(status_, '');
        return task.update();
    }

    function done(status) {
        task.setState(constants.state.done);
        task.setStatusLabel(status, '✓ Done');  //move to constant
        return task.update();
    }

    function fail(status) {
        task.setState(constants.state.fail);
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

    currentLine = out.writeln(currentLine, task.render());

    return task;
}


function add(description) {
    return createTask(description);
}

module.exports = {
    add: add,
    STATE: constants.state
};

module.exports.settings = function(options) {
    settings.setSettings(options);
    return module.exports;
};
