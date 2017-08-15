import React from "react"
import ReactDOM from "react-dom" 
import Invader from "./invader.js"
import Projectile from "./projectile.js"
import Ship from "./ship.js"
import {randomX,randomY} from "./random.js" 

export default class Canvas extends React.Component {
    constructor(props){
        super()
        this.state = {
            frame:props.frame,
            invaders:[],
            ship:"",
            width:800,
            height: 600,
            projectiles: []
            }
        this.eventFunction = this.eventFunction.bind(this)
    }
    componentDidMount() {
        //setup
        var invaders = this.state.invaders
        var ship = new Ship(this.state.width/2,this.state.height-100,0,0,50,50,100)

        //create invaders
        for (var i = 0; i < 5; i++) {
           invaders.push(new Invader(randomX(this.state.height),randomY(),0,10,50,50,100)) 
        }
        this.setState({
            invaders:invaders,
            ship: ship
        })

        //event handler functions
        document.addEventListener("keydown",this.eventFunction)
        document.addEventListener("keyup",this.eventFunction)


        var ctx = ReactDOM.findDOMNode(this).getContext("2d")
        this.paint(ctx)

    }
    componentDidUpdate() {
        var context = ReactDOM.findDOMNode(this).getContext('2d');
        this.paint(context);
    }
 
 
    eventFunction(event) {
        var keyCode = event.keyCode
        var eType = event.type
        var ship = this.state.ship
        var projectiles = this.state.projectiles 


        if (eType == "keydown" && event.repeat !=true) {
            switch (keyCode) {
                case 37:
                    ship.xspeed = -5
                    console.log("moving left")
                    break;
                case 39:
                    ship.xspeed = 5
                    console.log("moving right")
                    break;
            } 
        }  else if (eType == "keyup" && keyCode !=32) {
            ship.xspeed = 0
        }

        if (keyCode == 32 && event.repeat !=true) {
            projectiles.push(new Projectile(ship.x+(ship.width)/2,ship.y+10,0,10,10,10,ship.ammo))
        } 

        this.setState({
            projectiles:projectiles,
            ship:ship
        })

    }
    paint(context) {
        var invaders = this.state.invaders
        var ship = this.state.ship
        var projectiles = this.state.projectiles
        context.clearRect(0,0,800,600)

        //first, change positions of elements
        //player
        try {
            ship.move()
        } catch (e){
            console.log(e)
        }

        //projectiles
        for (var i = 0; i < projectiles.length; i++) {
           projectiles[i].move()
           if (projectiles[i].y <0){
               projectiles.splice(i,1)
               i--
            }
        }

        //enemies
        for (var i = 0; i<invaders.length; i++) {
            invaders[i].move()
            
            if (invaders[i].y > this.state.height) {
                invaders.splice(i,1)
                invaders.push(new Invader(randomX(this.state.height),randomY(),0,10,50,50,100)) 
                i--
            }
        }

        
        //rendering
        //player
        try {
            ship.render(context)
        } catch(e) {
            //nothing
        }
        //projectiles
        for (var i = 0; i < projectiles.length; i++) {
            projectiles[i].render(context)
        }

        //enemies
        for (var i = 0; i < invaders.length; i++) {
            invaders[i].render(context)
        }

    }
    render() {
        return(
           <canvas width={800} height={600}></canvas> 
        )
    }
}