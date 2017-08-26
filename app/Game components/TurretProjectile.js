import enemyProjectileSrc from "../assets/PNG/lasers/laserRed05.png"
import Projectile from "./projectile.js"


export default class TurretProjectile extends Projectile {
    constructor(x,y,xs,ys,angle) {
        super(x,y,"not player")
        this.xs = xs
        this.ys = ys
        this.image.src = enemyProjectileSrc
        this.angle = angle
    }
     
    move() {
        this.y += this.ys*10
        this.x +=this.xs*10
    }

    render(context) {
        context.save()
        context.translate(this.x,this.y)
        context.rotate(this.angle)
        context.translate(-this.x,-this.y)
        context.drawImage(this.image,this.x,this.y)
        context.restore()
    }
}