import BaseClass from "./Game components/baseClass.js"

export default class Star extends BaseClass{
    constructor(x,y) {
        super(x,y,2,"none")
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