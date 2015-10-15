'use strict';
var faker = require('faker');
var q = require('q');
var chalk = require('chalk');

var observatory = require('../lib/observatory').settings({
    width: 55,
    prefix: chalk.cyan('[Buzz] ')
});


function delay(ms) {
    var deferred = q.defer();
    setTimeout(deferred.resolve, faker.random.number(ms || 2000));
    return deferred.promise;
}

function createRandomTask() {

    var task = observatory
        .add(faker.company.bs());
    var percent = 0;

    function download () {
        percent =  faker.random.number(100 - percent) + percent;

        task.status('downloading')
            .details(percent + '%');
        if (percent > 98) {
            return delay(100).then(parse);
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
            .details('https://github.com/' + faker.internet.domainWord() + '/' + faker.company.bsNoun());

        return q.defer().promise;
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


