import BaseClass from "./baseClass.js"

export default class Ship extends BaseClass{
    constructor(x,y,xspeed,yspeed,width,height,health) {
        super(x,y,xspeed,yspeed,width,height)
        this.health = health
        this.ammo = "basic"
    }
    
    move() {
        this.x +=this.xspeed
    }

}