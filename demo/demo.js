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
                "{leftCanvas}.putPixels({motionTracker}.frameTracker.leftRegion.buffer)",
                "{rightCanvas}.putPixels({motionTracker}.frameTracker.rightRegion.buffer)",
                {
                    "this": "console",
                    method: "log"
                }
            ]
        }
    });

    fisher.demo.makeVisible = function (selector, element) {
        $(selector).append(element);
    };
}());
