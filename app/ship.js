import BaseClass from "./baseClass.js"
import Projectile from "./projectile.js"
import shipImage from "./assets/PNG/playerShip1_blue.png" 

export default class Ship extends BaseClass{
    constructor(x,y) {
        super(x,y,0,shipImage)
        this.xspeed = 0
        this.health = 100
        this.shield = false
        this.ammo = 0

    }
    
    move() {
        this.x +=this.xspeed
    }

    shoot(array) {
        switch (this.ammo) {
            case 0:
                array.push(new Projectile((this.x+this.image.width/2)-4,this.y,"player"))
                break;
            case 1:
                array.push(new Projectile(this.x,this.y,"player"))
                array.push(new Projectile(this.x + this.image.width,this.y,"player"))
                break
            case 2:
                array.push(new Projectile(this.x,this.y,"player"))
                array.push(new Projectile(this.x + this.image.width,this.y,"player"))
                array.push(new Projectile((this.x+this.image.width/2)-4,this.y,"player"))
                break
            default:
                break;
        }

    }


}