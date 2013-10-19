'use strict';

var cliColor = require('cli-color');
var ansiTrim = require('cli-color/lib/trim');
var OS = require('os');
var settings = require('./settings');
/**
 * figure out how many lines a string of text will use
 * @param text
 * @returns {number}
 */
function height(text) {
    // todo: text might include \n
    return Math.ceil(text.length/cliColor.width);
}

function writeln(currentLine, text) {
    currentLine += height(text);
    write(text + OS.EOL);
    return currentLine;
}

function write(text) {
    settings.write(text);
}

function ln(text) {
    return ansiTrim(text || '').length;
}

function padding(n) {
    return n > 0 ? (new Array(n)).join(' ') : '';
}

module.exports = {
    height: height,
    writeln: writeln,
    write: write,
    ln: ln,
    padding: padding
};