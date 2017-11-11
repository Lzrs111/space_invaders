import BaseClass from "./baseClass.js"
import projectileSrc from "../assets/PNG/lasers/laserBlue05.png"
import enemyProjectileSrc from "../assets/PNG/lasers/laserRed05.png"
import {getSizeRatio} from "../random.js"

export default class Projectile extends BaseClass {
    constructor(x,y,source){
        if (source == "player"){
            super(x,y,-10,projectileSrc)
        } else {
            super(x,y,20*getSizeRatio()+5,enemyProjectileSrc)
        }
    }
}