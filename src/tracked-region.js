/*
 * Sam Fisher Tracked Region
 * Copyright 2015 Colin Clark
 * Distributed under the MIT and GPL2 licenses
 * github.com/colinbdclark/samfisher
 */

/*global require, Uint8ClampedArray, ivank*/
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

    fluid.defaults("fisher.trackedRegion", {
        gradeNames: "fluid.component",

        frameDimensions: {
            height: 480,
            width: 640
        },

        dimensions: {
            height: 480,
            width: 640,
            xOffset: 0,
            yOffset: 0
        },

        numChannels: 4,

        numPixels: {
            expander: {
                funcName: "fisher.countPixels",
                args: ["{that}.options.dimensions"]
            }
        },

        members: {
            buffer: {
                expander: {
                    funcName: "fisher.createColourImageBuffer",
                    args: ["{that}.options.dimensions"]
                }
            }
        },

        invokers: {
            motionIndex: {
                funcName: "fisher.trackedRegion.motionIndex",
                args: [
                    "{that}.buffer",
                    "{arguments}.0",
                    "{arguments}.1",
                    "{that}.options"
                ]
            }
        }
    });

    /**
     * Calculates the index of motion for this Region
     * by determining the absolute difference between
     * the specified image buffers.
     *
     * @param Uint8ClampedArray buffer this region's working image buffer
     * @param Uint8ClampedArray current the current frame
     * @param Uint8ClampedArray previous the previous frame
     * @param Object o this region's options
     */
    fisher.trackedRegion.motionIndex = function (buffer, current, previous, o) {
        var d = o.dimensions;

        var rowEnd = d.yOffset + d.height,
            numMovedPixels = 0,
            localOffset = 0,
            colStart,
            colEnd,
            diff;

        for (var rowIdx = d.yOffset; rowIdx < rowEnd; rowIdx++) {
            colStart = (o.frameDimensions.width * rowIdx) + d.xOffset;
            colEnd = colStart + d.width;

            for (var i = colStart; i < colEnd; i++, localOffset += 4) {
                // Get the difference between frames.
                diff = fisher.difference(i, current, previous);

                // TODO: remove after debugging.
                buffer[localOffset] = diff;
                buffer[localOffset + 1] = diff;
                buffer[localOffset + 2] = diff;

                // Count the pixel as showing movement
                // if it has changed more than the threshold amount.
                if (diff >= o.threshold) {
                    numMovedPixels++;
                }
            }
        }

        return numMovedPixels / o.numPixels;
    };

    fluid.defaults("fisher.trackedRegion.leftHalf", {
        gradeNames: "fisher.trackedRegion",

        dimensions: {
            height: 480,
            width: 320,
            xOffset: 0,
            yOffset: 0
        }
    });

    fluid.defaults("fisher.trackedRegion.rightHalf", {
        gradeNames: "fisher.trackedRegion",

        dimensions: {
            height: 480,
            width: 320,
            xOffset: 320,
            yOffset: 0
        }
    });
}());
