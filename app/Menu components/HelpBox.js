import React from "react"
import './helpbox.css'

export default function HelpBox(props) {
    //determine bottom border
    var style = (props.special)? {borderBottom: "solid white 3px"} : {borderBottom:"none"} 
    return (
        <div style={{display:"block",height: "25%"}}>
            <div className="flexbox">
                <div className="imageBox" style = {style}>
                    <img src={props.src}></img>
                </div>                
                <div className="textBox" style={style}>
                    {props.content}
                </div>
            </div>
        </div>        
    )
}