import React from "react"   
import ReactDOM from "react-dom" 
import MenuCanvas from "./MenuCanvas"
import "./menu.css"

export default class Menu extends React.Component {
    constructor(props){
        super()
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            }
    }
    componentDidMount() {
        this.startButton.addEventListener("click",this.props.start)
    }
    render() {
        return(
            <div>
                <div className = "menu">
                    <button ref={(start)=>{
                        this.startButton = start}} className="menuButton">
                       Start game 
                    </button>    
                </div>
                <MenuCanvas/> 
            </div>
        )
    }
}