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
