import React, { Component } from 'react';
import './home.css'
import { bounce, fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const styles = {
    fadeIn: {
        animation: 'x 3s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }
}




class Home extends Component {
    constructor() {
        super();
        this.state = {
            rainbowRight: false

        }
        this.RainbowRight = this.RainbowRight.bind(this)
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                rainbowRight: true
            })
        }, 2000)


    }

    RainbowRight() {
        this.setState({
            rainbowRight: true
        })
        console.log("changed", this.state.rainbowRight)
    }



    render() {
        console.log('rendering', this.state.rainbowRight)
        return (
            <div>
                <div className="bgImage"></div>
                <div className="content">

    <div class="cloud x1"></div>
	<div class="cloud x2"></div>
	<div class="cloud x3"></div>
	<div class="cloud x4"></div>
	<div class="cloud x5"></div>

                    {/* RAINBOW */}
                    <div>
                        <div className="Rainbow2" style={(this.state.rainbowRight) ? { width: '100vw', transition: '3s', opacity: '1' } : { width: '0', opacity: '0' }}></div>
                    </div>
                    {/* END RAINBOW */}
                    <div className="divButton">
                    <a href='http://localhost:3020/api/login'><button className="LoginButton">Login</button></a>
                    </div>
                    {/* <footer></footer> */}

                </div>
            </div>



        )
    }
}

export default Home;