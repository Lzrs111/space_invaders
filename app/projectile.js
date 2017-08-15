import BaseClass from "./baseClass.js"

export default class Projectile extends BaseClass {
    constructor(x,y,xspeed,yspeed,width,height,type){
        super(x,y,xspeed,yspeed,width,height)
        this.type=type
    }

    move() {
        this.y -=this.yspeed
    }

}