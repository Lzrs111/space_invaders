import createInvader from "./createInvader.js"
import React from "react"
import ReactDOM from "react-dom" 
import Invader from "./invader.js"
import Powerup from "./powerUp.js"
import Projectile from "./projectile.js"
import renderUI from "./renderUI.js"
import Ship from "./ship.js"
import Splash from "./splash.js"
import Star from "../star.js"
import {randomX,randomY,detectCollision} from "../random.js" 

//global vars used for touch and mouse events, to store coords of previous touch/click.
var tx = 0 //touch x 
var ty = 0 //touch y

export default class GameCanvas extends React.Component {
    constructor(props){
        super()
        this.mx = props.mouseCoords[0]//mouse x
        this.my = props.mouseCoords[1] // mousey
        this.splashes = []
        this.state = {
            frame:props.frame,
            invaders:[],
            ship:"",
            width: window.innerWidth,
            height: window.innerHeight,
            projectiles: [],
            stars: [],
            powerups: [],
            enemyProjectiles: [],
            }
        
        //bind event methods
        this.keyboardEvents = this.keyboardEvents.bind(this)
        this.touchEvents = this.touchEvents.bind(this)
        this.mouseEvents = this.mouseEvents.bind(this)
    }

    //component lifecycle methods
    componentDidMount() {
        var ctx = ReactDOM.findDOMNode(this).getContext("2d")
        //setup
        var ship = new Ship(this.props.mouseCoords[0],this.state.height-100,this.props.ship)
        var invaders = this.state.invaders
        var stars = this.state.stars

        //create invaders
        for (var i = 0; i < 20; i++) {
            createInvader(invaders,this.state.width-100,-500,0)
        }


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
        document.addEventListener("keydown",this.keyboardEvents)
        document.addEventListener("keyup",this.keyboardEvents)
        document.addEventListener("touchstart",this.touchEvents,{passive: false})
        document.addEventListener("touchmove",this.touchEvents)
        document.addEventListener("touchend",this.touchEvents)
        document.addEventListener("mousedown",this.mouseEvents)
        document.addEventListener("mousemove",this.mouseEvents)
        document.addEventListener("mouseup",this.mouseEvents)
        
    }
    componentDidUpdate() {
        var context = ReactDOM.findDOMNode(this).getContext('2d');
        this.gameLoop(context);
    }

    //remove touch event listeners
    componentWillUnmount() {
        document.removeEventListener("touchstart",this.touchEvents)
        document.removeEventListener("touchmove",this.touchEvents)
    }


    //component event functions
    keyboardEvents(event) {
        var keyCode = event.keyCode
        var eType = event.type
        var ship = this.state.ship
        var projectiles = this.state.projectiles
        var invaders = this.state.invaders
        var test = event.changedTouches


        if (eType == "keydown" && event.repeat !=true) {
            switch (keyCode) {
                case 37:
                    ship.xspeed = -5
                    break;
                case 39:
                    ship.xspeed = 5
                    break;
                case 38:
                    for (var i = 0; i < invaders.length; i++) {
                        invaders[i].speed = 0
                    }
                    break;
                case 32:
                    ship.shooting = true
                    ship.y+=5
                    ship.shootFrames = ship.attackSpeed
                    ship.shoot(projectiles)
                    break;
            } 
        }  else if (eType == "keyup" && keyCode !=32) {
            ship.xspeed = 0
        }  else if (eType == "keyup" && keyCode == 32) {
            ship.shooting = false
            ship.shootFrames = 0
            ship.y+=-5
        }



        /* this.setState({
            projectiles:projectiles,
            ship:ship
        }) */

    }
    touchEvents(event) {
        var eType = event.type
        var ship = this.state.ship
        var projectiles = this.state.projectiles
        var invaders = this.state.invaders
        var touches = event.changedTouches
    

        if (eType=="touchstart") {
            event.preventDefault()
            ship.shootFrames= ship.attackSpeed
            ship.shooting = true
            ship.shoot(projectiles)
            ty = touches.item(0).screenY
            tx = touches.item(0).screenX
        }
        if (eType == "touchmove"){
            var deltaX = (tx - touches.item(0).screenX)
            tx = touches.item(0).screenX
            ship.x -=deltaX
            if (ship.shield) {
                ship.shield.x-=deltaX
            }
        }
        if (eType == "touchend"){
            ship.shooting = false
            ship.shootFrames = 0
        }
    }
    mouseEvents(event) {
        var ship = this.state.ship
        var projectiles = this.state.projectiles
        var invaders = this.state.invaders

        if (event.type == "mousedown" && !event.repeat) {
            ship.shootFrames= ship.attackSpeed
            ship.shooting = true
            ship.y+=5
            ship.shoot(projectiles)
            this.mx = event.screenX
            this.my = event.screenY
        }
        if (event.type == "mousemove"){
            var deltaX = this.mx - event.screenX
            this.mx = event.screenX 
            ship.x -= deltaX
            if (ship.shield) {
                ship.shield.x-=deltaX
            }
        }
        if (event.type =="mouseup"){
            ship.shooting = false
            ship.shootFrames = 0
            ship.y+=-5
            
        }


    }

    //loops
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

         //start shooting animations
        for (var i = 0; i < invaders.length; i++) {
            if (invaders[i].y >=-200){
                invaders[i].shootFrame++
                invaders[i].shoot(enemyProjectiles)
                }
            }
        

        if (ship.shooting){
            ship.shootFrames+=1
            ship.shoot(projectiles)
        }

         

        //detect collision
        //enemies
        for (var i = 0; i < invaders.length; i++) {
            for (var j = 0; j < projectiles.length; j++) {
                if (detectCollision(invaders[i],projectiles[j])){
                    invaders[i].health +=-50
                    this.splashes.push(new Splash(projectiles[j].x,projectiles[j].y,"player"))
                    invaders[i].y-=5
                    projectiles.splice(j,1)
                    if (invaders[i].health <= 0){
                        invaders.splice(i,1)
                        createInvader(invaders,this.state.width-100,-500,0)
                    } 
                }
            }

            //enemies with player
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
        //enemy projectiles with player
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
        //check player health after possible collision
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
                ship.pickup(powerups[i])
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
        renderUI(context,ship,this.state.width,this.state.height)
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
            if (invaders[i].type == "turret") {
                invaders[i].render(context,ship)
            } else {
                invaders[i].render(context) 
            }
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