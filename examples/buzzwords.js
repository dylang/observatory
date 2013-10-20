'use strict';
var Faker = require('Faker');
var Q = require('q');
var cliColor = require('cli-color');

var observatory = require('../lib/observatory').settings({
    width: 55,
    prefix: cliColor.cyan('[Buzz] ')
});


function delay(ms) {
    var deferred = Q.defer();
    setTimeout(deferred.resolve, Faker.random.number(ms || 2000));
    return deferred.promise;
}

function createRandomTask() {

    var task = observatory
        .add(Faker.Company.bs());
    var percent = 0;

    function download () {
        percent =  Faker.random.number(100 - percent) + percent + 1;

        task.status('downloading')
            .details(percent + '%');
        if (percent === 100) {
            return delay(500).then(parse);
        }

        return delay(500).then(download);
    }

    function parse() {
        task.status('parsing')
            .details('');

        return delay(1500)
            .then(done);
    }

    function done() {
        task.done()
            .details('https://github.com/' + Faker.Internet.domainWord() + '/' + Faker.random.bs_noun());

        return Q.defer().promise;
    }

    delay()
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
console.log('    Running Random Fake observatory Commands  ');
console.log('  ⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺');
randomlyAddMore();


