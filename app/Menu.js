import React from "react"   
import Canvas from "./Canvas"
import "./menu.css"

export default class Menu extends React.Component {
    constructor(props){
        super()
        
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
            }
    }
    render() {
        return(
            <div>
                <div className = "menu">
                    <button onClick={this.props.start} className="menuButton">
                       Start game 
                    </button>    
                </div>
                <Canvas gameOver = {true}/> 
            </div>
        )
    }
}