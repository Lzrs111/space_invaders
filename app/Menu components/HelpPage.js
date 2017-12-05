import React from "react"
import HelpBox from "./helpbox.js"

export default function HelpPage(props) {
    var content = props.content
    console.log("content")
    console.log(content)
    return(
        <div style={{height: "80%"}}>
        {content.map((value,index)=>{
            if (index == 3) {
                    return <HelpBox src={content[index][1]} content={content[index][0]} special={true}/> 
            //special property is here to determine if the HelpBox needs to have special styling (bottom border)
            } else {
                return(
                    <HelpBox src={content[index][1]} content={content[index][0]} special={false}/>
                )
            }
        }
        )}
        </div>
    )
}