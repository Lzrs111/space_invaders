import BaseClass from "./baseClass.js"

export default class Star extends BaseClass{
    constructor(x,y,xspeed,yspeed,width,height) {
        super(x,y,xspeed,yspeed)
    }

    renderSpec(context) {
      context.beginPath();
      context.moveTo(this.x,this.y)
      context.lineTo(this.x,this.y+1)
      context.strokeStyle = "white"
      context.stroke()
    }

    render(context) {
        return this.renderSpec(context)
    }

}