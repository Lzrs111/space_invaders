function Invader(img,x,y) {

    // this.img = rect
    this.x = x
    this.y = y
    this.xspeed = 10
    this.yspeed = 1 

    this.draw = ()=>{
        // image(this.img,this.x,this.y)
        rect(this.x,this.y,50,50)
        fill(200,200,200)
        }

    this.move = ()=>{
        this.y +=this.yspeed    
    }

    }