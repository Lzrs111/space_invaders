import createInvader from "./createInvader.js"
import React from "react"
import ReactDOM from "react-dom" 
import Invader from "./invader.js"
import Powerup from "./powerUp.js"
import Projectile from "./projectile.js"
import renderUI from "./renderUI.js"
import Ship from "./ship.js"
import Splash from "./splash.js"
import Star from "./star.js"
import {randomX,randomY,detectCollision} from "./random.js" 

export default class Canvas extends React.Component {
    constructor(props){
        super()
        this.splashes = []
        this.state = {
            frame:props.frame,
            gameOver: props.gameOver,
            invaders:[],
            ship:"",
            width:1400,
            height: 800,
            projectiles: [],
            stars: [],
            powerups: [],
            enemyProjectiles: []
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
        this.gameLoop(ctx)

    }
    componentDidUpdate() {
        var context = ReactDOM.findDOMNode(this).getContext('2d');
        if (!this.state.gameOver){
            this.gameLoop(context);
        } else {
            this.endLoop(context)
        }
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

        if (keyCode == 32 && event.repeat!=true && eType!="keyup") {
            ship.shoot(projectiles)
            console.log(ship.image.width,ship.image.height)
        } 

        /* this.setState({
            projectiles:projectiles,
            ship:ship
        }) */

    }
    gameLoop(context) {
        var invaders = this.state.invaders
        var ship = this.state.ship
        var projectiles = this.state.projectiles
        var stars = this.state.stars
        var powerups = this.state.powerups
        var enemyProjectiles = this.state.enemyProjectiles
        var gameOver = this.state.gameOver
        context.fillStyle = "black"
        context.fillRect(0,0,this.state.width,this.state.height)
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

        for (var i = 0; i < enemyProjectiles.length; i++) {
            enemyProjectiles[i].move()
            if (enemyProjectiles[i].y > this.state.height){
               enemyProjectiles.splice(i,1)
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


        //spawn powerups
        if ((Math.floor(Math.random()*100))>98) {
            powerups.push(new Powerup(randomX(this.state.width),10))
        }

        //enemy projectiles
        for (var i = 0; i < invaders.length; i++) {
            if (invaders[i].y >=0){
                if (invaders[i].shootFrame < 30){
                    invaders[i].shootFrame +=1
                } else {
                    invaders[i].shootFrame = 0
                    invaders[i].shoot(enemyProjectiles)
                }
            }
        }

         

        //detect collision
        //enemis
        for (var i = 0; i < invaders.length; i++) {
            for (var j = 0; j < projectiles.length; j++) {
                if (detectCollision(invaders[i],projectiles[j])){
                    invaders[i].health +=-25
                    this.splashes.push(new Splash(projectiles[j].x,projectiles[j].y,"player"))
                    projectiles.splice(j,1)
                    if (invaders[i].health <= 0){
                        invaders.splice(i,1)
                        createInvader(invaders,this.state.width-100,-500,0)
                    } 
                }
            }

            if (detectCollision(invaders[i],ship)) {
                    if (ship.shield){
                        ship.shield = false
                    } else {
                        ship.health -=20
                    }
                    invaders.splice(i,1)
                    createInvader(invaders,this.state.width-100,-500,0)
            }
        }

        for (var i = 0; i < enemyProjectiles.length; i++) {
            if (ship.shield) {
                if (detectCollision(ship.shield,enemyProjectiles[i])){
                    ship.shield.health +=-20
                    this.splashes.push(new Splash(enemyProjectiles[i].x,enemyProjectiles[i].y,"not player"))
                    enemyProjectiles.splice(i,1)
                    if (ship.shield.health <=0){
                        ship.shield = false
                    } else {
                    ship.shield.update()
                    }
                }
            }
            else if (detectCollision(ship,enemyProjectiles[i])){
                    ship.health +=-20
                    this.splashes.push(new Splash(enemyProjectiles[i].x,enemyProjectiles[i].y,"not player"))
                    enemyProjectiles.splice(i,1)
                }
            
        }

        if (ship.health <=0){
            ship.lives -=1
            ship.health = 100
            if (ship.lives==0){
                this.props.end()
            }
        }

        //powerups
        for (var i = 0; i < powerups.length; i++) {
            if (detectCollision(ship,powerups[i])){
                if (powerups[i].type == "health"){
                    ship.health +=20
                } else if (powerups[i].type == "ammo upgrade" && ship.ammo < 2){
                    ship.ammo +=1
                } else {
                    ship.shieldUp()
                }
                powerups.splice(i,1)
           }            
        }

        //splash lifecycle
        if (this.splashes.length > 0){
            for (var i = 0; i < this.splashes.length; i++) {
                this.splashes[i].lifespan+=1
                if (this.splashes[i].lifespan > 10){
                    this.splashes.splice(i,1)
                }
             }
        }

        
        //rendering
        //background
        for (var i = 0; i < stars.length; i++) {
            stars[i].render(context)
        }
        //UI
        renderUI(context,ship)
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
        for (var i = 0; i < enemyProjectiles.length; i++) {
            enemyProjectiles[i].render(context)
        }
        if (this.splashes.length > 0){
            for (var i = 0; i < this.splashes.length; i++) {
                this.splashes[i].render(context)
            }
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
    endLoop(context) {
        var stars = this.state.stars
        context.fillStyle = "black"
        context.fillRect(0,0,this.state.width,this.state.height)
        context.fillStyle = "white"
        for (var i = 0; i < stars.length; i++) {
            stars[i].render(context)
        }
    }
    render() {
        return(
           <canvas width={this.state.width} height={this.state.height}></canvas> 
        )
    }
}