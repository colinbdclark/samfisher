/*! Sam Fisher Motion Detection 1.0.0, Copyright 2015 Colin Clark | github.com/colinbdclark/samfisher*/
/*! Sam Fisher Motion Detector 1.0.0, Copyright 2015 Colin Clark | github.com/colinbdclark/samfisher */
/*
 * Sam Fisher Core
 * Copyright 2015 Colin Clark
 * Distributed under the MIT and GPL2 licenses
 * github.com/colinbdclark/samfisher
 */

/*global ivank*/
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

    /**
     * Gaussian-style box blur.
     *
     * @param Number radius the blur radius, in pixels
     * @param Uint8ClampedArray source the greyscale buffer to blur
     * @param Uint8ClampedArray target the target buffer
     * @param Dimensions d the image dimensions
     */
    fisher.filter.gaussianBoxBlur = function (radius, source, target, d) {
        ivank.gaussianBoxBlur(source, target,
            d.width, d.height,
            radius);
    };

    fisher.filter.convolve = function (kernel, source, target, d) {
        var kW = Math.sqrt(kernel.length),
            halfKW = (kW / 2) | 0,
            h = d.height,
            w = d.width,
            lastY = h - 1,
            lastX = w - 1,
            accum;

        for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
                accum = 0;

                // Apply the kernel to the source image.
                for (var kY = 0; kY < kW; kY++) {
                    for (var kX = 0; kX < kW; kX++) {
                        // TODO: Faster guarding against image boundaries?
                        var sky = Math.min(lastY, Math.max(0, y + kY - halfKW));
                        var skx = Math.min(lastX, Math.max(0, x + kX - halfKW));
                        var skIdx = sky * w + skx;
                        var kIdx = kY * kW + kX;

                        accum += source[skIdx] * kernel[kIdx];
                    }
                }

                // Output the result of the kernel to the current target pixel.
                var soIdx = (y * w + x);
                source[soIdx] = accum;
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

    fluid.defaults("fisher.frameScheduler", {
        gradeNames: "berg.scheduler",

        freq: 15,

        components: {
            clock: {
                type: "berg.clock.raf"
            }
        }
    });

}());

/*
 * Sam Fisher Canvas
 * Copyright 2015 Colin Clark
 * Distributed under the MIT and GPL2 licenses
 * github.com/colinbdclark/samfisher
 */

/*global require, $, ImageData*/
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

    fluid.defaults("fisher.canvas", {
        gradeNames: "fluid.component",

        dimensions: {
            height: 240,
            width: 320
        },

        members: {
            element: {
                expander: {
                    funcName: "fisher.canvas.createCanvas",
                    args: ["{that}.options.markup", "{that}.options.dimensions"]
                }
            },

            context: {
                expander: {
                    "this": "{that}.element",
                    method: "getContext",
                    args: "2d"
                }
            }
        },

        invokers: {
            drawElement: "fisher.canvas.drawElement({that}, {arguments}.0)",
            getPixels: "fisher.canvas.getPixels({that})",
            putPixels: "fisher.canvas.putPixels({that}, {arguments}.0, {arguments}.1, {arguments}.2)"
        },

        markup: {
            canvas: "<canvas height='%height' width='%width'></canvas>"
        }
    });

    fisher.canvas.createCanvas = function (markup, dimensions) {
        return $(fluid.stringTemplate(markup.canvas, dimensions))[0];
    };

    fisher.canvas.drawElement = function (that, element) {
        that.context.drawImage(element, 0, 0,
            that.options.dimensions.width, that.options.dimensions.height);
    };

    fisher.canvas.getPixels = function (that) {
        return that.context.getImageData(0, 0,
            that.options.dimensions.width, that.options.dimensions.height).data;
    };

    fisher.canvas.putPixels = function (that, pixels, x, y) {
        var d = that.options.dimensions;
        x = x || 0;
        y = y || 0;

        var id = new ImageData(pixels, d.width, d.height);
        that.context.putImageData(id, x, y);
    };

}());

/*
 * Sam Fisher Video
 * Copyright 2015 Colin Clark
 * Distributed under the MIT and GPL2 licenses
 * github.com/colinbdclark/samfisher
 */

/*global require, navigator*/
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

    navigator.getMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    fluid.defaults("fisher.liveVideo", {
        gradeNames: "fluid.modelComponent",

        constraints: {
            video: true,
            audio: false
        },

        members: {
            element: "@expand:fisher.liveVideo.createVideo()"
        },

        events: {
            onStreamOpen: null,
            onReady: null,
            onError: null
        },

        listeners: {
            onCreate: [
                "fisher.liveVideo.openStream({that})"
            ],

            onStreamOpen: [
                "fisher.liveVideo.connectStreamToVideo({that}, {arguments}.0)",
                "{that}.events.onReady.fire()"
            ]
        }
    });

    fisher.liveVideo.createVideo = function () {
        return document.createElement("video");
    };

    fisher.liveVideo.openStream = function (that) {
        navigator.getMedia(that.options.constraints,
            that.events.onStreamOpen.fire, that.events.onError.fire);
    };

    fisher.liveVideo.connectStreamToVideo = function (that, stream) {
        that.element.src = window.URL.createObjectURL(stream);
        that.element.play();
    };
}());

/**
 * Fast Box Blur
 * Copyright 2014 by Ivan Kuckir
 * http://blog.ivank.net/fastest-gaussian-blur.html
 * Licensed under the MIT license
 */

var ivank = ivank || {};

(function () {
    "use strict";

    ivank.gaussianBoxBlur = function (scl, tcl, w, h, r) {
        var bxs = boxesForGauss(r, 3);
        boxBlur_4(scl, tcl, w, h, (bxs[0] - 1) / 2);
        boxBlur_4(tcl, scl, w, h, (bxs[1] - 1) / 2);
        boxBlur_4(scl, tcl, w, h, (bxs[2] - 1) / 2);
    };

    // args: standard deviation, number of boxes
    function boxesForGauss(sigma, n) {
        var wIdeal = Math.sqrt((12 * sigma * sigma / n) + 1);  // Ideal averaging filter width
        var wl = Math.floor(wIdeal);
        if (wl % 2 === 0) {
            wl--;
        }

        var wu = wl + 2;
        var mIdeal = (12 * sigma * sigma - n * wl * wl - 4 * n * wl - 3 * n) / (-4 * wl - 4);
        var m = Math.round(mIdeal);

        var sizes = [];
        for (var i = 0; i < n; i++) {
            sizes.push(i<m?wl:wu);

        }
        return sizes;
    }

    function boxBlur_4 (scl, tcl, w, h, r) {
        for (var i = 0; i < scl.length; i++) {
            tcl[i] = scl[i];
        }

        boxBlurH_4(tcl, scl, w, h, r);
        boxBlurT_4(scl, tcl, w, h, r);
    }

    function boxBlurH_4 (scl, tcl, w, h, r) {
        var iarr = 1 / (r + r + 1);
        for (var i = 0; i < h; i++) {
            var ti = i * w,
                li = ti,
                ri = ti + r,
                fv = scl[ti],
                lv = scl[ti + w - 1],
                val = (r + 1) * fv;

            for (var j = 0; j < r; j++) {
                val += scl[ti + j];
            }

            for (j = 0; j<=r ; j++) {
                val += scl[ri++] - fv;
                tcl[ti++] = Math.round(val * iarr);
            }

            for (j = r + 1; j < w - r; j++) {
                val += scl[ri++] - scl[li++];
                tcl[ti++] = Math.round(val * iarr);
            }

            for (j = w - r; j < w; j++) {
                val += lv - scl[li++];
                tcl[ti++] = Math.round(val * iarr);
            }
        }
    }

    function boxBlurT_4 (scl, tcl, w, h, r) {
        var iarr = 1 / (r + r + 1);
        for(var i = 0; i < w; i++) {
            var ti = i,
                li = ti,
                ri = ti + r * w,
                fv = scl[ti],
                lv = scl[ti + w * (h - 1)],
                val = (r + 1) * fv;
            for (var j = 0; j < r; j++) {
                val += scl[ti+j*w];
            }

            for (j = 0; j<=r ; j++) {
                val += scl[ri] - fv;
                tcl[ti] = Math.round(val * iarr);
                ri += w;
                ti += w;
            }

            for (j = r + 1; j < h - r; j++) {
                val += scl[ri] - scl[li];
                tcl[ti] = Math.round(val * iarr);
                li += w;
                ri += w;
                ti += w;
            }

            for (j = h - r; j<h  ; j++) {
                val += lv - scl[li];
                tcl[ti] = Math.round(val * iarr);
                li += w; ti += w;
            }
        }
    }
}());

/*
 * Sam Fisher Tracked Region
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

    fluid.defaults("fisher.trackedRegion", {
        gradeNames: "fluid.component",

        frameDimensions: {
            height: 240,
            width: 320
        },

        dimensions: {
            height: 240,
            width: 320,
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

        invokers: {
            motionIndex: {
                funcName: "fisher.trackedRegion.motionIndex",
                args: [
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
     * @param Uint8ClampedArray current the current frame
     * @param Uint8ClampedArray previous the previous frame
     * @param Object o this region's options
     */
    fisher.trackedRegion.motionIndex = function (current, previous, o) {
        var d = o.dimensions;

        var rowEnd = d.yOffset + d.height,
            numMovedPixels = 0,
            colStart,
            colEnd,
            diff;

        for (var rowIdx = d.yOffset; rowIdx < rowEnd; rowIdx++) {
            colStart = (o.frameDimensions.width * rowIdx) + d.xOffset;
            colEnd = colStart + d.width;

            for (var i = colStart; i < colEnd; i++) {
                // Get the difference between frames.
                diff = fisher.difference(i, current, previous);

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
            height: 240,
            width: 160,
            xOffset: 0,
            yOffset: 0
        }
    });

    fluid.defaults("fisher.trackedRegion.rightHalf", {
        gradeNames: "fisher.trackedRegion",

        dimensions: {
            height: 240,
            width: 160,
            xOffset: 160,
            yOffset: 0
        }
    });
}());

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
                "{canvas}.drawElement({that}.streamer.element)",
                "fisher.motionTracker.track({that})"
            ],

            onCreate: [
                "{scheduler}.start()",
                "{scheduler}.repeat({scheduler}.options.freq, {that}.events.onNextFrame.fire)"
            ]
        }
    });

    fisher.motionTracker.calcNumPixels = function (dimensions) {
        return dimensions.height * dimensions.width;
    };

    fisher.motionTracker.track = function (that) {
        var pixels = that.canvas.getPixels();

        fisher.greyscale(pixels, that.current);
        fisher.filter.mean(1, that.current, that.current, that.options.dimensions);

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
