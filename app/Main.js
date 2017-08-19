import React from "react"
import Game from './Game.js' 
import Menu from "./Menu.js"

export default class Main extends React.Component {
    constructor(){
        super()
        this.state = {
            gameStarted:false
            }
        this.startGame = this.startGame.bind(this)
        this.endGame = this.endGame.bind(this)
        
   }
    startGame() {
        this.setState({
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
                {this.state.gameStarted ? <Game end={this.endGame}/> : <Menu start={this.startGame}/>}
            </div>            
        )
    }
}