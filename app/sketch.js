var invaders = [] 


function randomX() {
    return Math.floor((Math.random()*750))
}

function randomY() {
    return Math.floor(Math.random()*(-600))    
}


function preload() {
    // var img = loadImage('assets/PNG/enemies/enemyBlack1.png')
    }


function setup() {
    createCanvas(800, 600)
    background(51)
    for (var i = 0; i < 50; i++) {
       invaders.push(new Invader("govno",randomX(),randomY()))
    } 
    }


function draw() {
    for (var i = 0; i < invaders.length; i++) {
        invaders[i].move()
    }

    clear()
    background(51)


    for (var i = 0; i < invaders.length; i++) {
        invaders[i].draw()
    }

    
        }