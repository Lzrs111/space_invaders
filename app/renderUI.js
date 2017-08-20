import PlayerLife from "./assets/png/ui/playerLife1_blue.png"
import Number0 from "./assets/png/ui/numeral0.png"
import Number1 from "./assets/png/ui/numeral1.png"
import Number2 from "./assets/png/ui/numeral2.png"
import Number3 from "./assets/png/ui/numeral3.png"
import Number4 from "./assets/png/ui/numeral4.png"
import Number5 from "./assets/png/ui/numeral5.png"
import Number6 from "./assets/png/ui/numeral6.png"
import Number7 from "./assets/png/ui/numeral7.png"
import Number8 from "./assets/png/ui/numeral8.png"
import Number9 from "./assets/png/ui/numeral9.png"
import NumberX from "./assets/png/ui/numeralx.png"

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



export default function renderUI(context,ship) {
    var X = new Image()
    var health = new Image()
    var lifeIcon = new Image()

   lifeIcon.src = PlayerLife
   health.src = ship.health 
   X.src = NumberX

    
   //render lives
   for (var i = 10; i < ship.lives*35+10; i+=35) {
    context.drawImage(lifeIcon,i,10)
   }
}
