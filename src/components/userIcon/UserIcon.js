import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';
import "./userIcon.css";
import stickman from '../dashboard/stickmanTemplateV2.png'

class UserIcon extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentWillMount() {
        this.props.getUser()
    }


    render() {
        console.log(this.props.user, 'render props')
        return (

            <div className="mainHeader">
                <div className="avatarBox">

                <img  className="avatarWindow" src={this.props.user.avatar}/>
                <img className="stickmanInBox" src={stickman}/>

                </div>


                <div className="stats">
                    <div className="Class">{this.props.user.class}</div>

                    <div className="health">HP: {this.props.user.hp}/{this.props.user.maxhp}</div>
                    <div className="healthBarBorder">
                    <div style={{width: `${this.props.user.hp}%`}} className="healthBar"></div>
                    </div>

                    <div className="mana">Mana: {this.props.user.mana}/{this.props.user.maxmana}</div>
                    <div className="manaBarBorder">
                    <div className="manaBar"></div>
                    </div>

                    <div className="Xp">Xp: {this.props.user.currentexp} / {this.props.user.nextexp}</div>
                    <div className="XpBarBorder">
                    <div className="XpBar"></div>
                    </div>


                </div>
            </div>


        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        avatar: state.avatar
    }
}

export default connect(mapStateToProps, { getUser })(UserIcon)