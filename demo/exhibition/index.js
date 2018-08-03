import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd-mobile';
import Builder from '../../lib/index';
import { rgb } from 'd3-color';
import { interpolateRgbBasis } from 'd3-interpolate';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            alpha: 0,
            beta: 0,
            upInt: null,
            upActive: false,
            leftInt: null,
            leftActive: false,
            rightInt: null,
            rightActive: false,
            downInt: null,
            downActive: false,
            selectedKey: 'bezier-surface'
        }
    }

    drawLine () {

        this.setState({
            alpha: 0,
            beta: 0,
            upInt: null,
            upActive: false,
            leftInt: null,
            leftActive: false,
            rightInt: null,
            rightActive: false,
            downInt: null,
            downActive: false
        })

        Builder
        .reset()
        .select('#space')
        .setScreen({ratio: 0.99, offsetX: this.state.screenWidth/2, offsetY: this.state.screenHeight/2.5})
        .setCamera({anchor: [100, 100, 0]})
        .drawLine('M 0 100 0 l 100 -100 0')
        .setLineStroke('rgb(143, 221, 195)')
        .action();
        
    }

    drawCube () {

        this.setState({
            alpha: 0,
            beta: 0,
            upInt: null,
            upActive: false,
            leftInt: null,
            leftActive: false,
            rightInt: null,
            rightActive: false,
            downInt: null,
            downActive: false
        })

        Builder
        .reset()
        .select('#space')
        .setScreen({ratio: 0.99, offsetX: this.state.screenWidth/2, offsetY: this.state.screenHeight/2.5})
        .drawLine('M -50 -50 -50 l 100 0 0 l 0 100 0 l -100 0 0 z')
        .setLineStroke('rgb(143, 221, 195)')
        .drawLine('M -50 -50 -50 l 0 0 100 l 0 100 0 l 0 0 -100 z')
        .setLineStroke('rgb(143, 221, 195)')
        .drawLine('M -50 -50 50 l 100 0 0 l 0 100 0 l -100 0 0 z')
        .setLineStroke('rgb(143, 221, 195)')
        .drawLine('M 50 -50 50 l 0 0 -100 l 0 100 0 l 0 0 100 z')
        .setLineStroke('rgb(143, 221, 195)')
        .action();
        
    }

    

    drawBezierCurve () {

        this.setState({
            alpha: 0,
            beta: 0,
            upInt: null,
            upActive: false,
            leftInt: null,
            leftActive: false,
            rightInt: null,
            rightActive: false,
            downInt: null,
            downActive: false
        })

        Builder
        .reset()
        .select('#space')
        .setScreen({ratio: 0.99, offsetX: this.state.screenWidth/2, offsetY: this.state.screenHeight/2.5})
        .setCamera({anchor: [100, 0, 0]})
        .drawBezierCurve([0,0,0], [0, 100, 0], [200, 100, 0], [200, 0, 0], 50)
        .setBezierCurveStroke('rgb(143, 221, 195)')
        .action();
        
    }

    up () {
        this.state.beta += Math.PI/180;

        Builder
        .setCamera({beta: this.state.beta})
        .action();
    }

    down () {
        this.state.beta -= Math.PI/180;

        Builder
        .setCamera({beta: this.state.beta})
        .action();
    }

    left () {
        this.state.alpha += Math.PI/180;

        Builder
        .setCamera({alpha: this.state.alpha})
        .action();
    }

    right () {
        this.state.alpha -= Math.PI/180;

        Builder
        .setCamera({alpha: this.state.alpha})
        .action();
    }
    
    drawBezierSurface () {

        this.setState({
            alpha: 0,
            beta: 0,
            upInt: null,
            upActive: false,
            leftInt: null,
            leftActive: false,
            rightInt: null,
            rightActive: false,
            downInt: null,
            downActive: false
        })

        Builder
        .reset()
        .select('#space')
        .setCamera({anchor: [100, 100, 0]})
        .setScreen({ratio: 0.99, offsetX: this.state.screenWidth/2, offsetY: this.state.screenHeight/2.5})
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

    }

    drawBezierSurfaceAnimation () {

        // this.globalInterval = 

        this.setState({
            alpha: Math.PI/ 6,
            beta: 0,
            upInt: null,
            upActive: false,
            leftInt: null,
            leftActive: false,
            rightInt: null,
            rightActive: false,
            downInt: null,
            downActive: false
        })

        Builder
        .reset()
        .select('#space')
        .setCamera({anchor: [100, 100, 0], alpha: Math.PI/ 6})
        .setScreen({ratio: 0.99, offsetX: this.state.screenWidth/2, offsetY: this.state.screenHeight/2.5})
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


        this.globalInt = setInterval(() => {

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

    }

    componentDidMount () {

        // this.drawCube();

        this.drawBezierSurface()

    }

    render () {
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        width: '100%'
                    }}
                >
                    <Menu
                        onClick={e => {
                            this.setState({
                                selectedKey: e.key
                            })

                            clearInterval(this.globalInt);

                            if (e.key == 'bezier-surface') {
                                this.drawBezierSurface.call(this);
                            }

                            if (e.key == 'cube') {
                                this.drawCube.call(this);
                            }

                            if (e.key == 'bezier-animation') {
                                this.drawBezierSurfaceAnimation.call(this);
                            }

                            if (e.key == 'bezier-curve') {
                                this.drawBezierCurve.call(this);
                            }

                            if (e.key == 'line') {
                                this.drawLine.call(this);
                            }
                        }}
                        selectedKeys={this.state.selectedKey}
                        mode="horizontal"
                        theme="dark"
                    >
                        <Menu.Item key="bezier-surface">
                            Bezier Surface
                        </Menu.Item>
                        <Menu.Item key="bezier-animation">
                            Bezier Surface Animation
                        </Menu.Item>
                        <Menu.Item key="bezier-curve">
                            Bezier Curve
                        </Menu.Item>
                        <Menu.Item key="line">
                            Line
                        </Menu.Item>
                        <Menu.Item key="cube">
                            Cube
                        </Menu.Item>
                        <Menu.Item key="github">
                            <a href="https://github.com/captainwz/svg-3d-builder">
                                <Icon type="github"/>github
                            </a>
                        </Menu.Item>
                    </Menu>
                </div>
                <div 
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <svg id="space" width={this.state.screenWidth} height={this.state.screenHeight*0.8}>
                    </svg>
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: (() => {
                            if (this.state.upActive) {
                                return 33
                            } else if (this.state.downActive) {
                                return 27;
                            } else {
                                return 30
                            }
                        })(),
                        right: (() => {
                            if (this.state.leftActive) {
                                return 33
                            } else if (this.state.rightActive) {
                                return 27;
                            } else {
                                return 30
                            }
                        })(),
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        backgroundColor: 'rgba(101, 138, 215, 0.1)',
                        boxShadow: '2px 2px 2px #108ee9'
                    }}
                    className="control-panel"
                >
                    <div 
                        style={{
                            backgroundImage: 'url(./up.png)',
                            backgroundSize: '20px 20px',
                            width: 20,
                            height: 20,
                            position: 'absolute',
                            left: '50%',
                            top: 2,
                            marginLeft: -10,
                            opacity: this.state.upActive ? 1 : 0.3,
                        }}
                        onMouseDown={()=> {
                            this.state.upInt = setInterval(() => {
                                this.up.call(this)
                            }, 100);
                            this.setState({
                                upActive: true
                            })
                        }}
                        onMouseUp={()=> {
                            setTimeout(() => {
                                clearInterval(this.state.upInt)
                                this.setState({
                                    upActive: false
                                })
                            }, 50)
                        }}
                        onMouseLeave={()=>{
                            setTimeout(() => {
                                clearInterval(this.state.upInt)
                                this.setState({
                                    upActive: false
                                })
                            }, 50)
                        }}
                        onTouchStart={()=>{
                            this.state.upInt = setInterval(() => {
                                this.up.call(this)
                                this.setState({
                                    upActive: true
                                })
                            }, 100);
                        }}
                        onTouchEnd={()=>{
                            setTimeout(() => {
                                clearInterval(this.state.upInt)
                                this.setState({
                                    upActive: false
                                })
                            }, 50)
                        }}
                    />
                    <div 
                        style={{
                            backgroundImage: 'url(./left.png)',
                            backgroundSize: '20px 20px',
                            width: 20,
                            height: 20,
                            position: 'absolute',
                            left: 2,
                            top: '50%',
                            marginTop: -10,
                            opacity: this.state.leftActive ? 1 :0.3,
                        }}
                        onMouseDown={()=> {
                            this.state.leftInt = setInterval(() => {
                                this.left.call(this)
                            }, 100);
                            this.setState({
                                leftActive: true
                            })
                        }}
                        onMouseUp={()=> {
                            setTimeout(() => {
                                clearInterval(this.state.leftInt)
                                this.setState({
                                    leftActive: false
                                })
                            }, 50)
                        }}
                        onMouseLeave={()=>{
                            setTimeout(() => {
                                clearInterval(this.state.leftInt)
                                this.setState({
                                    leftActive: false
                                })
                            }, 50)
                        }}
                        onTouchStart={()=>{
                            this.state.leftInt = setInterval(() => {
                                this.left.call(this)
                                this.setState({
                                    leftActive: true
                                })
                            }, 100);
                        }}
                        onTouchEnd={()=>{
                            setTimeout(() => {
                                clearInterval(this.state.leftInt)
                                this.setState({
                                    leftActive: false
                                })
                            }, 50)
                        }}
                    />
                    <div 
                        style={{
                            backgroundImage: 'url(./right.png)',
                            backgroundSize: '20px 20px',
                            width: 20,
                            height: 20,
                            position: 'absolute',
                            right: 2,
                            top: '50%',
                            marginTop: -10,
                            opacity: this.state.rightActive ? 1 : 0.3,
                        }}
                        onMouseDown={()=> {
                            this.state.rightInt = setInterval(() => {
                                this.right.call(this)
                            }, 100);
                            this.setState({
                                rightActive: true
                            })
                        }}
                        onMouseUp={()=> {
                            setTimeout(() => {
                                clearInterval(this.state.rightInt)
                                this.setState({
                                    rightActive: false
                                })
                            }, 50)
                        }}
                        onMouseLeave={()=>{
                            setTimeout(() => {
                                clearInterval(this.state.rightInt)
                                this.setState({
                                    rightActive: false
                                })
                            }, 50)
                        }}
                        onTouchStart={()=>{
                            this.state.rightInt = setInterval(() => {
                                this.right.call(this)
                                this.setState({
                                    rightActive: true
                                })
                            }, 100);
                        }}
                        onTouchEnd={()=>{
                            setTimeout(() => {
                                clearInterval(this.state.rightInt)
                                this.setState({
                                    rightActive: false
                                })
                            }, 50)
                        }}
                    />
                    <div 
                        style={{
                            backgroundImage: 'url(./down.png)',
                            backgroundSize: '20px 20px',
                            width: 20,
                            height: 20,
                            position: 'absolute',
                            left: '50%',
                            bottom: 2,
                            marginLeft: -10,
                            opacity: this.state.downActive ? 1 :0.3,
                        }}
                        onMouseDown={()=> {
                            this.state.downInt = setInterval(() => {
                                this.down.call(this)
                            }, 100);
                            this.setState({
                                downActive: true
                            })
                        }}
                        onMouseUp={()=> {
                            setTimeout(() => {
                                clearInterval(this.state.downInt)
                                this.setState({
                                    downActive: false
                                })
                            }, 50)
                        }}
                        onMouseLeave={()=>{
                            setTimeout(() => {
                                clearInterval(this.state.downInt)
                                this.setState({
                                    downActive: false
                                })
                            }, 50)
                        }}
                        onTouchStart={()=>{
                            this.state.downInt = setInterval(() => {
                                this.down.call(this)
                                this.setState({
                                    downActive: true
                                })
                            }, 100);
                        }}
                        onTouchEnd={()=>{
                            setTimeout(() => {
                                clearInterval(this.state.downInt)
                                this.setState({
                                    downActive: false
                                })
                            }, 50)
                        }}
                    />
                </div>
                
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'));