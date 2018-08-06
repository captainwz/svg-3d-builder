import * as d3 from 'd3';
import {getLinePath, getBezierCurvePath, getBezierSurfacePath} from './util';

class Builder {
    
    constructor () {

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
        })

    }

    reset () {

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



    select (selector) {
        this.svg = d3.select(selector);
        this.selector = this.svg.append('g');
            
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

    action () {
        let camera = this.camera;
        let screen = this.screen;

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

        this.bezierSurfaceList.forEach((path, k) => {

            path
            .ref
            .transition()
            .attr('d', getBezierSurfacePath(path.matrix, path.density, camera.anchor, camera.d, camera.alpha, camera.beta, screen.ratio))
            .attr('stroke', path.stroke)
            .attr('fill', path.fill)

        })


        return this;
    }


}

export default new Builder();