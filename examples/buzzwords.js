'use strict';

var taskWatch = require('../lib/taskwatch');
var Faker = require('Faker');
var Q = require('q');

/*
bower angular-url-wrapper#~2                  checkout 2.0.0
bower shared-frontend-dependencies#~0         checkout 0.0.5
bower jquery#~1                               checkout 1.10.2
bower angular-translate#~0                    checkout 0.9.4
bower api-targeting#~1                        checkout 1.0.0
bower angular-ui-select2#~0                   checkout 0.0.3-0
bower foundation#~4                           checkout 4.3.1
bower api-user-accounts#~0                    checkout 0.0.2
bower angular-inject-css#~0                   checkout 0.0.1
bower angularytics#~0.2.0                     checkout 0.2.0
bower select2#~3                              checkout 3.4.1
bower angular-service-mocks#~2                checkout 2.0.0
bower api-bill-compare#~1                     checkout 1.2.0
bower shared-frontend-dependencies#~0         resolved git://github.va.opower.it/x-web/shared-frontend-dependencies.git#0.0.5
bower chai#~1.6.1                           not-cached git@github.va.opower.it:x-web-dependencies/chai.git#~1.6.1
bower chai#~1.6.1                              resolve git@github.va.opower.it:x-web-dependencies/chai.git#~1.6.1
bower lodash#~1.2.1                         not-cached git@github.va.opower.it:x-web-dependencies/lodash.git#~1.2.1
bower lodash#~1.2.1                            resolve git@github.va.opower.it:x-web-dependencies/lodash.git#~1.2.1
bower angular#1.1.5                         not-cached git@github.va.opower.it:x-web-dependencies/angular.git#1.1.5
bower angular#1.1.5                            resolve git@github.va.opower.it:x-web-dependencies/angular.git#1.1.5
bower angular-url-wrapper#~2                  resolved git://github.va.opower.it/x-web/angular-url-wrapper.git#2.0.0
bower angular-ui-select2#~0                   resolved git://github.va.opower.it/x-web-dependencies/ui-select2.git#0.0.3-0
bower select2#~3.4                          not-cached git://github.va.opower.it/x-web-dependencies/select2.git#~3.4
bower select2#~3.4                             resolve git://github.va.opower.it/x-web-dependencies/select2.git#~3.4
bower jquery#>=1.6.4
 */

function delay(ms) {
    var deferred = Q.defer();
    setTimeout(deferred.resolve, ms || Faker.random.number(2000));
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
            task.postfix('https://github.com/' + Faker.Internet.domainWord() + '/' + Faker.random.bs_noun());
            task.done();
            return delay(Faker.random.number(500));
        }

        return delay(Faker.random.number(500)).then(download);
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


