import BaseClass from "./baseClass.js"
import HealthPowerUp from "../assets/png/ui/heartIcon.png"
import AmmoPowerUp from "../assets/png/power-ups/powerupBlue_star.png"
import ShieldPowerUp from "../assets/png/power-ups/powerupBlue_shield.png"
import AttackPowerUp from "../assets/png/power-ups/powerupBlue_bolt.png"

var powerups = {
    0: ["health",HealthPowerUp],
    1: ["ammo upgrade",AmmoPowerUp],
    2: ["shield", ShieldPowerUp],
    3: ["attack speed",AttackPowerUp]
}


export default class Powerup extends BaseClass {
   constructor(x,y) {
       var number = Math.floor(Math.random()*Object.keys(powerups).length)
       super(x,y,3,powerups[number][1])
       this.type = powerups[number][0]
   } 
}
