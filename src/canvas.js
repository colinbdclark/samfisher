/*
 * Sam Fisher Canvas
 * Copyright 2015 Colin Clark
 * Distributed under the MIT and GPL2 licenses
 * github.com/colinbdclark/samfisher
 */

/*global require, $*/
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
        gradeNames: "fisher.spatial",

        invokers: {
            drawElement: "fisher.canvas.drawElement({that}, {arguments}.0)",
            getPixels: "fisher.canvas.getPixels({that})"
        },

        listeners: {
            onCreate: [
                "fisher.canvas.createCanvas({that}, {motionTracker}.model.dimensions)"
            ]
        },

        markup: {
            canvas: "<canvas height='%height' width='%width'></canvas>"
        }
    });

    fisher.canvas.createCanvas = function (that, dimensions) {
        var markup = fluid.stringTemplate(that.options.markup.canvas, dimensions),
            canvas = $(markup);

        // TODO: Remove that-bashing.
        that.element = canvas[0];
        that.context = that.element.getContext("2d");

        return that.element;
    };

    fisher.canvas.drawElement = function (that, element) {
        that.context.drawImage(element, 0, 0, that.model.dimensions.width, that.model.dimensions.height);
    };

    fisher.canvas.getPixels = function (that) {
        return that.context.getImageData(0, 0, that.model.dimensions.width, that.model.dimensions.height);
    };
}());
