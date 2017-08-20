import BaseClass from "./baseClass.js"
import ShieldBig from "./assets/PNG/Effects/shield3.png"
import ShieldMedium from "./assets/PNG/Effects/shield2.png"
import ShieldSmall from "./assets/PNG/Effects/shield1.png"


export default class Shield extends BaseClass {
    constructor(x,y) {
    
    super(x,y,0,ShieldBig)
        this.health = 100
    }
   
    move() {
        this.x +=this.xspeed
    }
    update() {
        if (this.health <50){
            this.image.src = ShieldMedium
        } else if (this.health <25){
            this.image.src = ShieldSmall
        } else {
            this.image.src = ShieldBig 
        }
    }
}
