import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { getUser } from '../../ducks/reducer';
import Nav from '../nav/nav';

class Abilities extends Component {
    constructor() {
        super();

       
    }

    componentWillMount() {   
        this.props.getUser()   
      
    }

    useAbility(){
    }

    displayAbilities() {
        let {ability1, ability2, description} = this.props.user
        return (
                    <div>
                        <button className="abilityBtn" onClick={() => this.useAbility()}>{this.props.user.ability1}</button>                     
                        <p>{this.props.user.ability1.description}</p>
                    </div>
                )
    }
    

    render() {
        return (
            <div>
                <Nav />
               <h1>Abilities</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, { getUser })(Abilities)