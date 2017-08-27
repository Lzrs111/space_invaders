import React from "react"   
import ReactDOM from "react-dom" 
import MenuCanvas from "./MenuCanvas"
import MainMenu from "./MainMenu.js"
import Settings from "./Settings.js"
import Help from "./Help.js"
import About from "./About.js"
import "./menu.css"

export default class Menu extends React.Component {
    constructor(props){
        super()
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            render: 0
            }
        this.renderChange = this.renderChange.bind(this)
        this.renderMenu = this.renderMenu.bind(this)
        
        
    }
    renderChange(num) {
        this.setState({
            render: num 
        })
    }
    renderMenu(num) {
        switch (num) {
            case 0:
                return <MainMenu start={this.props.start} renderChange={this.renderChange}/>
                break;
        
            case 1:
                return <Settings renderChange={this.renderChange} switch={this.props.switch}/>
                break;

            case 2:
                return <Help renderChange={this.renderChange}/>
                break;
            case 3:
                return <About renderChange={this.renderChange}/>
                break;
        }
    }
    render() {
        let titles = ["Generic space shooter","Customize ship","Help","About"]
        return(
            <div className="mobile">
                <div className = "menu">
                    <div className="title">
                       {titles[this.state.render]} 
                    </div>
                    {this.renderMenu(this.state.render)}
                </div>
                {(window.innerWidth > 480) ? <MenuCanvas/> : ""}
            </div>
        )
    }
}