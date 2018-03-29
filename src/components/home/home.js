import React, { Component } from 'react';
import './home.css';
import stick from "../nav/stick-512.png"
import { fadeIn, bounceInDown } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const styles = {
    bounceInDown: {
        animation: 'x 3s',
        animationName: Radium.keyframes(bounceInDown, 'bounceInDown')
    },
    fadeIn: {
        animation: 'x 7s',
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
    }



    render() {
        return (
            <div>
                <div className="bgImage"></div>
                <div className="content">

                    <div className="cloud x1"></div>
                    <div className="cloud x2"></div>
                    <div className="cloud x3"></div>
                    <div className="cloud x4"></div>
                    <div className="cloud x5"></div>

                    {/* RAINBOW */}
                    <div>
                        <div className="Rainbow2" style={(this.state.rainbowRight) ? { width: '100vw', transition: '3s', opacity: '1' } : { width: '0', opacity: '0' }}></div>
                    </div>
                    {/* END RAINBOW */}


                    <StyleRoot>
                        <div className="Flex">
                            <img src={stick} className="stickFront" style={styles.fadeIn} />
                        </div>
                        <div className="divButton" style={styles.bounceInDown}>

                            <a href='https://www.screencast.com/t/6VMpLfWEgQt' style={{ textDecoration: "none", color: "white" }}><div className="LoginButton">Video Walk-through</div></a>
                            <a href={process.env.REACT_APP_LOGIN} style={{ textDecoration: "none", color: "white" }}><div className="LoginButton">Login</div></a>


                        </div>
                    </StyleRoot>
                    {/* <footer></footer> */}

                </div>
            </div>



        )
    }
}

export default Home;