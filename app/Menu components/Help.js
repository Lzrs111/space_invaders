import React from "react"
import HelpBox from "./helpbox.js"
import HelpPage from "./helppage.js"
import './help.css'
import Testimage from "../assets/PNG/power-ups/bold_silver.png"
//image imports
import HealthPowerUp from "../assets/png/ui/heartIcon.png"
import AmmoPowerUp from "../assets/png/power-ups/powerupBlue_star.png"
import ShieldPowerUp from "../assets/png/power-ups/powerupBlue_shield.png"
import AttackPowerUp from "../assets/png/power-ups/powerupBlue_bolt.png"

export default class Help extends React.Component {
    constructor(){
        super()
        var images = new Array(4)
        images.fill(Testimage)
        this.state = {
            content: [
                "Move the ship with mouse,keyboard or with your finger.",
                "Try to hit the enemy with your projectiles while avoiding theirs",
                "Your health and shield is displayed in the upper right corner. Lives are displayed in the upper left corner",
                "Once your health is depleted you will lose a life. Lose all lives and it's game over",
                "Health powerup. Pick this up to restore 20HP",
                "Shield powerup. Pick this up to restore shield to 100 points",
                "Weapon powerup. Pick this up to upgrade your weapon",
                "Attack speed powerup. Pick this up to increase your attack speed"
            ],
            pages: 2,
            images: images,
            activePage: 1
        }
        this.renderPage = this.renderPage.bind(this)
        this.pageSwitch = this.pageSwitch.bind(this)
        
    }
    renderPage() {
        var count = (this.state.activePage == 1) ? 0 : 4
        var temporary = []
        for (var i = 0; i < 4; i++) {
            temporary.push(this.state.content[count])
            count++
        }
        console.log(temporary)
        return <HelpPage images={this.state.images} content={temporary}/>
    }
    pageSwitch(x) {
        this.setState({
            activePage: this.state.activePage + x
        })
    }
    render() {
        return(
            <div className="contentDiv">
                <div>
                    {this.renderPage()}
                </div>
                <div className="buttonDiv">
                    <button className="pageButton" onClick={()=>{
                        this.pageSwitch(-1)}} disabled={(this.state.activePage == 1) ? true : false}>
                        Previous
                        </button>
                    <button className="pageButton" onClick={()=>{
                        this.pageSwitch(1)}} disabled={(this.state.activePage == 2) ? true : false}>
                        Next
                        </button>
                </div>
                <div style={{height: "10%"}}>
                <button className="menuButton" style={{height: "100%",marginTop: "0"}} onClick={()=>{
                   this.props.renderChange(0)}}>
                    Back to main
                </button>
                </div>
            </div>            
        )
    }
}