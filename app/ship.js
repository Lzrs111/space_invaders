import BaseClass from "./baseClass.js"
import shipImage from "./assets/PNG/playerShip1_blue.png" 

export default class Ship extends BaseClass{
    constructor(x,y) {
        super(x,y,0,shipImage)
        this.xspeed = 0
        this.health = 100

    }
    
    move() {
        this.x +=this.xspeed
    }


}