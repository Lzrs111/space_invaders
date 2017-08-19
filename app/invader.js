import BaseClass from "./baseClass.js"
import InvaderImage1 from "./assets/PNG/Enemies/enemyBlack3.png"
import InvaderImage2 from "./assets/PNG/Enemies/enemyBlue2.png"
import InvaderImage3 from "./assets/PNG/Enemies/enemyGreen1.png"
import Projectile from "./projectile.js"

var stats = {
    //num : [speed,health,source]
    0:[5,200,InvaderImage1],
    1:[7,100,InvaderImage2],
    2:[2,300,InvaderImage3]
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
    }
    shoot(array) {
        array.push(new Projectile(this.x,this.y,"not player"))
    }
}