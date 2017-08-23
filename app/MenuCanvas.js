import React from "react"
import ReactDOM from "react-dom" 
import Star from "./star.js"
import {randomX,randomY,detectCollision} from "./random.js" 

export default class MenuCanvas extends React.Component {
    constructor(props){
        super()
        this.state = {
            stars: [],
            width: window.innerWidth,
            height: window.innerHeight
            }
    }
    componentDidMount() {
        var stars = this.state.stars
        //create background
        for (var i = 0; i  < 100; i++) {
            stars.push(new Star(randomX(this.state.width),randomY(-100,this.state.height)))
        }
        this.setState({
            stars:stars
        })
    }
    componentDidUpdate() {
        var context = ReactDOM.findDOMNode(this).getContext('2d');
        this.endLoop(context)
    }
    endLoop(context) {
        var stars = this.state.stars
        context.fillStyle = "black"
        context.fillRect(0,0,this.state.width,this.state.height)
        context.fillStyle = "white"
        for (var i = 0; i < stars.length; i++) {
            stars[i].render(context)
        }
    }
    render() {
        return(
           <canvas width={this.state.width} height={this.state.height}></canvas> 
        )
    }
}