import React from "react"   
import Canvas from "./Canvas"

export default class Menu extends React.Component {
    constructor(props){
        super()
        this.state = {

            }
    }
    render() {
        return(
            <div>
                <div className = "buttonBox">
                    <button onClick={this.props.start}>
                       Start game 
                    </button>    
                </div>
                <Canvas gameOver = {true}/> 
            </div>
        )
    }
}