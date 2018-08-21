# SVG 3D Builder
<img src="https://media.giphy.com/media/5zvQqld4fwqoh3m3Nd/giphy.gif" height="200" style="display:inline-block" align="center"/>
<img src="https://media.giphy.com/media/9Jga63YdBYmsL2dPDP/giphy.gif" height="200" style="display:inline-block" align="center"/>
![gif](https://media.giphy.com/media/5zvQqld4fwqoh3m3Nd/giphy.gif)
![gif](https://media.giphy.com/media/9Jga63YdBYmsL2dPDP/giphy.gif)

This framewrok aims at creating 3d models with **SVG** and concise APIs. It is purely developed with concepts of two-dimension.
One of its essential implementations is **Bezier** in both curve and surface. 
It is one thing to describe them with mathematic equotions, another thing to illustrate them with computer graph.

See [online exhibition](https://libcafe.com/3d/index.html) developed by the framework and its [source code](https://github.com/captainwz/svg-3d-builder/tree/master/demo/exhibition).

## Start
You can either start it in [tranditional way](https://github.com/captainwz/svg-3d-builder/blob/master/dist/svg-3d-builder.min.js)
```html
<script src="./svg-3d-builder.min.js"></script>
```
Or embark your development with `ES6`
```shell
npm install --save svg-3d-builder
```
```javascript
import Builder from 'svg-3d-builder';
```
Make sure there is a svg element described in your document
```html
<html>
    <head>
    </head>
    <body>
        <svg id="graph" width="500" height="500">            
        </svg>
    </body>
</html>
```
And see your simplest work by adding these codes
```javascript
Builder
.select('#graph')
.drawLine('M 0 0 0 l 100 0 0')
.action();
```

## API
To create more sophisticated model, you need to look up the [API document](https://github.com/captainwz/svg-3d-builder/tree/master/api.md).

## Lisence
Apache



