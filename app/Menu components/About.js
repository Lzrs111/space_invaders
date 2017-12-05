import './about.css'
import React from "react"
import Heart from "../assets/png/ui/heartIcon.png"
import Github from "../assets/PNG/GitHub-Mark/PNG/Github-Mark-Light-32px.png"


export default class About extends React.Component {
    constructor(){
        super()
    }
    render() {
        //<img style={{verticalAlign: "middle"}} src={Github}></img>
        return(
            <div>
                <div className="textdiv">
                  <p>
                  Made with <img style={{verticalAlign: "middle"}} src={Heart}></img> by <a href="https://github.com/Lzrs111"> Mario Dragović</a> <br/><br/>    
                   All assets by <a href="https://www.kenney.nl">KenneyNL</a>    
                  </p>
                </div>
                <div style={{height:"10%"}}>
                    <button className="menuButton" style={{height: "100%",marginTop: "0"}} onClick={()=>{
                       this.props.renderChange(0)}}>
                        Back to main
                    </button>
                </div>
            </div>            
        )
    }
}