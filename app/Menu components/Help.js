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
        this.state = {
            content: { 
              0:  ["Move the ship with mouse,keyboard or with your finger.", Testimage],
              1:  ["Try to hit the enemy with your projectiles while avoiding theirs",Testimage],
              2:  ["Your health and shield is displayed in the upper right corner. Lives are displayed in the upper left corner",Testimage],
              3:  ["Once your health is depleted you will lose a life. Lose all lives and it's game over",Testimage],
              4:  ["Health powerup. Pick this up to restore 20HP",HealthPowerUp],
              5:  ["Shield powerup. Pick this up to restore shield to 100 points",ShieldPowerUp],
              6:  ["Weapon powerup. Pick this up to upgrade your weapon",AmmoPowerUp],
              7:  ["Attack speed powerup. Pick this up to increase your attack speed",AttackPowerUp],
            },
            pages: 2,
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
        return <HelpPage content={temporary}/>
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