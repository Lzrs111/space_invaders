import BaseClass from "./baseClass.js"
import HealthPowerUp from "./assets/png/power-ups/star_gold.png"

export default class Powerup extends BaseClass {
   constructor(x,y) {
       super(x,y,5,HealthPowerUp)
   } 
}