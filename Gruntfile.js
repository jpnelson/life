module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: './src',
                    name: 'life',
                    out: 'dist/life.js',
                    optimize: 'none'
                }
            }
        }
    });

};