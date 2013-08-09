'use strict';
var expect = require('chai').expect;
var taskWatch = require('../lib/taskwatch.js');
var Faker = require('Faker');

describe('taskwatch', function () {
    describe('addTask', function () {

        it('addTask simple', function () {
            var label = Faker.Company.catchPhrase();
            var task = taskWatch.add(label);
            expect(task).to.be.an.object;
        });

    });

    describe('workflow', function () {

        it('start task', function () {
            var label = Faker.Company.catchPhrase();
            var task = taskWatch.add(label);
            task.start();
        });

        it('done', function () {
            var label = Faker.Company.catchPhrase();
            var task = taskWatch.add(label);
            task.start().done();
        });

        it('fail', function () {
            var label = Faker.Company.catchPhrase();
            var task = taskWatch.add(label);
            task.start().fail();
        });

    });


    describe('multiple tasks', function () {

        it('', function () {
            var task1 = taskWatch.add(Faker.Company.catchPhrase());
            var task2 = taskWatch.add(Faker.Company.catchPhrase());
            var task3 = taskWatch.add(Faker.Company.catchPhrase());
            task1.start();
            task2.start();
            task3.start();
            task1.done();
            task2.done();
            task3.done();
        });
    });


    describe('change status text', function () {

        it('', function () {
            var task = taskWatch.add(Faker.Company.catchPhrase());
            task.start('started')
                .continue('download files')
                .continue('read files')
                .continue('drink coffee')
                .done('done!');
        });
    });


});