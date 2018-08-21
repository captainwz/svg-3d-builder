# API

Some 3d concepts are prerequisite. The related links will be attached in the followings.

## Basic

---
```javascript
.select(selector)
```
property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
selector|String|svg element selector|true||


---

```javascript
.setCamera({anchor, d, alpha, beta})
```

This framework is using [perspective projection](https://en.wikipedia.org/wiki/3D_projection) to map three-dimensional points into the two-dimensional graph. In `perspective projection`, we need to locate the **sight point** (equivalent to a camera) . Any sight point can be specified with four elements: `anchor`, `d`, `alpha`, `beta`. 

property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
anchor|Array|the camera always needs a focused point|false|[0, 0, 0]
d| Number| the distance between the camera and the anchor| false| 300
alpha| Number| image that the camera is rotating around the anchor. The track can be described as rotating `alpha` horizontally and `beta` vertically| false| 0
beta| Number| image that the camera is rotating around the anchor. The track can be described as rotating `alpha` horizontally and `beta` vertically| false| 0

---

```javascript
.setScreen({ratio, offsetX, offsetY})
```

In `perspective projection`, there is also a screen. 

property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
ratio|Number|the ratio of the distance between the screen and the anchor to the distance between the camera and the anchor| false| 0.5
offsetX| Number| x offset of the axis| false| 0 
offsetY| Number| y offset of the axis| false| 0 

---

```javascript
.setAxis({show, xLength, xColor, yLength, yColor, zLength, zColor})
```

Set axis.

property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
show|Boolean|if show axis|false|false
xLength|Number|how long is x-axis displayed|false|200
xColor|String|what color is x-axis displayed|false|'#000'
yLength|Number|how long is y-axis displayed|false|200
yColor|String|what color is y-axis displayed|false|'#000'
zLength|Number|how long is z-axis displayed|false|200
zColor|String|what color is z-axis displayed|false|'#000'

---

```javascript
.action()
```
Draw the graph.

---

```javascript
.reset()
```

Clean the graph and reset all setting options. 

---


## Bézier Triangle

References about [bézier triangle](https://en.wikipedia.org/wiki/B%C3%A9zier_triangle).

---

```javascript
.drawBezierTriangle(control, density)
```
property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
control|Object|10 coordinates in form of {a3, a2b, ab2, b3, b2y, by2, y3, ay2, a2y, aby}|true||
density|Number| density of the surface.|true||

---

```javascript
.redrawBezierTriangle(control, density, index)
```
property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
control|Object|10 coordinates in form of {a3, a2b, ab2, b3, b2y, by2, y3, ay2, a2y, aby}|true||
density|Number| density of the surface.|true||
index|Number| index of the surface. Refer to the latest one if not set|false||


---

```javascript
.setBezierTriangleStroke(color, index)
```
property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
color|String|color of stroke|true||
index|Number| index of the surface. Refer to the latest one if not set|false||

---

```javascript
.setBezierTriangleStrokeWidth(width, index)
```

property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
width|String|width of stroke|true||
index|Number| index of the surface. Refer to the latest one if not set|false||

---

```javascript
.setBezierTriangleFill(color, index)
```
property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
color|String|color of triangle|true||
index|Number| index of the surface. Refer to the latest one if not set|false||

---

## Bézier Surface

References about [bézier surface](https://en.wikipedia.org/wiki/B%C3%A9zier_surface)

---

```javascript
.drawBezierSurface(matrix, density)
```

property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
matrix|Array|4*4 Array of control points|true||
density|Number| density of the surface. Surface will be smoother as density is larger. **A number less than 10 is adviced.** | true| |

---

```javascript
.redrawBezierSurface(matrix, density, index)
```

Redraw bezier surface.

property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
matrix|Array|4*4 Array of control points|true||
density|Number| density of the surface.|true||
index|Number| index of the surface. Refer to the latest one if not set|false||

---

```javascript
.setBezierSurfaceStroke(color, index)
```

property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
color|String|color of stroke|true||
index|Number|index of the bezier surface. If not set, the latest bezier surface will be painted|false||

---

```javascript
.setBezierSurfaceStrokeWidth(width, index)
```

property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
width|String|width of stroke|true||
index|Number| index of the surface. Refer to the latest one if not set|false||

---

```javascript
.setBezierSurfaceFill(color, index)
```
property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
color|String|color of triangle|true||
index|Number| index of the surface. Refer to the latest one if not set|false||

---

## Bézier Curve

References about [bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)

---

```javascript
.drawBezierCurve(p0, p1, p2, p3, n)
```

property|type|description|required|default
:-:| :-: | :-: |:-: | :-:
p0| Array| control point| true| | 
p1| Array| control point| true| | 
p2| Array| control point| true| | 
p3| Array| control point| true| | 
n| Number| Number of points to calculate. The curve will be smoother as `n` is larger| true| | 

---







```javascript
.drawLine(d)
```

Draw a line.

property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
d|String|path attribute|true||

---

```javascript
.setBezierCurveStroke(color, index)
```

property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
color|String|color of the bezier curve|true||
index|Number|index of the bezier curve. If not set, the latest bezier curve will be painted|false||

---




---



---

```javascript
.setLineStroke(color, index)
```
Set color of a line.

property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
color|String|color of the line|true||
index|Number|index of the line. If not set, the latest line will be painted|false||

---




```javascript
.redrawLine(d, index)
```

Redraw line.

property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
d|String|path attribute|true||
index|Number| index of the surface. Refer to the latest one if not set|false|

---

```javascript
.redrawBezierCurve(p0, p1, p2, p3, n, index)
```

Redraw bezier curve.

property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
p0| Array| control point| true| | 
p1| Array| control point| true| | 
p2| Array| control point| true| | 
p3| Array| control point| true| | 
n| Number| Number of points to calculate. The curve will be smoother as `n` is larger| true| | 
index|Number| index of the surface. Refer to the latest one if not set|false||





---


