import React from "react"
import Game from './Game components/Game.js' 
import Menu from "./Menu components/Menu.js"
import "./main.css"

export default class Main extends React.Component {
    constructor(){
        super()
        this.state = {
            gameStarted:false,
            mouseCoords:  []
            }
        this.startGame = this.startGame.bind(this)
        this.endGame = this.endGame.bind(this)
        
   }
    startGame(event) {
        this.setState({
            mouseCoords: [event.screenX,event.screenY],
            gameStarted:true
        })
    }
    endGame() {
        this.setState({
            gameStarted: false
        })
    }
    render() {
        return(
            <div>
                {this.state.gameStarted ? <Game mouseCoords={this.state.mouseCoords} end={this.endGame}/> : <Menu start={this.startGame}/>}
            </div>            
        )
    }
}