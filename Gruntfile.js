module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Automatically inject Bower components into the app
        wiredep: {
            task: {
                src: [
                    'public/dist/index.html'
                ],
                options: {}
            }
        },
        // Automatically inject custom components
        includeSource: {
            options: {
                basePath: 'public/src',
                baseUrl: '../public/src/'

            },
            target: {
                files: {
                    'public/dist/index.html': 'public/src/index.html'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-include-source');

    grunt.registerTask('default', ['includeSource','wiredep']);

};