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
