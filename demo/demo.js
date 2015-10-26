/*global fisher*/
(function () {
    "use strict";

    fluid.defaults("fisher.demo", {
        gradeNames: "fluid.component",

        components: {
            motionTracker: {
                type: "fisher.motionTracker",
                options: {
                    components: {
                        streamer: {
                            options: {
                                source: {
                                    name: "Live! Cam Sync"
                                }
                            }
                        }
                    }
                }
            },

            workingCanvas: {
                type: "fisher.canvas",
                options: {
                    dimensions: {
                        height: 240,
                        width: 320
                    }
                }
            },

            leftCanvas: {
                type: "fisher.canvas",
                options: {
                    dimensions: {
                        height: 240,
                        width: 160
                    }
                }
            },

            rightCanvas: {
                type: "fisher.canvas",
                options: {
                    dimensions: {
                        height: 240,
                        width: 160
                    }
                }
            }
        },

        listeners: {
            onCreate: [
                "fisher.demo.makeVisible(#diffCanvases, {workingCanvas}.element)",
                "fisher.demo.makeVisible(#diffCanvases, {leftCanvas}.element)",
                "fisher.demo.makeVisible(#diffCanvases, {rightCanvas}.element)"
            ],

            "{motionTracker}.events.onMotionUpdate": [
                "{workingCanvas}.putMonochromePixels({motionTracker}.current)",
                "fisher.demo.showDifference({leftCanvas}, {arguments}.0)",
                "fisher.demo.showDifference({rightCanvas}, {arguments}.1)"
            ]
        }
    });

    fisher.demo.makeVisible = function (selector, element) {
        $(selector).append(element);
    };

    fisher.demo.showDifference = function (canvas, difference) {
        var pixels = canvas.getPixels(),
            val = (difference * 255) | 0;

        for (var i = 0; i < pixels.length; i += 4) {
            pixels[i] = val;
            pixels[i + 1] = val;
            pixels[i + 2] = val;
            pixels[i + 3] = 255;
        }

        canvas.putPixels(pixels);
    };
}());
