
//base class - used for invaders, powerups, player ship, bullets..
export default class BaseClass {
    constructor(x,y,speed,imagesrc) {
        this.x = x
        this.y = y
        this.speed = speed
        this.image = new Image()
        this.imagesrc = imagesrc
    }

    move() {
        this.y += this.speed
    }

    render(context) {
        this.image.src = this.imagesrc
        return context.drawImage(this.image,this.x,this.y)
    }
}
