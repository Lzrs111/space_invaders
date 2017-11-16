import React from "react"
import './helpbox.css'

export default function HelpBox(props) {
    return (
        <div style={{display:"block",height: "25%"}}>
            <div className="flexbox">
                <div className="imageBox">
                    <img src={props.src}></img>
                </div>                
                <div className="textBox">
                    {props.content}
                </div>
            </div>
        </div>        
    )
}