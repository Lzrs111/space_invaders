import BaseClass from "./baseClass.js"
import baseImage from "../assets/png/enemies/turretRed.png"
import gunImage from "../assets/png/enemies/turretGun.png"
import TurretProjectile from "./TurretProjectile.js"

export default class Turret extends BaseClass {
    constructor(x,y) {
        super(x,y,2,"none")
        this.image = new Image()
        this.cannon = new Image()
        this.image.src = baseImage
        this.cannon.src = gunImage
        this.health = 100
        this.centerCoords =[54,52] //center of image
        this.shootFrame = 0
        this.attackSpeed = 30 
        this.type = "turret"

        this.cannonX = this.x + this.centerCoords[0]
        this.cannonY = this.x + this.centerCoords[1]
        this.angle = 0
        this.cos = 0
        this.sin = 0
    }
    
    shoot(array) {
        if (this.shootFrame >= this.attackSpeed){
            array.push(new TurretProjectile(this.cannonX,this.cannonY,this.cos,this.sin,this.angle))
            this.shootFrame = 0
        }
    }
    
    render(context,target) {

        //update cannon render points
        this.cannonX = this.x + this.centerCoords[0]
        this.cannonY = this.y + this.centerCoords[1] 
        
        //distance to ship and angle
        let distanceX = target.x+50 - this.cannonX
        let distanceY = target.y+50 - this.cannonY
        let angle = Math.atan2(distanceY,distanceX) - Math.PI/2 //<--- initial angle of cannon is subtracted since the image is rotated at 90deg
        this.angle = angle
        
        //draw base of turret
        context.drawImage(this.image,this.x,this.y)
        context.save()
        //translate content to center of image
        context.translate(this.cannonX,this.cannonY)
        //rotate by angle
        context.rotate(angle)
        //return to 0,0
        context.translate(-this.cannonX,-this.cannonY)
        //draw image
        context.drawImage(this.cannon,this.cannonX,this.cannonY)
        context.restore()

        this.cos = Math.cos(angle+ Math.PI/2) 
        this.sin = Math.sin(angle + Math.PI/2)
     

    }
}
