import BaseClass from "./baseClass.js"
import {degToRad} from "../random.js"
import Projectile from "./projectile.js"
import ProjectilePlus from "./projectileplus.js"
import Shield from "./shield.js"

export default class Ship extends BaseClass{
    constructor(x,y,src) {
        super(x,y,0,src)
        this.xspeed = 0
        this.health = 100
        this.shield = false
        this.ammo = 4,
        this.lives =4,
        this.shooting = false
        this.shootFrames = 0,
        this.baseAttackSpeed = 30 
        this.attackSpeed = this.baseAttackSpeed
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
                Ship.createProjectile((this.x+this.image.width/2)-4,this.y,90,array)
                break;
            case 1:
                Ship.createProjectile((this.x+this.image.width/2)-8,this.y,90,array)
                Ship.createProjectile((this.x+this.image.width/2)+4,this.y,90,array)
                break
            case 2:
                Ship.createProjectile(this.x,this.y,110,array)
                Ship.createProjectile(this.x + this.image.width,this.y,70,array)
                Ship.createProjectile((this.x+this.image.width/2)-4,this.y,90,array)
                break
            case 3:
                Ship.createProjectile(this.x,this.y,110,array)
                Ship.createProjectile(this.x + this.image.width,this.y,70,array)
                Ship.createProjectile((this.x+this.image.width/2)-8,this.y,90,array)
                Ship.createProjectile((this.x+this.image.width/2)+4,this.y,90,array)
                break
            case 4:
                Ship.createProjectile(this.x,this.y,110,array)
                Ship.createProjectile(this.x + this.image.width,this.y,70,array)
                Ship.createProjectile((this.x+this.image.width/2)-4,this.y,90,array)
                Ship.createProjectile((this.x+this.image.width/4),this.y,100,array)
                Ship.createProjectile((this.x+3*this.image.width/4),this.y,80,array)
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


    static createProjectile(x,y,deg,array) {
        return array.push(new ProjectilePlus(x,y,Math.cos(degToRad(deg)),-Math.sin(degToRad(deg)),degToRad(-(deg-90)),"player"))
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
                if (this.ammo <4){
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
