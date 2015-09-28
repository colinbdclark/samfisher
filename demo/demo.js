/*global fisher*/
(function () {
    "use strict";

    fluid.defaults("fisher.demo", {
        gradeNames: "fluid.component",

        components: {
            motionTracker: {
                type: "fisher.motionTracker"
            },

            leftCanvas: {
                type: "fisher.canvas",
                options: {
                    dimensions: {
                        height: 480,
                        width: 320
                    }
                }
            },

            rightCanvas: {
                type: "fisher.canvas",
                options: {
                    dimensions: {
                        height: 480,
                        width: 320
                    }
                }
            }
        },

        listeners: {
            onCreate: [
                "fisher.demo.makeVisible(#diffCanvases, {leftCanvas}.element)",
                "fisher.demo.makeVisible(#diffCanvases, {rightCanvas}.element)"
            ],

            "{motionTracker}.events.onMotionUpdate": [
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
