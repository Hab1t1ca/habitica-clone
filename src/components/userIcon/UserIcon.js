import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser, getInventory, getEquipped } from '../../ducks/reducer';
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
            xpPct: 100,

            temp: []
            

        }

        this.updateTemp = this.updateTemp.bind(this)

        this.healthPctFun = this.healthPctFun.bind(this)
        this.manaPctFun = this.manaPctFun.bind(this)
        this.xpPctFun = this.xpPctFun.bind(this)
    }

    componentWillMount() {
        this.props.getUser();
        this.props.getInventory();
        this.props.getEquipped();
    }

    componentDidMount(){
        setTimeout(()=>{
            this.updateTemp()
        }, 1000)
    }

    componentWillReceiveProps(nextProps){
        console.log('running next props', nextProps)
            this.healthPctFun()
            this.manaPctFun()
            this.xpPctFun()
            // this.updateTemp()
    }


    healthPctFun(){
        let{hp, maxhp} = this.props.user      
        var pct = (hp / maxhp) * 100;
        this.setState({
            healthPct: pct
        })        
    }
    manaPctFun(){
        let{mana, maxmana} = this.props.user;
        var pct = mana/maxmana * 100;

        this.setState({
            manaPct: pct
        })        
    }
    xpPctFun(){
        let{currentexp, nextexp} = this.props.user;
        var pct = currentexp/nextexp * 100;

        this.setState({
            xpPct: pct
        })        
    }

    updateTemp(){
        let temp = []
        let {equipped, inventory} = this.props
        console.log(equipped, inventory)
        for(let i = 0; i < equipped.length; i++){
            for(let k = 0; k < inventory.length;k++){
                if(inventory[k].itemid = equipped[i]){
                    temp.push(inventory[k])
                }
            }
        }
        this.setState({
            temp: temp
        })
    }

    addWeapon(thing){
        let hand = "";
        let body = "";
        let hat = "";
        let things = this.state.temp.map((item)=>{
            if(item.bodlocation === "hand"){
                hand = item.image

            }
            if(item.bodlocation === "body"){
                body = item.image
            }
            if(item.bodlocation === "hat"){
                hat = item.image
            }
        // switch (item.bodlocation) {
        //     case hand:
        //         image = item.image;
        //         break; 
        //     case body:
        //         image = item.image;
        //         break;
        //     case hat:
        //         image = item.image;
        //         break; 
        //     default: 
        //         text = "stuff";
        // }
        })
        if(thing === "hand"){
            return hand
        }
        if(thing === "body"){
            return body
        }
        if(thing === "hat"){
            return hat
        }
    }

    render() {
        console.log(this.props.user, 'render props')
        console.log(this.state.temp)
        return (

            <div className="mainHeader">
                <div className="avatarBox">

                <div className="Avatar">
                <img className="avatarWindow" src={this.props.user.avatar}/>
                <img className="stickmanInBox" src={stickman}/>
                <img className="WeaponRightHand" src={this.addWeapon("hand")}/>
                <img className="chestArmor" src={this.addWeapon("body")}/>
                <img className="hat" src={this.addWeapon("hat")}/>
                </div>


                </div>


                <div className="stats">
                    <br/>
                    <div className="Class">
                  
                    {this.props.user.class}
                    <br/>
                <div className="Golds">
                    <img src={gold} className="Gold"/>
                    {this.props.user.gold}
                </div>    

                    </div>

                    <br/>

                    <div className="mana"> 
                    <img src={heartIcon} className="manaPic"/>
                    Health {this.props.user.hp} / {this.props.user.maxhp}</div>
                    <div className="healthBarBorder">
                    <div className="healthBar" style={{width: `${this.state.healthPct}%`}}></div>
                    </div>

                    <div className="mana">  
                    <img src={mana} className="manaPic"/> 
                    Mana {this.props.user.mana} / {this.props.user.maxmana}</div>
                    <div className="manaBarBorder">
                    <div className="manaBar" style={{width: `${this.state.manaPct}%`}}></div>
                    </div>

                    <div className="mana"> 
                    <img src={star} className="starPic"/>
                    Xp {this.props.user.currentexp} / {this.props.user.nextexp}</div>
                    <div className="XpBarBorder">
                    <div className="XpBar" style={{width: `${this.state.xpPct}%`}}></div>
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
        inventory: state.inventory,
        equipped: state.equipped
    }
}

export default connect(mapStateToProps, { getUser, getInventory, getEquipped })(UserIcon)