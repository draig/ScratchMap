//Gruntfile
module.exports = function(grunt) {

    //Initializing the configuration object
    grunt.initConfig({

        // Task configuration
        less: {
            development: {
                options: {
                    compress: false  // no minification in dev
                },
                files: {
                    //compiling base.less into styles.css
                    "./public/style/styles.css": "./public/style/base.less"
                }
            },
            production: {
                options: {
                    cleancss: true, // minify css
                    compress: true // minify css
                },
                files: {
                    //compiling base.less into main.min.css
                    "./public/style/styles.min.css": "./public/style/base.less"
                }
            }
        },
        requirejs: {
            //...
        },
        watch: {
            //...
        }
    });

    // Plugin loading

    // Task definition

    // Plugin loading
    grunt.loadNpmTasks('grunt-contrib-less');

    // Task definition
    grunt.registerTask('default', ['less']);

};