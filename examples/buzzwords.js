'use strict';

var taskWatch = require('../lib/taskwatch');
var Faker = require('Faker');
var Q = require('q');

function delay(ms) {
    var deferred = Q.defer();
    setTimeout(deferred.resolve, Faker.random.number(ms || 2000));
    return deferred.promise;
}

function createRandomTask() {

    var task = taskWatch.add(Faker.Company.bs());
    var percent = 0;

    function start() {
        task.start();
        return delay();
    }

    function download () {
        percent =  Faker.random.number(100 - percent) + percent + 1;

        task.continue('downloading');
        task.postfix(percent + '%');
        if (percent === 100) {
            return delay(500).then(parse);
        }

        return delay(500).then(download);
    }

    function parse() {
        task.continue('parsing')
            .postfix('');

        return delay(1500)
            .then(done);
    }

    function done() {
        task.postfix('https://github.com/' + Faker.Internet.domainWord() + '/' + Faker.random.bs_noun())
            .done();
        return Q.defer().promise;
    }

    delay()
        .then(start)
        .then(download)
        .fail(function(err){
            console.log('ERR', err);
        });
}

function randomlyAddMore() {

    createRandomTask();

    delay()
        .then(function(){
            randomlyAddMore();
        });
}

console.log('  ⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽');
console.log('    Running Random Fake Taskwatch Commands  ');
console.log('  ⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺');
randomlyAddMore();


