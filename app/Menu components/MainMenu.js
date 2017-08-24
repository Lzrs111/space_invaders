import React from "react"


export default class MainMenu extends React.Component {
    constructor(){
        super()
    }
    componentDidMount() {
        this.startButton.addEventListener("click",this.props.start)
    }
    render() {
        var buttons = ["Settings","Help","About"]
        return(
            <div>
                <button ref={(start)=>{this.startButton = start}} className="menuButton">
                       Start game 
                </button>
                {buttons.map((value,index)=>{
                    return(
                    <button className="menuButton" onClick={()=>{
                        this.props.renderChange(index+1)}}>
                        {value}
                    </button>
                )})}   
            </div>
        )
    }
}