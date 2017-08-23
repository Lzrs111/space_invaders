
//base class - used for invaders, powerups, player ship, bullets..
export default class BaseClass {
    constructor(x,y,speed,imagesrc) {
        this.x = x
        this.y = y
        this.speed = speed
        this.image = new Image()
        this.image.src = imagesrc
    }

    move() {
        this.y += this.speed
    }

    render(context) {
        return context.drawImage(this.image,this.x,this.y)
    }
}
