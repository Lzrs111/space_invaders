import BaseClass from "./baseClass.js"
import projectileSrc from "./assets/PNG/lasers/laserGreen04.png"

export default class Projectile extends BaseClass {
    constructor(x,y){
        super(x,y,-10,projectileSrc)
    }
}