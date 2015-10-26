/*
 * Sam Fisher Video
 * Copyright 2015 Colin Clark
 * Distributed under the MIT and GPL2 licenses
 * github.com/colinbdclark/samfisher
 */

/*global require, navigator, MediaStreamTrack*/
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

        source: {
            name: null,
            id: null
        },

        model: {
            sources: null
        },

        constraints: {
            video: true,
            audio: false
        },

        members: {
            element: "@expand:fisher.liveVideo.createVideo()"
        },

        events: {
            onSourcesAvailable: null,
            onStreamOpen: null,
            onStreamConnected: null,
            onReady: null,
            onError: null
        },

        listeners: {
            onCreate: [
                "fisher.liveVideo.getSources({that})"
            ],

            onSourcesAvailable: [
                {
                    changePath: "sources",
                    value: null
                },
                {
                    changePath: "sources",
                    value: "{arguments}.0"
                },

                "fisher.liveVideo.openStream({that})"
            ],

            onStreamOpen: [
                "fisher.liveVideo.connectStreamToVideo({that}, {arguments}.0)",
                "{that}.events.onReady.fire()"
            ],

            onError: {
                funcName: "fluid.log",
                args: [
                    fluid.logLevel.WARN,
                    "An error occurred while trying to open a live video stream. Error was:",
                    "{arguments}.0"
                ]
            }
        }
    });

    fisher.liveVideo.getSources = function (that) {
        MediaStreamTrack.getSources(that.events.onSourcesAvailable.fire,
            that.events.onError.fire);
    };

    fisher.liveVideo.createVideo = function () {
        return document.createElement("video");
    };

    fisher.liveVideo.sourceIdForName = function (name, sources) {
        return fluid.find(sources, function (source) {
            if (source.label === name) {
                return source.id;
            }
        });
    };

    fisher.liveVideo.addIdConstraint = function (id, constraints) {
        constraints.video = {
            optional: [
                {
                    sourceId: id
                }
            ]
        };

        return constraints;
    };

    fisher.liveVideo.prepareConstraints = function (that) {
        var source = that.options.source,
            constraints = fluid.copy(that.options.constraints);

        if (!source || (!source.id && !source.name)) {
            return constraints;
        }

        if (source.name) {
            var matchedId = fisher.liveVideo.sourceIdForName(source.name,
                that.model.sources);

            if (matchedId) {
                fisher.liveVideo.addIdConstraint(matchedId, constraints);
            }
        }

        if (source.id) {
            fisher.liveVideo.addIdConstraint(source.id, constraints);
        }

        return constraints;
    };

    fisher.liveVideo.openStream = function (that) {
        var constraints = fisher.liveVideo.prepareConstraints(that);

        navigator.getMedia(constraints,
            that.events.onStreamOpen.fire, that.events.onError.fire);
    };

    fisher.liveVideo.connectStreamToVideo = function (that, stream) {
        that.element.src = window.URL.createObjectURL(stream);
        that.element.play();
        that.events.onStreamConnected.fire();
    };
}());
