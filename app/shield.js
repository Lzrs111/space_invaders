import BaseClass from "./baseClass.js"
import ShieldBig from "./assets/PNG/Effects/shield3.png"
import ShieldMedium from "./assets/PNG/Effects/shield2.png"
import ShieldSmall from "./assets/PNG/Effects/shield1.png"


export default class Shield extends BaseClass {
    constructor(x,y) {
    
    super(x,y,0,ShieldBig)
        this.health = 100
    }
   
    move(speed) {
        this.x += speed
    }
    update() {
        console.log("updating shield")
        if (this.health <75){
            console.log("medium")
            this.image.src = ShieldMedium
        } else if (this.health <40){
            console.log("small")
            this.image.src = ShieldSmall
        } else {
            this.image.src = ShieldBig 
        }
    }
}
