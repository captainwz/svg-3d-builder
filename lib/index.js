'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d3 = require('d3');

var d3 = _interopRequireWildcard(_d3);

var _util = require('./util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Builder = function () {
    function Builder() {
        _classCallCheck(this, Builder);

        Object.assign(this, {
            svg: null,
            selector: null,
            bezierSurfaceGroup: null,
            lineList: [],
            lineIndex: null,
            bezierCurveList: [],
            bezierCurveIndex: null,
            bezierSurfaceList: [],
            bezierSurfaceIndex: null,
            bezierTriangleList: [],
            bezierTriangleIndex: null,
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
            },
            axis: {
                show: false,
                xLength: 200,
                xColor: '#000',
                yLength: 200,
                yColor: '#000',
                zLength: 200,
                zColor: '#000',
                xRef: null,
                yRef: null,
                zRef: null
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
                bezierSurfaceGroup: null,
                lineList: [],
                lineIndex: null,
                bezierCurveList: [],
                bezierCurveIndex: null,
                bezierSurfaceList: [],
                bezierSurfaceIndex: null,
                bezierTriangleList: [],
                bezierTriangleIndex: null,
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
                },
                axis: {
                    show: false,
                    xLength: 200,
                    xColor: '#000',
                    yLength: 200,
                    yColor: '#000',
                    zLength: 200,
                    zColor: '#000',
                    xRef: null,
                    yRef: null,
                    zRef: null
                }
            });

            return this;
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
        key: 'setAxis',
        value: function setAxis(opt) {

            if (!opt) {
                opt = {};
            }

            var _opt3 = opt,
                _opt3$show = _opt3.show,
                show = _opt3$show === undefined ? this.axis.show : _opt3$show,
                _opt3$xLength = _opt3.xLength,
                xLength = _opt3$xLength === undefined ? this.axis.xLength : _opt3$xLength,
                _opt3$xColor = _opt3.xColor,
                xColor = _opt3$xColor === undefined ? this.axis.xColor : _opt3$xColor,
                _opt3$yLength = _opt3.yLength,
                yLength = _opt3$yLength === undefined ? this.axis.yLength : _opt3$yLength,
                _opt3$yColor = _opt3.yColor,
                yColor = _opt3$yColor === undefined ? this.axis.yColor : _opt3$yColor,
                _opt3$zLength = _opt3.zLength,
                zLength = _opt3$zLength === undefined ? this.axis.zLength : _opt3$zLength,
                _opt3$zColor = _opt3.zColor,
                zColor = _opt3$zColor === undefined ? this.axis.zColor : _opt3$zColor;


            this.axis = {
                show: show,
                xLength: xLength,
                xColor: xColor,
                yLength: yLength,
                yColor: yColor,
                zLength: zLength,
                zColor: zColor,
                xRef: this.axis.xRef ? this.axis.xRef : this.selector.append('path'),
                yRef: this.axis.yRef ? this.axis.yRef : this.selector.append('path'),
                zRef: this.axis.zRef ? this.axis.zRef : this.selector.append('path')
            };

            return this;
        }
    }, {
        key: 'select',
        value: function select(selector) {
            this.svg = d3.select(selector);
            this.selector = this.svg.append('g');
            this.bezierSurfaceGroup = this.selector.append('g');

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
        key: 'redrawLine',
        value: function redrawLine(d, index) {
            if (index == undefined) {
                index = this.lineIndex;
            }

            this.lineList[index].originPath = d;

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
        key: 'redrawBezierCurve',
        value: function redrawBezierCurve(p0, p1, p2, p3, n, index) {
            if (index == undefined) {
                index = this.bezierCurveIndex;
            }

            this.bezierCurveList[index].p0 = p0;
            this.bezierCurveList[index].p1 = p1;
            this.bezierCurveList[index].p2 = p2;
            this.bezierCurveList[index].p3 = p3;
            this.bezierCurveList[index].n = n;

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
                strokeWidth: 0.5,
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
        key: 'drawBezierTriangle',
        value: function drawBezierTriangle(control, density) {

            this.bezierTriangleList.push({
                control: control,
                density: density,
                stroke: '#000',
                strokeWidth: 0.5,
                fill: 'transparent'
            });

            this.bezierTriangleIndex = this.bezierTriangleList.length - 1;
            return this;
        }
    }, {
        key: 'redrawBezierTriangle',
        value: function redrawBezierTriangle(control, density, index) {
            if (index == undefined) {
                index = this.bezierTriangleIndex;
            }

            this.bezierTriangleList[index].control = control;
            this.bezierTriangleList[index].density = density;

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
        key: 'setBezierTriangleStroke',
        value: function setBezierTriangleStroke(color, index) {
            if (index == undefined) {
                index = this.bezierTriangleIndex;
            }

            this.bezierTriangleList[index].stroke = color;
            return this;
        }
    }, {
        key: 'setBezierSurfaceStrokeWidth',
        value: function setBezierSurfaceStrokeWidth(width, index) {
            if (index == undefined) {
                index = this.bezierSurfaceIndex;
            }

            this.bezierSurfaceList[index].strokeWidth = width;
            return this;
        }
    }, {
        key: 'setBezierTriangleStrokeWidth',
        value: function setBezierTriangleStrokeWidth(width, index) {
            if (index == undefined) {
                index = this.bezierTriangleIndex;
            }
            this.bezierTriangleList[index].strokeWidth = width;
            return this;
        }
    }, {
        key: 'setBezierSurfaceFill',
        value: function setBezierSurfaceFill(color, index) {
            if (index == undefined) {
                index = this.bezierSurfaceIndex;
            }

            this.bezierSurfaceList[index].fill = color;
            return this;
        }
    }, {
        key: 'setBezierTriangleFill',
        value: function setBezierTriangleFill(color, index) {
            if (index == undefined) {
                index = this.bezierTriangleIndex;
            }
            this.bezierTriangleList[index].fill = color;
            return this;
        }
    }, {
        key: 'action',
        value: function action() {
            var _this = this;

            var camera = this.camera;
            var screen = this.screen;

            if (this.axis.show) {

                if (this.axis.xRef) {
                    var d = 'M 0 0 0 L ' + this.axis.xLength + ' 0 0 M ' + this.axis.xLength + ' 0 0 l -5  5 0 M ' + this.axis.xLength + ' 0 0 l -5 -5 0';
                    this.axis.xRef.transition().attr('d', (0, _util.getLinePath)(d, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio)).attr('stroke', this.axis.xColor).attr('fill', 'transparent');
                }

                if (this.axis.yRef) {
                    var _d = 'M 0 0 0 L 0 ' + this.axis.yLength + ' 0 M  0 ' + this.axis.yLength + ' 0 l 5  -5 0 M 0 ' + this.axis.yLength + ' 0  l -5 -5 0';
                    this.axis.yRef.transition().attr('d', (0, _util.getLinePath)(_d, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio)).attr('stroke', this.axis.yColor).attr('fill', 'transparent');
                }

                if (this.axis.zRef) {
                    var _d2 = 'M 0 0 0 L 0 0 ' + this.axis.zLength + ' M  0 0 ' + this.axis.zLength + ' l 5  0 -5 M 0 0 ' + this.axis.zLength + ' l -5 0 -5';
                    this.axis.zRef.transition().attr('d', (0, _util.getLinePath)(_d2, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio)).attr('stroke', this.axis.zColor).attr('fill', 'transparent');
                }
            }

            this.lineList.forEach(function (path, k) {

                path.ref.transition().attr('d', (0, _util.getLinePath)(path.originPath, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio)).attr('stroke', path.stroke).attr('fill', path.fill);
            });

            this.bezierCurveList.forEach(function (path, k) {

                path.ref.transition().attr('d', (0, _util.getBezierCurvePath)(path.p0, path.p1, path.p2, path.p3, path.n, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio)).attr('stroke', path.stroke).attr('fill', path.fill);
            });

            this.bezierSurfaceGroup.selectAll('*').remove();

            var arr = [];

            this.bezierSurfaceList.forEach(function (path, k) {

                var a = (0, _util.getBezierSurfacePath)(path.matrix, path.density, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio);

                a = a.map(function (item) {
                    return Object.assign(item, {
                        stroke: path.stroke,
                        fill: path.fill,
                        strokeWidth: path.strokeWidth
                    });
                });

                arr = arr.concat(a);

                /*
                path
                .ref
                .transition()
                .attr('d', getBezierSurfacePath(path.matrix, path.density, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio))
                .attr('stroke', path.stroke)
                .attr('fill', path.fill)*/
            });

            this.bezierTriangleList.forEach(function (triangle, k) {
                var a = (0, _util.getBezierTrianglePath)(triangle.control, triangle.density, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio);

                a = a.map(function (item) {
                    return Object.assign(item, {
                        stroke: triangle.stroke,
                        fill: triangle.fill,
                        strokeWidth: triangle.strokeWidth
                    });
                });

                arr = arr.concat(a);
            });

            var cameraPoint = (0, _util.getCameraPoint)(camera.anchor, camera.d, camera.alpha, camera.beta);

            arr.sort(function (aa, bb) {
                var a = aa.center;
                var b = bb.center;

                var x = cameraPoint[0];
                var y = cameraPoint[1];
                var z = cameraPoint[2];
                var adx = (a[0] - x) * (a[0] - x);
                var ady = (a[1] - y) * (a[1] - y);
                var adz = (a[2] - z) * (a[2] - z);
                var bdx = (b[0] - x) * (b[0] - x);
                var bdy = (b[1] - y) * (b[1] - y);
                var bdz = (b[2] - z) * (b[2] - z);

                return adx + ady + adz < bdx + bdy + bdz;
            }).forEach(function (item) {
                _this.bezierSurfaceGroup.append('path').attr('d', item.d).attr('stroke', item.stroke).attr('stroke-width', item.strokeWidth).attr('fill', item.fill);
            });

            return this;
        }
    }]);

    return Builder;
}();

exports.default = new Builder();