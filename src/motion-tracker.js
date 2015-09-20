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
        gradeNames: "fluid.modelComponent",

        channelOffset: 4,
        threshold: Math.round(0.1 * 255),
        numPixels: "@expand:fisher.motionTracker.calcNumPixels({canvas}.options.dimensions)",

        components: {
            scheduler: {
                type: "fisher.frameScheduler",
                options: {
                    events: {
                        onNextFrame: "{motionTracker}.events.onNextFrame"
                    }
                }
            },

            streamer: {
                type: "fisher.liveVideo"
            },

            canvas: {
                type: "fisher.canvas"
            }
        },

        invokers: {
            motionIndex: {
                funcName: "fisher.motionTracker.motionIndex",
                args: [
                    "{that}.options.channelOffset",
                    "{that}.options.threshold",
                    "{that}.options.numPixels",
                    "{arguments}.0",
                    "{that}.previous"
                ]
            }
        },

        events: {
            onMotionUpdate: null,
            onNextFrame: null
        },

        listeners: {
            onNextFrame: [
                "{canvas}.drawElement({that}.streamer.element)",
                "fisher.motionTracker.track({that})"
            ],

            onMotionUpdate: [
                {
                    "this": "console",
                    method: "log"
                }
            ]
        }
    });

    fisher.motionTracker.calcNumPixels = function (dimensions) {
        return dimensions.height * dimensions.width;
    };

    fisher.motionTracker.track = function (that) {
        var current = that.canvas.getPixels().data,
            motionIndex = that.motionIndex(current);

        that.events.onMotionUpdate.fire(motionIndex);
        that.previous = current;
    };

    fisher.motionTracker.motionIndex = function (channelOffset, threshold,
        numPixels, currentPixels, previousPixels) {
        if (!previousPixels) {
            return 0;
        }

        var numMovedPixels = 0,
            i, gi, bi,
            r, g, b,
            lum;

        for (i = 0; i < currentPixels.length; i += channelOffset) {
            gi = i + 1;
            bi = i + 2;

            r = previousPixels[i] - currentPixels[i];
            g = previousPixels[gi] - currentPixels[gi];
            b = previousPixels[bi] - currentPixels[bi];

            lum = r * 0.2126 + g * 0.7152 + b * 0.0722;

            if (lum >= threshold) {
                numMovedPixels++;
            }
        }

        return numMovedPixels / numPixels;
    };
}());
