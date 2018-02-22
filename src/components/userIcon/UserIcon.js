import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {userIcon} from '../../ducks/reducer';

class UserIcon extends Component{
    constructor(){
        super()
    }

    componentWillMount(){
        this.props.userIcon()
    }

    render(){
        return(
            <div>{JSON.stringify(this.props.user)}</div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect (mapStateToProps, {userIcon})(UserIcon)