//various functions

function randomX(higher) {
    return Math.floor((Math.random()*higher))
}

function randomY() {
    return Math.floor(Math.random()*-100)    
}

function detectCollision(first,second) {
    console.log("lol")
}


module.exports = {randomX,randomY}