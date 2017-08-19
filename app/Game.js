import React from "react"
import Canvas from "./Canvas.js"


export default class Game extends React.Component {
    constructor(){
        super()
        this.state = {
            frame: 0,
        }
        this.tick = this.tick.bind(this)
        
    }
    componentDidMount() {
        requestAnimationFrame(this.tick)
    }
    
    tick() {
        this.setState({
            frame:this.state.frame+1
        },()=>{
            requestAnimationFrame(this.tick)
        })
    }
    render() {
        return(
           <Canvas frame={this.state.frame} end={this.props.end} gameOver={false} /> 
        )
    }
}