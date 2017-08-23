import BaseClass from "./baseClass.js"
import baseImage from "../assets/png/enemies/turretRed.png"
import gunImage from "../assets/png/enemies/turretGun.png"
import Projectile from "./projectile.js"


export default class Turret extends BaseClass {
    constructor(x,y) {
        super(x,y,2,"none")
        this.base = new Image()
        this.cannon = new Image()
        this.base.src = baseImage
        this.cannon.src = gunImage
        this.health = 100
        this.centerCoords =[54,52] //center of image
        this.shootCoords = [58,98] //end of cannon
        this.shootFrame = 0
        this.type = "turret"
    }
    
    shoot(array) {
        array.push(new Projectile(this.x+this.shootCoords[0],this.y+this.shootCoords[1],"not player"))
    }
    
    render(context,target) {
        let cannonX = this.x + this.centerCoords[0]
        let cannonY = this.y + this.centerCoords[1] 
        let distanceX = target.x - cannonX
        let distanceY = target.y - cannonY
        let angle = Math.atan2(distanceY,distanceX) - Math.PI/2

        context.drawImage(this.base,this.x,this.y)
        context.save()
        context.translate(cannonX,cannonY)
        context.rotate(angle)
        context.translate(-cannonX,-cannonY)
        context.drawImage(this.cannon,cannonX,cannonY)
        context.restore()

        let cos = Math.cos(angle*180/Math.PI)
        let sin = Math.sin(angle*180/Math.PI)
        let shootX = this.x + this.shootCoords[0]
        let shootY = this.y + this.shootCoords[1]
        shootY = shootY*cos - shootX*sin
        shootX = shootY*sin + shootX*cos
        this.shootCoords[1] = shootY - this.y
        this.shootCoords[0] = shootX - this.x

    }
}
