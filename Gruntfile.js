module.exports = function(grunt) {

    var host = 'localhost';
    var port = 8080;

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //JSHint is a community-driven tool to detect errors and potential problems in JavaScript code and to enforce your team's coding conventions.
        jshint: {
            all: [ 'Gruntfile.js', 'app/*.js', 'app/**/*.js',"app/**/*.json" ]
        },

        //Starts server at 8080
        connect: {
            server: {
                options: {
                    hostname: host,
                    port: port
                }
            }
        },
        // Automatically inject Bower components into the app
        wiredep: {
            default: {
                src: [
                    'index.html'
                ]
            }
        },
        // Automatically inject custom components
        includeSource: {
            options: {
                basePath: 'app',
                baseUrl: '/app/'

            },
            target: {
                files: {
                    'index.html': 'app/index.html'
                }
            }
        },
        //Automatically detect file changes and take according actions
        watch: {
            default: {
                files: [ 'Gruntfile.js', 'app/**/*.js', 'app/**/*.html'],
                tasks: [ 'includeSource', 'wiredep','jshint','info:running' ],
                options: {
                    atBegin: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('info', 'Info about server', function(state){
        console.log('UI-Kitchen-Sink '+state+' at http://'+host+":"+port);
    });

    grunt.registerTask('default', ['jshint','wiredep','connect:server','info:started' ,'watch:default']);



};