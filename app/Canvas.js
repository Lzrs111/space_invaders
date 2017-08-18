import createInvader from "./createInvader.js"
import React from "react"
import ReactDOM from "react-dom" 
import Invader from "./invader.js"
import Powerup from "./powerUp.js"
import Projectile from "./projectile.js"
import Ship from "./ship.js"
import Star from "./star.js"
import {randomX,randomY,detectCollision} from "./random.js" 

export default class Canvas extends React.Component {
    constructor(props){
        super()
        this.state = {
            frame:props.frame,
            invaders:[],
            ship:"",
            width:800,
            height: 600,
            projectiles: [],
            stars: [],
            powerups: []
            }
        this.eventFunction = this.eventFunction.bind(this)
    }
    componentDidMount() {
        //setup
        var invaders = this.state.invaders
        var ship = new Ship(this.state.width/2,this.state.height-100)
        var stars = this.state.stars

        //create invaders
        for (var i = 0; i < 5; i++) {
            createInvader(invaders,this.state.width-100,-500,0)
        }

        console.log(invaders)

        this.setState({
            invaders:invaders,
            ship: ship,
            stars:stars
        })


        //create background
        for (var i = 0; i  < 100; i++) {
            stars.push(new Star(randomX(this.state.width),randomY(-100,this.state.height)))
        }

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
                    break;
                case 39:
                    ship.xspeed = 5
                    break;
            } 
        }  else if (eType == "keyup" && keyCode !=32) {
            ship.xspeed = 0
        }

        if (keyCode == 32 && event.repeat!=true) {
            ship.shoot(projectiles)
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
        var stars = this.state.stars
        var powerups = this.state.powerups
        context.fillStyle = "black"
        context.fillRect(0,0,800,600)
        context.fillStyle = "white"
    

        //first, change positions of elements
        //player
        try {
            ship.move()
        } catch (e){
            //nothing
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
                createInvader(invaders,this.state.width,-500,0)
                i--
            }
        }

        //stars
        for (var i = 0; i < stars.length; i++) {
            stars[i].move()
            if (stars[i].y > this.state.height) {
                stars[i].x = randomX(this.state.width)
                stars[i].y = randomY(0,0)
            }
           
        }

        //powerups
        for (var i = 0; i < powerups.length; i++) {
            powerups[i].move()
        }

        //detect collision
        //enemis
        for (var i = 0; i < invaders.length; i++) {
            for (var j = 0; j < projectiles.length; j++) {
                if (detectCollision(invaders[i],projectiles[j])){
                    invaders.splice(i,1)
                    createInvader(invaders,this.state.width-100,-500,0)
                    projectiles.splice(j,1)
                }
            }

            if (detectCollision(invaders[i],ship)) {
                    ship.health -=20
                    console.log(ship.health) 
                
            }
            
        }
        //powerups
        for (var i = 0; i < powerups.length; i++) {
            if (detectCollision(ship,powerups[i])){
                if (powerups[i].type == "health"){
                    ship.health +=20
                } else if (powerups[i].type == "ammo upgrade" && ship.ammo < 2){
                    ship.ammo +=1
                }
                powerups.splice(i,1)

                console.log("POWERUP LOL")
           }            
        }

        //spawn powerups
        if ((Math.floor(Math.random()*100))>98) {
            powerups.push(new Powerup(randomX(this.state.width),10))
        }

        
        //rendering
        //background
        for (var i = 0; i < stars.length; i++) {
            stars[i].render(context)
        }
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
        //powerups
        for (var i = 0; i < powerups.length; i++) {
            powerups[i].render(context)
        }

    }
    render() {
        return(
           <canvas width={this.state.width} height={this.state.height}></canvas> 
        )
    }
}