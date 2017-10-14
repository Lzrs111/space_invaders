import React from "react"
import "./settings.css"
import playerShip1Blue from "../assets/PNG/playerShip1_blue.png"
import playerShip1Green from "../assets/PNG/playerShip1_green.png"
import playerShip1Orange from "../assets/PNG/playerShip1_orange.png"
import playerShip1Red from "../assets/PNG/playerShip1_red.png"
import playerShip2Blue from "../assets/PNG/playerShip2_blue.png"
import playerShip2Green from "../assets/PNG/playerShip2_green.png"
import playerShip2Orange from "../assets/PNG/playerShip2_orange.png"
import playerShip2Red from "../assets/PNG/playerShip2_red.png"
import playerShip3Blue from "../assets/PNG/playerShip3_blue.png"
import playerShip3Green from "../assets/PNG/playerShip3_green.png"
import playerShip3Orange from "../assets/PNG/playerShip3_orange.png"
import playerShip3Red from "../assets/PNG/playerShip3_red.png"

export default class Settings extends React.Component {
    constructor(){
        super()
        this.ships= {
            //ship model: [ship color 1, ship color 2,...]
            1: [playerShip1Blue,playerShip1Green,playerShip1Orange,playerShip1Red], 
            2: [playerShip2Blue,playerShip2Green,playerShip2Orange,playerShip2Red], 
            3: [playerShip3Blue,playerShip3Green,playerShip3Orange,playerShip3Red], 
        }
        this.state = {
            ship: 1,
            index: 0
        }
        this.colorSwitch = this.colorSwitch.bind(this)
        this.renderPictureAndColor = this.renderPictureAndColor.bind(this)
        
    }
    colorSwitch(index) {
        //change color of ship
        this.setState({
            index:index
        })
    }
    shipSwitch(num) {
        //change model of ship
        if (this.state.ship == 3 && num == +1){
           this.setState({
               ship:1
           }) 
        } else if (this.state.ship == 1 && num == -1) {
            this.setState({
                ship:3
            })
        } else {
        this.setState({
            ship:this.state.ship + num
        })
    }
    }
    renderPictureAndColor() {
        //depending on screen size, render elements accordingly
        let colors = ["36bbf5","71c937","de532c","ac3939"]
        if (window.innerWidth > 480){
            return (
                <div className="pictureAndColor">
                    <div className="pictureFrame">
                        <img className="image" src={this.ships[this.state.ship][this.state.index]}/>
                    </div>
                    <div className ="colorPick">
                    {colors.map((value,index)=>{
                        return <div className="color" onClick={()=>{
                            this.colorSwitch(index)}} style={{backgroundColor:"#" + value}}>
                        </div>})} 
                    </div>
                </div>
            )
        } else {
            return (
                <div className="pictureAndColor">
                    <div className ="colorPick">
                    {colors.map((value,index)=>{
                        return <div className="color" onClick={()=>{
                            this.colorSwitch(index)}} style={{backgroundColor:"#" + value}}>
                        </div>})} 
                    </div>
                    <div className="pictureFrame">
                        <img className="image" src={this.ships[this.state.ship][this.state.index]}/>
                    </div>
                </div>
            )
        }

    }
    render() {
        return(
                <div style={{width: "100%", height:"100%"}}>
                    {this.renderPictureAndColor()}
                    <div className = "switch">
                        <button className="shipButton" onClick={()=>{
                            this.shipSwitch(-1)}}>
                          {"<"}
                        </button>
                        <p style={{display: "inline-block"}}>
                            Ship 1
                        </p>
                        <button className="shipButton" onClick={()=>{
                            this.shipSwitch(1)}}>
                          {">"}
                        </button>
                    </div>
                <button className="menuButton" onClick={()=>{
                    //pass ship image src back to Main component
                    this.props.switch(this.ships[this.state.ship][this.state.index])
                    //render Main Menu
                   this.props.renderChange(0)}}>
                    Save and back to main
                </button>
            </div>            
        )
    }
}