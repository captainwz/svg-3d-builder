# API

Some 3d concepts are prerequisite. The related links will be attached in the followings.

---

This framework is using [perspective projection](https://en.wikipedia.org/wiki/3D_projection) to map three-dimensional points into the two-dimensional graph. In `perspective projection`, we need to locate the **sight point** (equivalent to a camera) . Any sight point can be specified with four elements: `anchor`, `d`, `alpha`, `beta`. 

* `anchor`: the camera always needs a focused point.

* `d`: the distance between the camera and the anchor.

* `alpha`, `beta`: image that the camera is rotating around the anchor. The track can be described as rotating `alpha` horizontally and `beta` vertically.

> .setCamera(opt)

* `anchor`: `Array` 

* `d`: `Number`

* `alpha`: `Number`

* `beta`: `Number`

---

clean the graph and reset all setting options. 

```
.reset()
```

---
