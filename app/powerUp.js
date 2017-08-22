import BaseClass from "./baseClass.js"
import HealthPowerUp from "./assets/png/ui/heartIcon.png"
import AmmoPowerUp from "./assets/png/power-ups/powerupGreen_bolt.png"
import ShieldPowerUp from "./assets/png/power-ups/powerupBlue_shield.png"

var powerups = {
    0: ["health",HealthPowerUp],
    1: ["ammo upgrade",AmmoPowerUp],
    2: ["shield", ShieldPowerUp]
}


export default class Powerup extends BaseClass {
   constructor(x,y) {
       var number = Math.floor(Math.random()*3)
       super(x,y,3,powerups[number][1])
       this.type = powerups[number][0]
   } 
}