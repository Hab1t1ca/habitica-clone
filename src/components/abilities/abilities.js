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

    useAbility(user){

    }

    displayAbilities() {
        let {ability1, ability2} = this.props.user.class
        return (
                    <div>
                        <button className="abilityBtn" onClick={() => this.useAbility()}>{this.props.user.class.ability1}</button>                     
                        <p>description</p>
                    </div>
                )
    }
    

    render() {
        // {this.displayAbilities()}
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