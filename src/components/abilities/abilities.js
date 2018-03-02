import React, { Component } from 'react';
import {connect} from 'react-redux';
import {burstOfFlames, alchemy, peoplesElbow, intimidatingGaze, stealth, pickpocket} from './abilityFns';
import axios from 'axios';

class Abilities extends Component {
    constructor() {
        super();

        this.state = {
            tempData: {}
        }
       
    }

    componentWillMount() {   
        axios.get('/api/getUserAbilities').then(res=>{
            console.log(res.data)
            this.setState({
                tempData : res.data
            })
        }
        )
    }

    useAbility(ability){
        
        let tree = {
            "burst of flames" : burstOfFlames(this.props.user, this.props.lists),
            "alchemy" : alchemy(this.props.user, this.props.lists),
            "pickpocket" : pickpocket(this.props.user, this.props.lists),
            "stealth" : stealth(this.props.user, this.props.lists),
            "The Peoples Elbow" : peoplesElbow(this.props.user, this.props.lists),
            "Intimidating Gaze" : intimidatingGaze(this.props.user, this.props.lists)
        }
        console.log(tree[ability]);
        let body = tree[ability];
        
        if (typeof(body)==='string'){
            return body
        }
        else {
            axios.put('/api/ability', body).then(res=>{
                return res.data;
            })
        }
    }

    render() {

        return (
            <div>
               <h1>Abilities</h1>
               {this.state.tempData.class && 
                    <div>
                        <button className="abilityBtn" onClick={ 
                            this.useAbility.bind(this,this.state.tempData.ability1.name)}>{this.state.tempData.ability1.name}</button>                  
                        <p>{this.state.tempData.ability1.description}</p>
                        <p>{this.state.tempData.ability1.manacost}</p>    
                    </div>
                }
               {this.state.tempData.class && 
                    <div>
                        <button className="abilityBtn" onClick={
                        this.useAbility.bind(this, this.state.tempData.ability2.name)}>{this.state.tempData.ability2.name}</button>                  
                        <p>{this.state.tempData.ability2.description}</p>
                        <p>{this.state.tempData.ability2.manacost}</p>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        lists: state.lists
    }
}
export default connect(mapStateToProps)(Abilities)