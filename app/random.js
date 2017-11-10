//various functions which I can't fit anywhere else

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

    if(x2 > x1 && x2 < x1+(first.image.width*getSizeRatio()) && y2 > y1 && y2 < y1+(getSizeRatio()*first.image.height)) {
        return true 
    }  else {
       return false
    }
}


function degToRad(deg) {
    return deg * Math.PI/180
}

/*this function returns a number which is used to determine image scaling and object speed.
On smaller screens the enemies need to be smaller and move slower */
function getSizeRatio() {
    if (window.innerWidth <=480) {
        return 0.5
    } else if (window.innerWidth > 480 && window.innerWidth <=800) {
        return 0.5
    } else {
        return 1
    }
}

module.exports = {randomX,randomY,detectCollision,degToRad,getSizeRatio}