/*! Sam Fisher Motion Detector 1.0.0, Copyright 2015 Colin Clark | github.com/colinbdclark/samfisher */
/*
 * Sam Fisher Core
 * Copyright 2015 Colin Clark
 * Distributed under the MIT and GPL2 licenses
 * github.com/colinbdclark/samfisher
 */

/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fisher = fisher || {};

(function () {
    "use strict";

    fisher.countPixels = function (d) {
        return d.height * d.width;
    };

    fisher.buffer = function (numChannels, d) {
        var numPixels = fisher.countPixels(d),
            len = numChannels * numPixels;

        return new Uint8ClampedArray(len);
    };

    fisher.createColourImageBuffer = function (d) {
        var buffer = fisher.buffer(4, d);

        // Set the alpha channel to fully opaque.
        for (var i = 3; i < buffer.length; i += 4) {
            buffer[i] = 255;
        }

        return buffer;
    };


    /**
     * Calculates the luminance of the specified pixel frame.
     *
     * @param Number localOffset the current offset into the buffer
     * @return Number the pixel's luminance
     */
    fisher.luminance = function (i, buffer) {
        return buffer[i] * 0.2126 + buffer[i + 1] * 0.7152 + buffer[i + 2] * 0.0722;
    };

    /**
     * Converts the source buffer to greyscale and copies it into the target buffer.
     *
     * @param Uint8ClampedArray source the buffer to convert to greyscale
     * @param Uint8ClampedArray target the greyscale copy
     */
    fisher.greyscale = function (source, target) {
        for (var i = 0; i < target.length; i++) {
            target[i] = fisher.luminance(i * 4, source);
        }
    };

    /**
     * Subtracts the current pixel from the previous one,
     * returning the absolute difference between them.
     *
     * @param Number offset the current offset
     * @param Uint8ClampedArray currentGrey the current image
     * @param Uint8ClampedArray previousGrey the previous image
     */
    fisher.difference = function (offset, current, previous) {
        return Math.abs(previous[offset] - current[offset]);
    };


    fisher.filter = {};

    fisher.filter.convolve = function (kernel, source, target, d) {
        var kW = Math.sqrt(kernel.length),
            halfKW = Math.floor(kW / 2),
            h = d.height,
            w = d.width,
            accum;

        for (var y = halfKW; y < h - halfKW - 1; y++) {
            for (var x = halfKW; x < w - halfKW - 1; x++) {
                accum = 0;

                // Apply the kernel to the source image.
                for (var kY = 0; kY < kW; kY++) {
                    var sky = y + kY - halfKW;
                    var skw = sky * w;

                    for (var kX = 0; kX < kW; kX++) {
                        var skIdx = skw + (x + kX - halfKW);
                        var kIdx = kY * kW + kX;
                        accum += source[skIdx] * kernel[kIdx];
                    }
                }

                // Output the result of the kernel to the current target pixel.
                var soIdx = (y * w + x);
                target[soIdx] = accum;
            }
        }
    };

    fisher.filter.mean = function (source, target, d) {
        return fisher.filter.convolve(fisher.filter.mean.kernel, source, target, d);
    };

    fisher.filter.mean.kernel = [
        1/9, 1/9, 1/9,
        1/9, 1/9, 1/9,
        1/9, 1/9, 1/9
    ];
}());
