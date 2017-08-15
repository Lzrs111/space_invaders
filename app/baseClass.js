
//base class - used for invaders, powerups, player ship, bullets..
export default class BaseClass {
    constructor(x,y,xspeed,yspeed,width,height){
        this.x = x
        this.y = y
        this.xspeed = xspeed
        this.yspeed = yspeed
        this.width = width
        this.height = height
    }

    move() {
        this.y += this.yspeed
    }

    render(context) {
        return context.fillRect(this.x,this.y,this.width,this.height)
    }
}
