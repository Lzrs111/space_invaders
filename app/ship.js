import BaseClass from "./baseClass.js"
import Projectile from "./projectile.js"
import shipImage from "./assets/PNG/playerShip1_blue.png" 
import Shield from "./shield.js"

export default class Ship extends BaseClass{
    constructor(x,y) {
        super(x,y,0,shipImage)
        this.xspeed = 0
        this.health = 100
        this.shield = false
        this.ammo = 0,
        this.lives =4,
        this.shooting = false
        this.shootFrames = 0,
        this.baseAttackSpeed = 30
        this.attackSpeed = 30

    }
    
    move() {
        this.x +=this.xspeed
        if (this.shield){
            this.shield.move(this.xspeed)
        }
    }

    shoot(array) {
    if (this.shootFrames == this.attackSpeed) {
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
        this.shootFrames = 0
    }
    }

    shieldUp() {
        let x = this.x -25 
        let y = this.y -25
        this.shield = new Shield(x,y)
    }

    render(context) {
        context.drawImage(this.image,this.x,this.y)
        if (this.shield){
            context.drawImage(this.shield.image,this.shield.x,this.shield.y)
        }
    }

   pickup(powerup) {
       switch(powerup.type) {
           case "health":
                this.health +=20
                break;
            case "ammo upgrade":
                if (this.ammo <2){
                    this.ammo +=1
                }
                break;
            case "shield":
                this.shieldUp()
                break
            case "attack speed":
            if (this.attackSpeed > this.baseAttackSpeed*0.5) {
                this.attackSpeed = this.attackSpeed - Math.floor(this.baseAttackSpeed*0.2) //attack faster 
                break
            }
       }
   }

}
