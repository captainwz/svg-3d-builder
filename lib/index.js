'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _util = require('./util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Builder = function () {
    function Builder() {
        _classCallCheck(this, Builder);

        Object.assign(this, {
            svg: null,
            selector: null,
            lineList: [],
            lineIndex: null,
            bezierCurveList: [],
            bezierCurveIndex: null,
            bezierSurfaceList: [],
            bezierSurfaceIndex: null,
            camera: {
                anchor: [0, 0, 0],
                d: 300,
                alpha: 0,
                beta: 0
            },
            screen: {
                ratio: 0.5,
                offsetX: 0,
                offsetY: 0
            }
        });
    }

    _createClass(Builder, [{
        key: 'reset',
        value: function reset() {

            if (this.selector) {
                this.selector.remove();
            }

            Object.assign(this, {
                svg: null,
                selector: null,
                lineList: [],
                lineIndex: null,
                bezierCurveList: [],
                bezierCurveIndex: null,
                bezierSurfaceList: [],
                bezierSurfaceIndex: null,
                camera: {
                    anchor: [0, 0, 0],
                    d: 300,
                    alpha: 0,
                    beta: 0
                },
                screen: {
                    ratio: 0.5,
                    offsetX: 0,
                    offsetY: 0
                }
            });
        }
    }, {
        key: 'setCamera',
        value: function setCamera(opt) {

            if (!opt) {
                opt = {};
            }

            var _opt = opt,
                _opt$anchor = _opt.anchor,
                anchor = _opt$anchor === undefined ? this.camera.anchor : _opt$anchor,
                _opt$d = _opt.d,
                d = _opt$d === undefined ? this.camera.d : _opt$d,
                _opt$alpha = _opt.alpha,
                alpha = _opt$alpha === undefined ? this.camera.alpha : _opt$alpha,
                _opt$beta = _opt.beta,
                beta = _opt$beta === undefined ? this.camera.beta : _opt$beta;


            if (!anchor instanceof Array || anchor.length != 3) {
                throw new Error();
            }

            this.camera = {
                anchor: anchor,
                d: d,
                alpha: alpha,
                beta: beta
            };

            return this;
        }
    }, {
        key: 'setScreen',
        value: function setScreen(opt) {

            if (!opt) {
                opt = {};
            }

            var _opt2 = opt,
                _opt2$ratio = _opt2.ratio,
                ratio = _opt2$ratio === undefined ? this.screen.ratio : _opt2$ratio,
                _opt2$offsetX = _opt2.offsetX,
                offsetX = _opt2$offsetX === undefined ? this.screen.offsetX : _opt2$offsetX,
                _opt2$offsetY = _opt2.offsetY,
                offsetY = _opt2$offsetY === undefined ? this.screen.offsetY : _opt2$offsetY;


            this.screen = {
                ratio: ratio,
                offsetX: offsetX,
                offsetY: offsetY
            };

            this.selector.attr('transform', 'translate(' + offsetX + ', ' + offsetY + ')');

            return this;
        }
    }, {
        key: 'select',
        value: function select(selector) {
            this.svg = d3.select(selector);
            this.selector = this.svg.append('g');

            return this;
        }
    }, {
        key: 'drawLine',
        value: function drawLine(d) {

            this.lineList.push({
                ref: this.selector.append('path'),
                originPath: d,
                stroke: '#000',
                fill: 'transparent'
            });

            this.lineIndex = this.lineList.length - 1;

            return this;
        }
    }, {
        key: 'drawBezierCurve',
        value: function drawBezierCurve(p0, p1, p2, p3, n) {
            this.bezierCurveList.push({
                ref: this.selector.append('path'),
                p0: p0,
                p1: p1,
                p2: p2,
                p3: p3,
                n: n,
                stroke: '#000',
                fill: 'transparent'
            });

            this.bezierCurveIndex = this.bezierCurveList.length - 1;

            return this;
        }
    }, {
        key: 'drawBezierSurface',
        value: function drawBezierSurface(matrix, density) {
            this.bezierSurfaceList.push({
                ref: this.selector.append('path'),
                matrix: matrix,
                density: density,
                stroke: '#000',
                fill: 'transparent'
            });

            this.bezierSurfaceIndex = this.bezierSurfaceList.length - 1;

            return this;
        }
    }, {
        key: 'redrawBezierSurface',
        value: function redrawBezierSurface(matrix, density, index) {
            if (index == undefined) {
                index = this.bezierSurfaceIndex;
            }

            this.bezierSurfaceList[index].matrix = matrix;
            this.bezierSurfaceList[index].density = density;

            return this;
        }
    }, {
        key: 'setLineStroke',
        value: function setLineStroke(color, index) {

            if (index == undefined) {
                index = this.lineIndex;
            }

            this.lineList[index].stroke = color;
            return this;
        }
    }, {
        key: 'setBezierCurveStroke',
        value: function setBezierCurveStroke(color, index) {
            if (index == undefined) {
                index = this.bezierCurveIndex;
            }

            this.bezierCurveList[index].stroke = color;
            return this;
        }
    }, {
        key: 'setBezierSurfaceStroke',
        value: function setBezierSurfaceStroke(color, index) {
            if (index == undefined) {
                index = this.bezierSurfaceIndex;
            }

            this.bezierSurfaceList[index].stroke = color;
            return this;
        }
    }, {
        key: 'action',
        value: function action() {
            var camera = this.camera;
            var screen = this.screen;

            this.lineList.forEach(function (path, k) {

                path.ref.transition().attr('d', (0, _util.getLinePath)(path.originPath, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio)).attr('stroke', path.stroke).attr('fill', path.fill);
            });

            this.bezierCurveList.forEach(function (path, k) {

                path.ref.transition().attr('d', (0, _util.getBezierCurvePath)(path.p0, path.p1, path.p2, path.p3, path.n, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio)).attr('stroke', path.stroke).attr('fill', path.fill);
            });

            this.bezierSurfaceList.forEach(function (path, k) {

                path.ref.transition().attr('d', (0, _util.getBezierSurfacePath)(path.matrix, path.density, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio)).attr('stroke', path.stroke).attr('fill', path.fill);
            });

            return this;
        }
    }]);

    return Builder;
}();

exports.default = Builder;