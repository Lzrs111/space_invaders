import React from "react"
import Game from './Game.js' 

export default class Main extends React.Component {
    constructor(){
        super()
        this.state = {
            gameStarted:true
            }
        this.startGame = this.startGame.bind(this)
   }
    startGame() {
        this.setState({
            gameStarted:true
        })
    }
    render() {
        return(
            <div>
                {this.state.gameStarted ? <Game/> : <Menu start={this.startGame}/>}
            </div>            
        )
    }
}