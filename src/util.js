export function getProjection (anchor, d, alpha, beta, ratio, origin) {
    const ax = anchor[0]; // anchor x
    const ay = anchor[1]; // anchor y
    const az = anchor[2]; // anchor z

    const ox = origin[0]; // origin x
    const oy = origin[1]; // origin y 
    const oz = origin[2]; // origin z

    let dx = d*Math.cos(beta)*Math.sin(alpha);
    let dy = d*Math.sin(beta);
    // let dy = d*Math.cos(alpha)*Math.sin(beta);
    let dz = d*Math.cos(alpha)*Math.cos(beta);

    let mod = Math.sqrt(dx*dx + dy*dy + dz*dz);
    let nv =  [-dx/mod, -dy/mod, -dz/mod]; // normal vector

    let so = [ax + (1 - ratio)*dx, ay + (1 - ratio)*dy, az + (1 - ratio)*dz]; // screen o point
    
    
    
    let c0 = (thita) => {
        if (Math.cos(thita) == 0) {
            return 1;
        } else {
            return Math.cos(thita)/Math.abs(Math.cos(thita)) > 0 ? 1 : -1;
        }
    } 
    
    let c1 = (thita) => {
        if (Math.sin(thita) == 0) {
            return 1;
        } else {
            return Math.sin(thita)/Math.abs(Math.sin(thita)) > 0 ? 1 : -1;
        }
    } 
    // coefficient

    // let sy = [0, 
    //     Math.cos(beta)/Math.sqrt(Math.cos(beta)*Math.cos(beta) + Math.sin(beta)*Math.sin(beta)),
    //     -Math.sin(beta)/Math.sqrt(Math.cos(beta)*Math.cos(beta) + Math.sin(beta)*Math.sin(beta))
    // ]

    // let f = (dy*dy + dz*dz);
    // let m = Math.sqrt(f*f + dy*dy*dx*dx + dz*dz*dx*dx);
    // let sx = [c0(alpha)*f/m, -1*c0(alpha)*dy*dx/m, -1*c0(alpha)*dz*dx/m];
     // screen x axis

    let syy = [-1*Math.sin(beta)*Math.sin(alpha), Math.cos(beta), -1*Math.sin(beta)*Math.cos(alpha)];
    
    let yf = Math.sqrt(syy[0]*syy[0] + syy[1]*syy[1] + syy[2]*syy[2]);
    let sy = [syy[0]/yf, syy[1]/yf, syy[2]/yf];

    let sx = [Math.cos(alpha), 0, -Math.sin(alpha)]


    let ray = [ox - ax - dx, oy - ay - dy, oz - az - dz];
    let p = d*ratio/(ray[0]*nv[0] + ray[1]*nv[1] + ray[2]*nv[2]);
    let focus = [ax + dx + ray[0]*p, ay + dy + ray[1]*p, az + dz +ray[2]*p];
    let rf = [focus[0] - so[0], focus[1] - so[1], focus[2] - so[2]]; // relative focus
    let rx = rf[0]*sx[0] + rf[1]*sx[1] + rf[2]*sx[2];
    let ry = rf[0]*sy[0] + rf[1]*sy[1] + rf[2]*sy[2];

    return {
        x: rx,
        y: ry
    }

}

export function getLinePath (path, anchor, d, alpha, beta, ratio) {
    let arr = path
    .replace(/\,/g, ' ')
    .replace(/[Mm]/g, (r) => { return r + ' '})
    .replace(/[LlCcSsQqTt]/g, (r) => { return ' ' + r + ' '})
    .replace(/[Zz]/g, (r) => { return ' ' + r})
    .replace(/\s+/g, ',')
    .split(',');

    let newArr = []

    const f = (origin) => {
        return getProjection(anchor, d, alpha, beta, ratio, origin);
    }

    arr = arr.map(item => {
        if (/\d/.test(item)) {
            return Number(item);
        } else {
            return item;
        }
    });

    arr.forEach((item, k) => {
        if (item == 'm' || item == 'M') {
            newArr.push('M');
            let r = f([arr[k + 1], arr[k + 2], arr[k + 3]]);
            newArr.push(r.x);
            newArr.push(r.y);
        }

        if (item == 'L') {
            newArr.push('L');
            let r = f([arr[k + 1], arr[k + 2], arr[k + 3]]);
            newArr.push(r.x);
            newArr.push(r.y);
        }

        if (item == 'l') {
            newArr.push('L');
            arr[k + 1] = arr[k - 3] + arr[k + 1];
            arr[k + 2] = arr[k - 2] + arr[k + 2];
            arr[k + 3] = arr[k - 1] + arr[k + 3];
            let r = f([arr[k + 1], arr[k + 2], arr[k + 3]]);
            newArr.push(r.x);
            newArr.push(r.y);
        }

        if (item == 'C') {
            newArr.push('C');
            
            let r = f([arr[k + 1], arr[k + 2], arr[k + 3]]);
            newArr.push(r.x);
            newArr.push(r.y);

            r = f([arr[k + 4], arr[k + 5], arr[k + 6]]);
            newArr.push(r.x);
            newArr.push(r.y);

            r = f([arr[k + 7], arr[k + 8], arr[k + 9]]);
            newArr.push(r.x);
            newArr.push(r.y);
        }

        if (item == 'c') {
            newArr.push('C');

            arr[k + 1] = arr[k - 3] + arr[k + 1];
            arr[k + 2] = arr[k - 2] + arr[k + 2];
            arr[k + 3] = arr[k - 1] + arr[k + 3];
            let r = f([arr[k + 1], arr[k + 2], arr[k + 3]]);
            newArr.push(r.x);
            newArr.push(r.y);

            arr[k + 4] = arr[k - 3] + arr[k + 4];
            arr[k + 5] = arr[k - 2] + arr[k + 5];
            arr[k + 6] = arr[k - 1] + arr[k + 6];
            r = f([arr[k + 4], arr[k + 5], arr[k + 6]]);
            newArr.push(r.x);
            newArr.push(r.y);

            arr[k + 7] = arr[k - 3] + arr[k + 7];
            arr[k + 8] = arr[k - 2] + arr[k + 8];
            arr[k + 9] = arr[k - 1] + arr[k + 9];
            r = f([arr[k + 7], arr[k + 8], arr[k + 9]]);
            newArr.push(r.x);
            newArr.push(r.y);
        }

        if (item == 'S') {
            newArr.push('S');
            let r = f([arr[k + 1], arr[k + 2], arr[k + 3]]);
            newArr.push(r.x);
            newArr.push(r.y);

            r = f([arr[k + 4], arr[k + 5], arr[k + 6]]);
            newArr.push(r.x);
            newArr.push(r.y);
        }

        if (item == 's') {
            newArr.push('S');

            arr[k + 1] = arr[k - 3] + arr[k + 1];
            arr[k + 2] = arr[k - 2] + arr[k + 2];
            arr[k + 3] = arr[k - 1] + arr[k + 3];
            let r = f([arr[k + 1], arr[k + 2], arr[k + 3]]);
            newArr.push(r.x);
            newArr.push(r.y);

            arr[k + 4] = arr[k - 3] + arr[k + 4];
            arr[k + 5] = arr[k - 2] + arr[k + 5];
            arr[k + 6] = arr[k - 1] + arr[k + 6];
            r = f([arr[k + 4], arr[k + 5], arr[k + 6]]);
            newArr.push(r.x);
            newArr.push(r.y);
        }

        if (item == 'Q') {
            newArr.push('Q');
            let r = f([arr[k + 1], arr[k + 2], arr[k + 3]]);
            newArr.push(r.x);
            newArr.push(r.y);

            r = f([arr[k + 4], arr[k + 5], arr[k + 6]]);
            newArr.push(r.x);
            newArr.push(r.y);
        }

        if (item == 'q') {
            newArr.push('Q');

            arr[k + 1] = arr[k - 3] + arr[k + 1];
            arr[k + 2] = arr[k - 2] + arr[k + 2];
            arr[k + 3] = arr[k - 1] + arr[k + 3];
            let r = f([arr[k + 1], arr[k + 2], arr[k + 3]]);
            newArr.push(r.x);
            newArr.push(r.y);

            arr[k + 4] = arr[k - 3] + arr[k + 4];
            arr[k + 5] = arr[k - 2] + arr[k + 5];
            arr[k + 6] = arr[k - 1] + arr[k + 6];
            r = f([arr[k + 4], arr[k + 5], arr[k + 6]]);
            newArr.push(r.x);
            newArr.push(r.y);
        }

        if (item == 'T') {
            newArr.push('T');
            let r = f([arr[k + 1], arr[k + 2], arr[k + 3]]);
            newArr.push(r.x);
            newArr.push(r.y);
        }

        if (item == 't') {
            newArr.push('T');
            arr[k + 1] = arr[k - 3] + arr[k + 1];
            arr[k + 2] = arr[k - 2] + arr[k + 2];
            arr[k + 3] = arr[k - 1] + arr[k + 3];
            let r = f([arr[k + 1], arr[k + 2], arr[k + 3]]);
            newArr.push(r.x);
            newArr.push(r.y);
        }

        if (item == 'z' || item == 'Z') {
            newArr.push('Z');
        }

    })

    return newArr.join(' ');

}

const getBezierCurveVectorArr = (p0, p1, p2, p3, n) => {

    const x0 = p0[0];
    const y0 = p0[1];
    const z0 = p0[2];

    const x1 = p1[0];
    const y1 = p1[1];
    const z1 = p1[2];

    const x2 = p2[0];
    const y2 = p2[1];
    const z2 = p2[2];

    const x3 = p3[0];
    const y3 = p3[1];
    const z3 = p3[2];

    let arr = [];

    let k = 0;

    for (; k <= n; k ++) {
        let t = k/n;

        let bx = (1 - t)*(1 - t)*(1 - t)*x0 + 3*t*(1 - t)*(1 - t)*x1 + 3*t*t*(1 - t)*x2 + t*t*t*x3;
        let by = (1 - t)*(1 - t)*(1 - t)*y0 + 3*t*(1 - t)*(1 - t)*y1 + 3*t*t*(1 - t)*y2 + t*t*t*y3;
        let bz = (1 - t)*(1 - t)*(1 - t)*z0 + 3*t*(1 - t)*(1 - t)*z1 + 3*t*t*(1 - t)*z2 + t*t*t*z3;

        arr.push({
            x: bx,
            y: by,
            z: bz
        })
    }
    return arr;

}

export function getBezierCurvePath (p0, p1, p2, p3, n, anchor, d, alpha, beta, ratio) {

    let arr = getBezierCurveVectorArr(p0, p1, p2, p3, n);

    let strArr = ['M'];

    arr.forEach((item, k) => {

        let ret = getProjection(anchor, d, alpha, beta, ratio, [item.x, item.y, item.z]);

        strArr.push(ret.x);

        strArr.push(ret.y);

        if (k < arr.length - 1) {
            strArr.push('L');
        } 

    })

    return strArr.join(' ');

}

function getOneNewControl (control) {
    // refer: https://en.wikipedia.org/wiki/Bézier_triangle
    // a bizier triangle can be converted into two smaller bizier triangles of different controls

    // let us calculate with discretion
    const {
        a3, a2b, ab2, b3, a2y, aby, b2y, ay2, by2, y3
    } = control;

    let newControl = {}

    // a3' = a3, b <-> y
    newControl.a3 = [
        a3[0],
        a3[1],
        a3[2]
    ]

    // a2b' = 1/2*a3 + 1/2*a2b, b <-> y 
    newControl.a2y = [
        1/2*a3[0] + 1/2*a2b[0],
        1/2*a3[1] + 1/2*a2b[1],
        1/2*a3[2] + 1/2*a2b[2]
    ]

    // ab2' = 1/4*a3 + 1/2*a2b + 1/4*ab2, b <-> y
    newControl.ay2 = [
        1/4*a3[0] + 1/2*a2b[0] + 1/4*ab2[0],
        1/4*a3[1] + 1/2*a2b[1] + 1/4*ab2[1],
        1/4*a3[2] + 1/2*a2b[2] + 1/4*ab2[2]
    ]


    // b3 = 1/8*a3 + 3/8*a2b + 3/8*ab2 + 1/8*b3, b <-> y
    newControl.y3 = [
        1/8*a3[0] + 3/8*a2b[0] + 3/8*ab2[0] + 1/8*b3[0],
        1/8*a3[1] + 3/8*a2b[1] + 3/8*ab2[1] + 1/8*b3[1],
        1/8*a3[2] + 3/8*a2b[2] + 3/8*ab2[2] + 1/8*b3[2]
    ]

    

    // a2y = a2y, b <-> y
    newControl.a2b  = [
        a2y[0],
        a2y[1],
        a2y[2]
    ]

    // aby = 1/2*a2y + 1/2*aby, b <-> y
    newControl.aby = [
        1/2*a2y[0] + 1/2*aby[0],
        1/2*a2y[1] + 1/2*aby[1],
        1/2*a2y[2] + 1/2*aby[2],
    ]

    // b2y = 1/4*a2y + 1/2*aby + 1/4*b2y, b <-> y
    newControl.by2 = [
        1/4*a2y[0] + 1/2*aby[0] + 1/4*b2y[0],
        1/4*a2y[1] + 1/2*aby[1] + 1/4*b2y[1],
        1/4*a2y[2] + 1/2*aby[2] + 1/4*b2y[2]
    ]

    // ay2 = ay2, b <-> y
    newControl.ab2 = [
        ay2[0],
        ay2[1],
        ay2[2]
    ]

    // by2 = 1/2*ay2 + 1/2*by2, b <-> y
    newControl.b2y = [
        1/2*ay2[0] + 1/2*by2[0],
        1/2*ay2[1] + 1/2*by2[1],
        1/2*ay2[2] + 1/2*by2[2]
    ]

    // y3 = y3, b <-> y
    newControl.b3 = [
        y3[0],
        y3[1],
        y3[2]
    ]

    return newControl;
    
}

function getTwoNewControls (control) {
    return [
        getOneNewControl(control),
        getOneNewControl({
            a3: control.b3, 
            a2b: control.ab2, 
            ab2: control.a2b, 
            b3: control.a3, 
            a2y: control.b2y, 
            aby: control.aby, 
            b2y: control.a2y, 
            ay2: control.by2, 
            by2: control.ay2, 
            y3: control.y3
        })
    ]
}

export function getBezierSurfacePath (matrix, density, anchor, d, alpha, beta, ratio) {

    let str = '';

    const recursiveTime = density;

    const possibleDraw = (control, n) => {

        let controls = getTwoNewControls(control);
        let control1 = controls[0];
        let control2 = controls[1];

        if (n == recursiveTime) {

            let strArr = [], ret;

            strArr.push('M');
            ret = getProjection(anchor, d, alpha, beta, ratio, control1.a3);
            strArr.push(ret.x);
            strArr.push(ret.y);

            strArr.push('L');
            ret = getProjection(anchor, d, alpha, beta, ratio, control1.b3);
            strArr.push(ret.x);
            strArr.push(ret.y);

            strArr.push('L');
            ret = getProjection(anchor, d, alpha, beta, ratio, control1.y3);
            strArr.push(ret.x);
            strArr.push(ret.y);

            strArr.push('Z');

            str += strArr.join(' ') + ' ';

            strArr = [];

            strArr.push('M');
            ret = getProjection(anchor, d, alpha, beta, ratio, control2.b3);
            strArr.push(ret.x);
            strArr.push(ret.y);

            strArr.push('L');
            ret = getProjection(anchor, d, alpha, beta, ratio, control2.a3);
            strArr.push(ret.x);
            strArr.push(ret.y);

            strArr.push('L');
            ret = getProjection(anchor, d, alpha, beta, ratio, control2.y3);
            strArr.push(ret.x);
            strArr.push(ret.y);

            // strArr.push('Z');

            str += strArr.join(' ') + ' ';

        } else {

            possibleDraw(control1, n + 1);
            possibleDraw(control2, n + 1);
        }

    }

    let control1 = {
        b3: matrix[0][0],
        ab2: matrix[1][0],
        b2y: matrix[1][1],
        a2b: matrix[2][0],
        aby: matrix[2][1],
        by2: matrix[2][2],
        a3: matrix[3][0],
        a2y: matrix[3][1],
        ay2: matrix[3][2],
        y3: matrix[3][3]
    }

    possibleDraw(control1, 0);

    let control2 = {
        b3: matrix[3][3],
        ab2: matrix[2][3],
        b2y: matrix[2][2],
        a2b: matrix[1][3],
        aby: matrix[1][2],
        by2: matrix[1][1],
        a3: matrix[0][3],
        a2y: matrix[0][2],
        ay2: matrix[0][1],
        y3: matrix[0][0]
    }

    possibleDraw(control2, 0);

    return str;
}