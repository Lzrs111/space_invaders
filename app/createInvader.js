import Invader from "./invader.js"
import Turret from "./turret.js"
import {randomX,randomY} from "./random.js"


export default function createInvader(array,xwidth,ymin,ymax) {
    // create random coords
    var invaderX = randomX(xwidth)
    var invaderY = randomY(ymin,ymax)

    /*if there are already created invaders, check if our newly created x coord clashes with already created xcoords
    if there is no clashing, create a new invader, otherwise generate new coords until there is no clashing*/
    if (array.length > 0) {
        for (var i = 0; i < array.length; i++) {
           while (compareNumbers(array[i].x,invaderX)==true) {
                invaderX = randomX(xwidth)
           } 
        }
        array.push(new Turret(invaderX,invaderY))
    } else {
        array.push(new Turret(invaderX,invaderY))
    }
    
}

function compareNumbers(numberOne,numberTwo) {
    if (numberOne == numberTwo || (numberTwo > numberOne-120 && numberTwo < numberOne + 120)){
        return true
    }
    return false
}
