import BaseClass from "./baseClass.js"
import {degToRad,getSizeRatio} from "../random.js"
import Projectile from "./projectile.js"
import ProjectilePlus from "./projectileplus.js"
import Shield from "./shield.js"

export default class Ship extends BaseClass{
    constructor(x,y,src) {
        super(x,y,0,src)
        this.xspeed = 0
        this.health = 100
        this.shield = false
        this.ammo = 0,
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
                Ship.createProjectile(this.x+((this.image.width/2)-4)*getSizeRatio(),this.y,90,array)
                break;
            case 1:
                Ship.createProjectile(this.x+((this.image.width/2)-8)*getSizeRatio(),this.y,90,array)
                Ship.createProjectile(this.x+((this.image.width/2)+4)*getSizeRatio(),this.y,90,array)
                break
            case 2:
                Ship.createProjectile(this.x,this.y,110,array)
                Ship.createProjectile(this.x + (this.image.width*getSizeRatio()),this.y,70,array)
                Ship.createProjectile(this.x+((this.image.width/2)-4)*getSizeRatio(),this.y,90,array)
                break
            case 3:
                Ship.createProjectile(this.x,this.y,110,array)
                Ship.createProjectile(this.x + (this.image.width*getSizeRatio()),this.y,70,array)
                Ship.createProjectile(this.x+((this.image.width/2)-8)*getSizeRatio(),this.y,90,array)
                Ship.createProjectile(this.x+((this.image.width/2)+4)*getSizeRatio(),this.y,90,array)
                break
            case 4:
                Ship.createProjectile(this.x,this.y,110,array)
                Ship.createProjectile(this.x + (this.image.width*getSizeRatio()),this.y,70,array)
                Ship.createProjectile(this.x+((this.image.width/2)-4)*getSizeRatio(),this.y,90,array)
                Ship.createProjectile(this.x+(this.image.width/4)*getSizeRatio(),this.y,100,array)
                Ship.createProjectile(this.x+3*(this.image.width/4)*getSizeRatio(),this.y,80,array)
                break
            default:
                break;
        }
        this.shootFrames = 0
    }
    }

    shieldUp() {
        let x = this.x -(25*getSizeRatio()) 
        let y = this.y -(25*getSizeRatio())
        this.shield = new Shield(x,y)
    }


    static createProjectile(x,y,deg,array) {
        return array.push(new ProjectilePlus(x,y,Math.cos(degToRad(deg)),-Math.sin(degToRad(deg)),degToRad(-(deg-90)),"player"))
    }

    render(context) {
            context.drawImage(this.image,this.x,this.y,this.image.width*getSizeRatio(), this.image.height*getSizeRatio())
            if (this.shield){
            context.drawImage(this.shield.image,this.shield.x,this.shield.y,this.shield.image.width*getSizeRatio(),this.shield.image.height*getSizeRatio())
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
