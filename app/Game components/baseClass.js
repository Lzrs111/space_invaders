import {getSizeRatio} from "../random.js"
//base class - used for invaders, powerups, player ship, bullets..
export default class BaseClass {
    constructor(x,y,speed,imagesrc) {
       
        this.x = x
        this.y = y
        this.speed = speed*getSizeRatio()
        this.image = new Image()
        this.image.src = imagesrc
        this.imageW = this.image.width
        this.imageH = this.image.height
    }

    move() {
        this.y += this.speed
    }

    render(context) {
            return context.drawImage(this.image,this.x,this.y,this.image.width*getSizeRatio(),this.image.height*getSizeRatio())
        }
     
}
