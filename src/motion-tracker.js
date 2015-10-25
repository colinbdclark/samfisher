/*
 * Sam Fisher Motion Tracker
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
        gradeNames: "fluid.modelComponent",

        threshold: Math.round(0.2 * 255),

        dimensions: {
            width: 320,
            height: 240
        },

        members: {
            current: "@expand:fisher.buffer(1, {that}.options.dimensions)",
            previous: "@expand:fisher.buffer(1, {that}.options.dimensions)"
        },

        distributeOptions: [
            {
                target: "{that fisher.trackedRegion}.options.frameDimensions",
                source: "{that}.options.dimensions"
            },
            {
                target: "{that fisher.trackedRegion}.options.threshold",
                source: "{that}.options.threshold"
            }
        ],

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
                    dimensions: "{that}.options.dimensions"
                }
            },

            frameTracker: {
                type: "fisher.frameTracker.stereo"
            }
        },

        events: {
            onMotionUpdate: "{frameTracker}.events.onMotionUpdate",
            onNextFrame: null
        },

        listeners: {
            onNextFrame: [
                "{that}.canvas.drawElement({that}.streamer.element)",
                "fisher.motionTracker.track({that})"
            ],

            onCreate: [
                "{scheduler}.start()",
                "{scheduler}.repeat({scheduler}.options.freq, {that}.events.onNextFrame.fire)"
            ]
        }
    });

    fisher.motionTracker.track = function (that) {
        var pixels = that.canvas.getPixels();
        fisher.greyscale(pixels, that.current);
        that.frameTracker.track(that.current, that.previous);
        that.previous.set(that.current);
    };


    fluid.defaults("fisher.frameTracker", {
        gradeNames: "fluid.component",

        invokers: {
            track: {
                funcName: "fluid.notImplemented"
            }
        },

        events: {
            onMotionUpdate: null
        }
    });

    fluid.defaults("fisher.frameTracker.mono", {
        gradenames: "fisher.frameTracker",

        components: {
            region: {
                type: "fisher.trackedRegion"
            }
        },

        invokers: {
            track: {
                funcName: "fisher.frameTracker.mono.track",
                args: ["{that}", "{arguments}.0", "{arguments}.1"]
            }
        }
    });

    fisher.frameTracker.mono.track = function (that, current, previous) {
        var motionIndex = that.region.motionIndex(current, previous);
        that.events.onMotionUpdate.fire(motionIndex);
    };


    fluid.defaults("fisher.frameTracker.stereo", {
        gradeNames: "fisher.frameTracker",

        components: {
            leftRegion: {
                type: "fisher.trackedRegion.leftHalf"
            },

            rightRegion: {
                type: "fisher.trackedRegion.rightHalf"
            }
        },

        invokers: {
            track: {
                funcName: "fisher.frameTracker.stereo.track",
                args: ["{that}", "{arguments}.0", "{arguments}.1"]
            }
        }
    });

    fisher.frameTracker.stereo.track = function (that, current, previous) {
        var l = that.leftRegion.motionIndex(current, previous),
            r = that.rightRegion.motionIndex(current, previous);

        that.events.onMotionUpdate.fire(l, r);
    };
}());
