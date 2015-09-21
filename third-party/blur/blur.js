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
