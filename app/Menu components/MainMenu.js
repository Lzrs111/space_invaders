import React from "react"


export default class MainMenu extends React.Component {
    constructor(){
        super()
    }
    componentDidMount() {
        /*when user clicks/touches start button, record coords of click/touch and render ship at that X coord
        this is to enable full range of motion for the ship if the user is using a mouse */
        this.startButton.addEventListener("click",this.props.start)
        this.startButton.addEventListener("touchstart",this.props.start)
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