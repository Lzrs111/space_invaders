import './about.css'
import React from "react"
import Heart from "../assets/png/ui/heartIcon.png"
import Github from "../assets/GitHub-Mark/PNG/Github-Mark-32px.png"


export default class About extends React.Component {
    constructor(){
        super()
    }
    render() {
        return(
            <div>
                <div>
                  <p>
                  Made with <img src={Heart}></img> by Mario Dragović <a href="https://github.com/Lzrs111"><img src={Github}></img></a>    
                  </p>
                  <p>
                   All assets by <a href="https://www.kenney.nl">KenneyNL</a>    
                  </p>
                </div>
                <button className="menuButton" onClick={()=>{
                   this.props.renderChange(0)}}>
                    Back to main
                </button>
            </div>            
        )
    }
}