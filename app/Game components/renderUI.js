import PlayerLife from "../assets/png/ui/playerLife1_blue.png"
import heartIcon from "../assets/png/ui/heartIcon.png"
import shieldIcon from "../assets/png/power-ups/shield-blue.png"
import Number0 from "../assets/png/ui/numeral0.png"
import Number1 from "../assets/png/ui/numeral1.png"
import Number2 from "../assets/png/ui/numeral2.png"
import Number3 from "../assets/png/ui/numeral3.png"
import Number4 from "../assets/png/ui/numeral4.png"
import Number5 from "../assets/png/ui/numeral5.png"
import Number6 from "../assets/png/ui/numeral6.png"
import Number7 from "../assets/png/ui/numeral7.png"
import Number8 from "../assets/png/ui/numeral8.png"
import Number9 from "../assets/png/ui/numeral9.png"
import NumberX from "../assets/png/ui/numeralx.png"

var numerals = {
    0: Number0,
    1: Number1,
    2: Number2,
    3: Number3,
    4: Number4,
    5: Number5,
    6: Number6,
    7: Number7,
    8: Number8,
    9: Number9,
    "X": NumberX,
}

//this function converts a number into images
function convertToHealth(number,array) {
    number = number.toString().split("")
    for (var i = 0; i < number.length; i++) {
        number[i] = parseInt(number[i])
        array[i] = numberImages[number[i]]
    }
}

    //variables used in UI
    var heart = new Image()
    var shield = new Image()
    var health = new Array(3) 
    var shieldHP = new Array(3)
    var lifeIcon = new Image()
    var numberImages = new Array(11)


    lifeIcon.src = PlayerLife
    heart.src = heartIcon
    shield.src = shieldIcon

    console.log(lifeIcon)

    for (var i = 0; i < Object.keys(numerals).length; i++) {
       numberImages[i] = new Image()
       numberImages[i].src = numerals[i]
    }

    

export default function renderUI(context,ship,width,height) {
    //render lives
    for (var i = 10; i < ship.lives*35+10; i+=35) {
        context.drawImage(lifeIcon,i,10)
    }
    
    //render HP
    try {
        context.drawImage(heart,width-225,10)
        convertToHealth(ship.health,health)
        var index = 0
        //determine whether or not to render the last number
        var len = (ship.health < 100) ? health.length - 1 : health.length
        for (var i = width-200; i < len*25+width-200; i+=25) {
            context.drawImage(health[index],i,10) 
            index++   
        }
    } catch(e) {
       //nothing
    }

    //render shield HP
    if (ship.shield){
        try {
            context.drawImage(shield,width-125,10)
            convertToHealth(ship.shield.health,shieldHP)
            var index = 0
            //determine whether or not to render the last number
            var len = (ship.shield.health < 100) ? shieldHP.length - 1 : shieldHP.length
            for (var i = width-100; i < len*25+width-100; i+=25) {
                context.drawImage(shieldHP[index],i,10) 
                index++   
            }
        } catch(e) {
           //nothing
        }
    }

}
