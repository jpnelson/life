module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: "./",
                    name: "src/life.js", // assumes a production build using almond
                    out: "dist/life.js"
                }
            }
        }
    });

};