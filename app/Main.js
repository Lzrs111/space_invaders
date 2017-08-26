import React from "react"
import Game from './Game components/Game.js' 
import Menu from "./Menu components/Menu.js"
import ShipDefault from "./assets/PNG/playerShip1_blue.png"
import "./main.css"

export default class Main extends React.Component {
    constructor(){
        super()
        this.state = {
            gameStarted:false,
            mouseCoords:  [],
            shipSrc: ShipDefault
            }
        this.startGame = this.startGame.bind(this)
        this.endGame = this.endGame.bind(this)
        this.shipSwitch = this.shipSwitch.bind(this)
        
        
   }
    startGame(event) {
        let x, y
        
        if (event.type == "touchstart"){
            x = window.innerWidth/2 
            y = window.innerHeight - 100
        } else {
            x = event.screenX
            y = event.screenY
        }
        this.setState({
            mouseCoords: [x,y],
            gameStarted:true
        })
    }
    endGame() {
        this.setState({
            gameStarted: false
        })
    }
    shipSwitch(img) {
        this.setState({
            shipSrc:img
        })
    }
    render() {
        return(
            <div>
                {this.state.gameStarted ? <Game ship={this.state.shipSrc} mouseCoords={this.state.mouseCoords} end={this.endGame}/> : <Menu switch={this.shipSwitch} start={this.startGame}/>}
            </div>            
        )
    }
}