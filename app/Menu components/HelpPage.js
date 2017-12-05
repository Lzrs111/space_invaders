import React from "react"
import HelpBox from "./helpbox.js"

export default function HelpPage(props) {
    var content = props.content
    console.log("content")
    console.log(content)
    return(
        <div style={{height: "80%"}}>
        {content.map((value,index)=>{
            return(
                <HelpBox src={content[index][1]} content={content[index][0]}/>
            )
        }
        )}
        </div>
    )
}