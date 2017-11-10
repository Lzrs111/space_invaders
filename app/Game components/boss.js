import BaseClass from './baseClass.js'
import ProjectilePlus from "./projectileplus.js"

//todo import boss image from file
export default class Boss extends BaseClass {
    constructor(width) {
        super(width/2,-200,10,bossImage) 

        this.shootFrames = 0
        this.health = 500
        this.turretAttackSpeed = 30
        this.spreadAttackSpeed = 60
    }

    shoot(array) {
        this.turretShoot(array)
        this.spreadShoot(array)
    }

    turretShoot(array) {






    }

    spreadShoot(array) {



    }


    render(context, target) {
        this.renderTurrets(context,target)
        this.renderBase(context)
    }

    renderTurrets(context,target) {


    }

    renderBase(context) {


    }

}