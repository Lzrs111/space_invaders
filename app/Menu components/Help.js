import React from "react"


export default class Help extends React.Component {
    constructor(){
        super()
    }
    render() {
        return(
            <div>
                <div>
                    
                </div>
                <button className="menuButton" onClick={()=>{
                   this.props.renderChange(0)}}>
                    Back to main
                </button>
            </div>            
        )
    }
}