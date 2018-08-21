# Chromatic 3D Heart

<img src="https://media.giphy.com/media/5zvQqld4fwqoh3m3Nd/giphy.gif" height="200" style="display:inline-block" align="center"/>

```javascript
Builder
.reset()
.select('#space')
.setCamera({anchor: [0, 30, 0], d: 1000000000})
.setScreen({ratio: 0.99, offsetX: screenWidth/2, offsetY: screenHeight/2.5})
.drawBezierTriangle({
    a3: [-100, -100, 0],
    a2b: [-30, -120, 0],
    ab2: [-20, -90, 0],
    b3: [0, -30, 0],
    b2y: [0, 30, 60],
    by2: [0, 60, 60],
    y3: [0, 200, 0],
    a2y: [-230, -50, 0],
    ay2: [-200, 30, 0],
    aby: [-30, 30, 100]
}, 9)
.setBezierTriangleFill('#ff756a')
.setBezierTriangleStroke('#fdd6a6')
.setBezierTriangleStrokeWidth(0.1)
.drawBezierTriangle({
    a3: [100, -100, 0],
    a2b: [30, -120, 0],
    ab2: [20, -90, 0],
    b3: [0, -30, 0],
    b2y: [0, 30, 60],
    by2: [0, 60, 60],
    y3: [0, 200, 0],
    a2y: [230, -50, 0],
    ay2: [200, 30, 0],
    aby: [30, 30, 100]
}, 9)
.setBezierTriangleFill('#ff756a')
.setBezierTriangleStroke('#fdd6a6')
.setBezierTriangleStrokeWidth(0.1)
.drawBezierTriangle({
    a3: [-100, -100, 0],
    a2b: [-30, -120, 0],
    ab2: [-20, -90, 0],
    b3: [0, -30, 0],
    b2y: [0, 30, -60],
    by2: [0, 60, -60],
    y3: [0, 200, 0],
    a2y: [-230, -50, 0],
    ay2: [-200, 30, 0],
    aby: [-30, 30, -100]
}, 9)
.setBezierTriangleFill('#ffa69e')
.setBezierTriangleStroke('#ff798b')
.setBezierTriangleStrokeWidth(0.1)
.drawBezierTriangle({
    a3: [100, -100, 0],
    a2b: [30, -120, 0],
    ab2: [20, -90, 0],
    b3: [0, -30, 0],
    b2y: [0, 30, -60],
    by2: [0, 60, -60],
    y3: [0, 200, 0],
    a2y: [230, -50, 0],
    ay2: [200, 30, 0],
    aby: [30, 30, -100]
}, 9)
.setBezierTriangleFill('#ffa69e')
.setBezierTriangleStroke('#ff798b')
.setBezierTriangleStrokeWidth(0.1)
.action()
```

# Bezier Surface

<img src="https://media.giphy.com/media/1oFtOzT1JQQObvCDqC/giphy.gif" height="200" style="display:inline-block" align="center"/>

```javascript
Builder
.reset()
.select('#space')
.setCamera({anchor: [100, 100, 0], alpha: Math.PI/6})
.setScreen({ratio: 0.99, offsetX: screenWidth/2, offsetY: screenHeight/2.5})
.setAxis({
    show: true,
    xLength: 260,
    xColor: '#108ee9',
    yLength: 260,
    yColor: '#108ee9',
    zLength: 200,
    zColor: '#108ee9'
})
.drawBezierSurface(
    [
        [[0,0,0], [25, 30, 50], [75, 78, 50], [200, 0, 0]],
        [[0,50,0], [25, 25, 50], [75, 25, 50], [100, 50, 0]],
        [[0,150,0], [25, 150, 50], [75, 150, 50], [100, 50, 0]],
        [[150, 200,0], [150, 200, 0], [150, 200, 0], [150, 200, 0]],
        
    ]
, 9)
.setBezierSurfaceStroke('rgb(143, 221, 195)')
.action();
```

# Bezier Surface In Animation

<img src="https://media.giphy.com/media/LYuSClXbN76s0rQdIJ/giphy.gif" height="200" style="display:inline-block" align="center"/>

```javascript
Builder
.reset()
.select('#space')
.setCamera({anchor: [100, 100, 0], alpha: Math.PI/ 6})
.setScreen({ratio: 0.99, offsetX: screenWidth/2, offsetY: screenHeight/2.5})
.drawBezierSurface(
    [
        [[0,0,0], [50, 0, 0], [150, 0, 0], [200, 0, 0]],
        [[0,50,0], [50, 50, 0], [150, 50, 0], [200, 50, 0]],
        [[0,150,0], [50, 150, 0], [150, 150, 0], [200, 150, 0]],
        [[0, 200,0], [50, 200, 0], [150, 200, 0], [200, 200, 0]],
        
    ]
, 8)
.setBezierSurfaceStroke('rgb(143, 221, 195)')
.action();

let b = 0;
let d = 2;


var theInterval = setInterval(() => {

    Builder
    .redrawBezierSurface(
        [
            [[0,0,0], [50, 0 + b/4, 0 + b/4], [150, 0 + b/4, 0 + b/4], [200, 0, 0]],
            [[0,50,0], [50, 50 + b/3, 0 + b/3], [150, 50 + b/3, 0 + b/3], [200, 50, 0]],
            [[0,150,0], [50, 150 + b/2, 0 + b/2], [150, 150 + b/2, 0 + b/2], [200, 150, 0]],
            [[0, 200,0], [50, 200 + b, 0 + b], [150, 200 + b, 0 + b], [200, 200, 0]],
            
        ]
    , 8)
    .action()

    if (d > 0) {
        b += d;
    } else {
        b += 10*d;
    }
    

    if (b >= 100 || b <= 0) {
        d = -d;
    }

}, 150)
```
