'use strict';

var observatory = require('../lib/observatory');
var faker = require('faker');
var q = require('q');

function delay(ms) {
    var deferred = q.defer();
    setTimeout(deferred.resolve, faker.random.number(ms || 2000));
    return deferred.promise;
}

function createRandomTask() {

    var task = observatory.add('These lines will need to wrap abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    var percent = 0;

    function download () {
        percent++;

        task.status(percent + '%');

        if (percent === 100) {
            return task.done();
        }

        return delay(100).then(download);
    }

    download();
}

function randomlyAddMore() {

    createRandomTask();

    delay()
        .then(function(){
            createRandomTask();
        });
}

console.log('  ⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽');
console.log('    Running Really long lines  ');
console.log('  ⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺');
randomlyAddMore();


