import BaseClass from "./baseClass.js"


export default class Invader extends BaseClass {
    constructor(x,y,xspeed,yspeed,width,height,health){
        super(x,y,xspeed,yspeed,width,height)
        this.health = health
        this.status = 0
    }
    
}