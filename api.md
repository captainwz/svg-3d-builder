# API

Some 3d concepts are prerequisite. The related links will be attached in the followings.

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
.setCamera({ratio, offsetX, offsetY})
```

In `perspective projection`, there is also a screen. 

property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
ratio|Number|the ratio of the distance between the screen and the anchor to the distance between the camera and the anchor| false| 0.5
offsetX| Number| x offset of the axis| false| 0 
offsetY| Number| y offset of the axis| false| 0 

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
.setLineStroke(color, index)
```
Set color of a line.

property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
color|String|color of the line|true||
index|Number|index of the line. If not set, the latest line will be painted|false||

---



```javascript
.drawBezierCurve(p0, p1, p2, p3, n)
```

Draw a bezier curve. The framework uses four control points to describe a [bezier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve).

property|type|description|required|default
:-:| :-: | :-: |:-: | :-:
p0| Array| control point| true| | 
p1| Array| control point| true| | 
p2| Array| control point| true| | 
p3| Array| control point| true| | 
n| Number| Number of points to calculate. The curve will be smoother as `n` is larger| true| | 


---



```javascript
.setBezierCurveStroke(color, index)
```

Set color of a bezier curve.

property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
color|String|color of the bezier curve|true||
index|Number|index of the bezier curve. If not set, the latest bezier curve will be painted|false||

---

```javascript
.drawBezierSurface(matrix, density)
```

Draw bezier surface. In this framework, a [bezier surface](https://en.wikipedia.org/wiki/B%C3%A9zier_surface) of 4*4 cotrol points is created because it is easy to be describe graphically based on [bezier triangle](graphically).

property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
matrix|Array|4*4 Array of control points|true||
density|Number| density of the surface. Surface will be smoother as density is larger. **A number less than 10 is adviced.** | true| |

---

```javascript
.redrawBezierSurface(matrix, density, index)
```

Re-draw bezier surface.

property|type|description|required|default
:-:| :-: | :-: |:-: | :-: 
matrix|Array|4*4 Array of control points|true||
density|Number| density of the surface.|true||
index|Number| index of the surface. Refer to the latest one if not set||

---



```javascript
.reset()
```

clean the graph and reset all setting options. 

---
