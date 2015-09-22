/*global module*/

module.exports = function(grunt) {
    "use strict";

    var files = {
        jQuery: [
            "node_modules/jquery/dist/jquery.js"
        ],

        infusion: [
            "node_modules/infusion/src/framework/core/js/Fluid.js",
            "node_modules/infusion/src/framework/core/js/FluidDebugging.js",
            "node_modules/infusion/src/framework/core/js/FluidIoC.js",
            "node_modules/infusion/src/framework/core/js/DataBinding.js"
        ],

        bergson: [
            "node_modules/bergson/dist/bergson-only.js"
        ],

        fisher: [
            "src/core.js",
            "src/frame-scheduler.js",
            "src/canvas.js",
            "src/video.js",
            "third-party/blur/blur.js",
            "src/tracked-region.js",
            "src/motion-tracker.js",
        ]
    };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        jshint: {
            all: [
                "src/**/*.js",
                "tests/**/*js",
                "!**/third-party/**"
            ],
            options: {
                jshintrc: true
            }
        },

        concat: {
            options: {
                banner: "<%= fisher.banners.header %>"
            },

            all: {
                src: [].concat(files.jQuery, files.infusion, files.bergson, files.fisher),
                dest: "dist/<%= pkg.name %>-all.js"
            },

            only: {
                src: files.fisher,
                dest: "dist/<%= pkg.name %>-only.js"
            }
        },

        uglify: {
            options: {
                banner: "<%= fisher.banners.header %>",
                beautify: {
                    ascii_only: true
                }
            },
            all: {
                files: [
                    {
                        expand: true,
                        cwd: "dist/",
                        src: ["*.js"],
                        dest: "dist/",
                        ext: ".min.js",
                    }
                ]
            }
        },

        clean: {
            all: {
                src: ["dist/"]
            }
        },

        watch: {
            scripts: {
                files: ["src/**/*.js", "third-party/**/*.js", "node_modules/**/*.js", "Gruntfile.js"],
                tasks: ["default"],
                options: {
                    spawn: false
                }
            }
        },

        fisher: {
            banners: {
                header: "/*! Sam Fisher Motion Detection <%= pkg.version %>, Copyright <%= grunt.template.today('yyyy') %> Colin Clark | github.com/colinbdclark/samfisher*/\n"
            }
        }
    });

    // Load relevant Grunt plugins.
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("default", ["clean", "concat", "uglify", "jshint"]);
};
