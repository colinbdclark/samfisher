/*
 * Sam Fisher Pixel Extractor
 * Copyright 2015 Colin Clark
 * Distributed under the MIT and GPL2 licenses
 * github.com/colinbdclark/samfisher
 */

/*global require*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion");
var fisher = fisher || {};

(function () {

    "use strict";

    fluid.defaults("fisher.motionTracker", {
        gradeNames: "fisher.spatial",

        components: {
            scheduler: {
                type: "fisher.frameScheduler"
            },

            streamer: {
                type: "fisher.liveVideo"
            },

            canvas: {
                type: "fisher.canvas",
                options: {
                    model: {
                        dimensions: "{motionTracker}.model.dimensions"
                    }
                }
            }
        },


        events: {
            onMotionUpdate: null
        },

        listeners: {
            "{scheduler}.events.onNextFrame": [
                "{canvas}.drawElement({that}.streamer.element)",
                "fisher.motionTracker.track({that})"
            ]
        }
    });

    fisher.motionTracker.track = function (that) {
        var pixels = that.canvas.getPixels(),
            motionIndex = fisher.motionTracker.motionIndex(pixels, that.previousPixels);

        that.events.onMotionUpdate.fire(motionIndex);
        that.previousPixels = pixels;
    };

    // TODO: Implement
    fisher.motionTracker.motionIndex = function () {
        return 0.0;
    };
}());
