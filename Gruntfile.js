'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        cafemocha: {
           taskwatch: {
               src: 'test/**/*.test.js',
               options: {
                   timeout: 10000,
                   ui: 'bdd',
                   reporter: 'min', //'spec',
                   require: [
                       'chai'
                   ]
               }
           }
        },
        jshint: {
            options: {
                maxerr: 10000,      // keep running no matter how many errors were found
                globalstrict: true, // allows 'use strict' with single quotes
                newcap: false,       // allows  functions to be capitalized without New
                node: true,
                force: true
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib: {
                src: 'lib/**/*.js'
            },
            examples: {
                src: 'examples/**/*.js'
            },
            test: {
                options: {
                    strict: false,      // don't require strict
                    expr: true,         // allow expressions like foo.ok;
                    globals: {
                        // angular
                        angular: true,
                        module: true,
                        inject: true,

                        //jasmine
                        jasmine: true,
                        isCommonJS: true,
                        exports: true,
                        spyOn: true,
                        it: true,
                        xit: true,
                        expect: true,
                        runs: true,
                        waits: true,
                        waitsFor: true,
                        beforeEach: true,
                        afterEach: true,
                        describe: true,
                        xdescribe: true,

                        //chai
                        chai: true
                    }

                },
                src: ['test/**/*.test.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib: {
                files: '<%= jshint.lib.src %>, <%= jshint.test.src %>',
                tasks: [
                    'jshint:lib',
                    'jshint:test',
                    'cafemocha'
                ]
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-cafe-mocha');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    // Default task.
    grunt.registerTask('default', ['jshint', 'cafemocha']);
    grunt.registerTask('test', ['jshint', 'cafemocha']);

};
