import Projectile from "./projectile.js"
import {getSizeRatio} from "../random.js"


//this projectile shoots at an angle, regular projectiles shoot straight
export default class ProjectilePlus extends Projectile {
    constructor(x,y,xs,ys,angle,src) {
        super(x,y,src)
        this.xs = xs
        this.ys = ys
        this.angle = angle
        this.speed = 10*getSizeRatio()
    }
     
    move() {
        this.y += this.ys*this.speed
        this.x +=this.xs*this.speed
    }

    render(context) {
        context.save()
        context.translate(this.x,this.y)
        context.rotate(this.angle)
        context.translate(-this.x,-this.y)

        context.drawImage(this.image,this.x,this.y,this.image.width*getSizeRatio(), this.image.height*getSizeRatio())
        context.restore()
    }
}