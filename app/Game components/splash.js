import BaseClass from "./baseClass.js"
import SplashPlayer from "../assets/png/lasers/laserBlue08.png"
import SplashEnemy from "../assets/png/lasers/laserRed08.png"


export default class Splash extends BaseClass {
    constructor(x,y,source) {
        var src = (source == "player") ? SplashPlayer : SplashEnemy
        super(x,y,0,src)
        this.lifespan = 0
    }
}