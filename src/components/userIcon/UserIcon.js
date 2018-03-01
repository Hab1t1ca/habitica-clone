import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';
import "./userIcon.css";
import stickman from './stickmanTemplateV3.png';
import gold from '../nav/Coins.png';
import mana from './mana_potion.png';
import heartIcon from './HeartIcon.svg.svg';
import star from './star.png';


class UserIcon extends Component {
    constructor() {
        super()
        this.state = {
            healthPct: 100,
            manaPct: 100,
            xpPct: 100

        }
        this.displayUser = this.displayUser.bind(this)
        this.healthPctFun = this.healthPctFun.bind(this)
        this.manaPctFun = this.manaPctFun.bind(this)
        this.xpPctFun = this.xpPctFun.bind(this)
    }

    componentWillMount() {
        this.props.getUser();

        setTimeout(() => {
            this.healthPctFun()
            this.manaPctFun()
            this.xpPctFun()
        }, 110)
    }

    // componentWillRecieveProps()) {
    //     console.log(nextProps, "string so we know what it is")
    //     this.healthPctFun()
    //     this.manaPctFun()
    //     this.xpPctFun()
    // }


    displayUser() {
        // let {user} = this.props
        console.log(this.props.user.hp, 'props')
        return (
            <div>
                {/* <h1>{user.hp}</h1> */}
            </div>
        )

    }

    healthPctFun() {
        let { hp, maxhp } = this.props.user
        var pct = (hp / maxhp) * 100;
        this.setState({
            healthPct: pct
        })
    }
    manaPctFun() {
        let { mana, maxmana } = this.props.user;
        var pct = mana / maxmana * 100;

        this.setState({
            manaPct: pct
        })
    }
    xpPctFun() {
        let { currentexp, nextexp } = this.props.user;
        var pct = currentexp / nextexp * 100;

        this.setState({
            xpPct: pct
        })
    }

    render() {
        console.log(this.props.user, 'render props')
        return (

            <div className="mainHeader">
                <div className="avatarBox">

                    <div className="Avatar">
                        <img className="avatarWindow" src={this.props.user.avatar} />
                        <img className="stickmanInBox" src={stickman} />
                        <img className="WeaponRightHand" src="http://res.cloudinary.com/rigrater/image/upload/a_355/v1519841832/EnergySword_sclzal.png" />
                        <img className="chestArmor" src="http://res.cloudinary.com/rigrater/image/upload/c_scale,w_30/v1519777195/policeVest.png" />
                        <img className="hat" src="http://res.cloudinary.com/rigrater/image/upload/c_scale,w_35/v1519806733/DevMountainHat_znua1u.png" />
                    </div>


                </div>


                <div className="stats">
                    <br />
                    <div className="Class">

                        {this.props.user.class}

                        <div className="Golds">
                            <img src={gold} className="Gold" />
                            {this.props.user.gold}
                        </div>

                    </div>

                    <br />

                    <div className="mana">
                        <img src={heartIcon} className="manaPic" />
                        Health {this.props.user.hp} / {this.props.user.maxhp}</div>
                    <div className="healthBarBorder">
                        <div className="healthBar" style={{ width: `${this.state.healthPct}%` }}></div>
                    </div>

                    <div className="mana">
                        <img src={mana} className="manaPic" />
                        Mana {this.props.user.mana} / {this.props.user.maxmana}</div>
                    <div className="manaBarBorder">
                        <div className="manaBar" style={{ width: `${this.state.manaPct}%` }}></div>
                    </div>

                    <div className="mana">
                        <img src={star} className="starPic" />
                        Xp {this.props.user.currentexp} / {this.props.user.nextexp}</div>
                    <div className="XpBarBorder">
                        <div className="XpBar" style={{ width: `${this.state.xpPct}%` }}></div>
                    </div>


                </div>
            </div>


        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        avatar: state.avatar,
        daily: state.daily,
        todo: state.todo
    }
}

export default connect(mapStateToProps, { getUser })(UserIcon)