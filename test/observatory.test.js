'use strict';
var expect = require('chai').expect;
var observatory = require('../lib/observatory.js');
var Faker = require('Faker');

observatory.settings({write: function(text){return text;    }});

describe('observatory', function () {
    describe('addTask', function () {

        it('addTask simple', function () {
            var label = Faker.Company.catchPhrase();
            var task = observatory.add(label);
            expect(task).to.be.an.object;
        });

    });

    describe('workflow', function () {

        it('create task', function () {
            var label = Faker.Company.catchPhrase();
            var task = observatory.add(label);
        });

        it('done', function () {
            var label = Faker.Company.catchPhrase();
            var task = observatory.add(label);
            task.done();
        });

        it('fail', function () {
            var label = Faker.Company.catchPhrase();
            var task = observatory.add(label);
            task.fail();
        });

    });


    describe('multiple tasks', function () {

        it('', function () {
            var task1 = observatory.add(Faker.Company.catchPhrase());
            var task2 = observatory.add(Faker.Company.catchPhrase());
            var task3 = observatory.add(Faker.Company.catchPhrase());
            task1.done();
            task2.done();
            task3.done();
        });
    });

    describe('change status text', function () {

        it('', function () {
            var task = observatory.add(Faker.Company.catchPhrase());
            task.status('started')
                .status('download files')
                .status('read files')
                .status('drink coffee')
                .done('done!');
        });
    });
});