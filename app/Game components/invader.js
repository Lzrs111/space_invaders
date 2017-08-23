import BaseClass from "./baseClass.js"
import InvaderImage1 from "../assets/PNG/Enemies/enemyBlack3.png"
import InvaderImage2 from "../assets/PNG/Enemies/enemyBlue2.png"
import InvaderImage3 from "../assets/PNG/Enemies/enemyGreen1.png"
import Projectile from "./projectile.js"

var stats = {
    //num : [speed,health,source,[x coordinates to render projectiles],spawn chance]
    0:[5,200,InvaderImage1,[18,50,85],80],
    1:[7,100,InvaderImage2,[32,69],10],
    2:[4,250,InvaderImage3,[32,62],10]
}


export default class Invader extends BaseClass {
    constructor(x,y){

        //generate random invader,pass relevant stats to base class
        var number = Math.floor(Math.random()*3)
        var invader = stats[number]
        var speed = invader[0]
        var health = invader[1]
        var imagesrc = invader[2] 

        super(x,y,speed,imagesrc)
        
        this.health = health 
        this.status = 0
        this.shootFrame = 0
        this.shootCoords = invader[3]
    }
    shoot(array) {
        for (var i = 0; i < this.shootCoords.length; i++) {
            array.push(new Projectile(this.x + this.shootCoords[i],this.y + this.image.height,"not player"))
        }
    }
}