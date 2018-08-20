import * as d3 from 'd3';
import {
    getLinePath, 
    getBezierCurvePath, 
    getBezierSurfacePath, 
    getBezierTrianglePath,
    getCameraPoint
} from './util';

class Builder {
    
    constructor () {

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
        })

    }

    reset () {

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
        })

        return this;

    }

    setCamera (opt) {

        if (!opt) {
            opt = {}
        }

        const {
            anchor = this.camera.anchor,
            d = this.camera.d,
            alpha = this.camera.alpha,
            beta = this.camera.beta
        } = opt;

        if (!anchor instanceof Array || 
            anchor.length != 3
        ) {
            throw new Error
        }

        this.camera = {
            anchor,
            d,
            alpha,
            beta
        }

        return this;

    }

    setScreen (opt) {

        if (!opt) {
            opt = {}
        }

        const {
            ratio = this.screen.ratio,
            offsetX = this.screen.offsetX,
            offsetY = this.screen.offsetY
        } = opt;

        this.screen = {
            ratio,
            offsetX,
            offsetY
        }

        this.selector.attr('transform', `translate(${offsetX}, ${offsetY})`)

        return this;
    }

    setAxis (opt) {

        if (!opt) {
            opt = {}
        }

        const {
            show = this.axis.show,
            xLength = this.axis.xLength,
            xColor = this.axis.xColor,
            yLength = this.axis.yLength,
            yColor = this.axis.yColor,
            zLength = this.axis.zLength,
            zColor = this.axis.zColor,

        } = opt;

        this.axis = {
            show,
            xLength,
            xColor,
            yLength,
            yColor,
            zLength,
            zColor,
            xRef: this.axis.xRef ? this.axis.xRef : this.selector.append('path'),
            yRef: this.axis.yRef ? this.axis.yRef : this.selector.append('path'),
            zRef: this.axis.zRef ? this.axis.zRef : this.selector.append('path')
        }

        return this;
    }



    select (selector) {
        this.svg = d3.select(selector);
        this.selector = this.svg.append('g');
        this.bezierSurfaceGroup = this.selector.append('g');
            
        return this;
    }

    drawLine (d) {

        this.lineList.push({
            ref: this.selector.append('path'),
            originPath: d,
            stroke: '#000',
            fill: 'transparent'
        });

        this.lineIndex = this.lineList.length - 1;

        return this;
    }

    redrawLine (d, index) {
        if (index == undefined) {
            index = this.lineIndex;
        }

        this.lineList[index].originPath = d;

        return this;
    }

    drawBezierCurve (p0, p1, p2, p3, n) {
        this.bezierCurveList.push({
            ref: this.selector.append('path'),
            p0,
            p1,
            p2,
            p3,
            n,
            stroke: '#000',
            fill: 'transparent'
        })

        this.bezierCurveIndex = this.bezierCurveList.length - 1;
        
        return this;
    }

    redrawBezierCurve (p0, p1, p2, p3, n, index) {
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

    drawBezierSurface (matrix, density) {
        this.bezierSurfaceList.push({
            ref: this.selector.append('path'),
            matrix,
            density,
            stroke: '#000',
            strokeWidth: 0.5,
            fill: 'transparent'
        })

        this.bezierSurfaceIndex = this.bezierSurfaceList.length - 1;
        
        return this;
    }

    redrawBezierSurface (matrix, density, index) {
        if (index == undefined) {
            index = this.bezierSurfaceIndex;
        }

        this.bezierSurfaceList[index].matrix = matrix;
        this.bezierSurfaceList[index].density = density;

        return this;
    }

    drawBezierTriangle (control, density) {

        this.bezierTriangleList.push({
            control,
            density,
            stroke: '#000',
            strokeWidth: 0.5,
            fill: 'transparent'
        })

        this.bezierTriangleIndex = this.bezierTriangleList.length - 1;
        return this;

    }

    redrawBezierTriangle (control, density, index) {
        if (index == undefined) {
            index = this.bezierTriangleIndex;
        }

        this.bezierTriangleList[index].control = control;
        this.bezierTriangleList[index].density = density;

        return this;
    }

    setLineStroke (color, index) {

        if (index == undefined) {
            index = this.lineIndex;
        }

        this.lineList[index].stroke = color;
        return this;
    }

    setBezierCurveStroke (color, index) {
        if (index == undefined) {
            index = this.bezierCurveIndex;
        }

        this.bezierCurveList[index].stroke = color;
        return this;
    }

    setBezierSurfaceStroke (color, index) {
        if (index == undefined) {
            index = this.bezierSurfaceIndex;
        }

        this.bezierSurfaceList[index].stroke = color;
        return this;
    }

    setBezierTriangleStroke (color, index) {
        if (index == undefined) {
            index = this.bezierTriangleIndex;
        }

        this.bezierTriangleList[index].stroke = color;
        return this;
    }

    setBezierSurfaceStrokeWidth (width, index) {
        if (index == undefined) {
            index = this.bezierSurfaceIndex;
        }

        this.bezierSurfaceList[index].strokeWidth = width;
        return this;
    }

    setBezierTriangleStrokeWidth (width, index) {
        if (index == undefined) {
            index = this.bezierTriangleIndex;
        }
        this.bezierTriangleList[index].strokeWidth = width;
        return this;
    }

    setBezierSurfaceFill (color, index) {
        if (index == undefined) {
            index = this.bezierSurfaceIndex;
        }

        this.bezierSurfaceList[index].fill = color;
        return this;
    }

    setBezierTriangleFill (color, index) {
        if (index == undefined) {
            index = this.bezierTriangleIndex;
        }
        this.bezierTriangleList[index].fill = color;
        return this;
    }

    action () {
        let camera = this.camera;
        let screen = this.screen;

        if (this.axis.show) {

            if (this.axis.xRef) {
                let d = `M 0 0 0 L ${this.axis.xLength} 0 0 M ${this.axis.xLength} 0 0 l -5  5 0 M ${this.axis.xLength} 0 0 l -5 -5 0`;
                this
                .axis
                .xRef
                .transition()
                .attr('d', getLinePath(d, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio))
                .attr('stroke', this.axis.xColor)
                .attr('fill', 'transparent')
            }

            if (this.axis.yRef) {
                let d = `M 0 0 0 L 0 ${this.axis.yLength} 0 M  0 ${this.axis.yLength} 0 l 5  -5 0 M 0 ${this.axis.yLength} 0  l -5 -5 0`;
                this
                .axis
                .yRef
                .transition()
                .attr('d', getLinePath(d, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio))
                .attr('stroke', this.axis.yColor)
                .attr('fill', 'transparent')
            }

            if (this.axis.zRef) {
                let d = `M 0 0 0 L 0 0 ${this.axis.zLength} M  0 0 ${this.axis.zLength} l 5  0 -5 M 0 0 ${this.axis.zLength} l -5 0 -5`;
                this
                .axis
                .zRef
                .transition()
                .attr('d', getLinePath(d, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio))
                .attr('stroke', this.axis.zColor)
                .attr('fill', 'transparent')
            }

        }

        this.lineList.forEach((path, k) => {
            
            path
            .ref
            .transition()
            .attr('d', getLinePath(path.originPath, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio))
            .attr('stroke', path.stroke)
            .attr('fill', path.fill)
        })


        this.bezierCurveList.forEach((path, k) => {

            path
            .ref
            .transition()
            .attr('d', getBezierCurvePath(path.p0, path.p1, path.p2, path.p3, path.n, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio))
            .attr('stroke', path.stroke)
            .attr('fill', path.fill)

        })

        this.bezierSurfaceGroup.selectAll('*').remove();

        let arr = [];

        this.bezierSurfaceList.forEach((path, k) => {

            let a = getBezierSurfacePath(path.matrix, path.density, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio);

            a = a.map(item => {
                return Object.assign(item, {
                    stroke: path.stroke,
                    fill: path.fill,
                    strokeWidth: path.strokeWidth
                })
            });

            arr = arr.concat(a);
            
            /*
            path
            .ref
            .transition()
            .attr('d', getBezierSurfacePath(path.matrix, path.density, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio))
            .attr('stroke', path.stroke)
            .attr('fill', path.fill)*/

        })

        this.bezierTriangleList.forEach((triangle, k) => {
            let a = getBezierTrianglePath(triangle.control, triangle.density, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio);

            a = a.map(item => {
                return Object.assign(item, {
                    stroke: triangle.stroke,
                    fill: triangle.fill,
                    strokeWidth: triangle.strokeWidth
                })
            });

            arr = arr.concat(a);
        })

        let cameraPoint = getCameraPoint(camera.anchor, camera.d, camera.alpha, camera.beta)

        arr.sort((aa, bb) => {
            let a = aa.center;
            let b = bb.center;

            const x = cameraPoint[0];
            const y = cameraPoint[1];
            const z = cameraPoint[2];
            const adx = (a[0] - x)*(a[0] - x);
            const ady = (a[1] - y)*(a[1] - y);
            const adz = (a[2] - z)*(a[2] - z);
            const bdx = (b[0] - x)*(b[0] - x);
            const bdy = (b[1] - y)*(b[1] - y);
            const bdz = (b[2] - z)*(b[2] - z);

            return (adx + ady + adz) < (bdx + bdy + bdz)

        }).forEach(item => {
            this
            .bezierSurfaceGroup
            .append('path')
            .attr('d', item.d)
            .attr('stroke', item.stroke)
            .attr('stroke-width', item.strokeWidth)
            .attr('fill', item.fill)

        })


        return this;
    }


}

export default new Builder();