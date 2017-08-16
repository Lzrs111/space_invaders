//various functions

function randomX(higher) {
    return Math.floor((Math.random()*higher))
}

function randomY(min,max) {
    return Math.floor((Math.random()*(max))+(min))    
}

function detectCollision(first,second) {
    var x1 = first.x
    var x2 = second.x
    var y1 = first.y
    var y2 = second.y
                     //invader width            //invader height
    if(x2 > x1 && x2 < x1+50 && y2 > y1 && y2 < y1+84) {
        return true 
    }  else {
       return false
    }
}


module.exports = {randomX,randomY,detectCollision}