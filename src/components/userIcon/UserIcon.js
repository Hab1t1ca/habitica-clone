import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer';
import "./userIcon.css";

class UserIcon extends Component{
    constructor(){
        super()

        this.displayUser = this.displayUser.bind(this)
    }

    componentWillMount(){
        this.props.getUser()
    }

    displayUser(){
        // let {user} = this.props
        console.log(this.props.user.hp, 'props')
            return(
                <div>
                    {/* <h1>{user.hp}</h1> */}
                </div>
            )
            
        }

    render(){
        console.log(this.props.user, 'render props')
        return(
            <div>{this.displayUser()}</div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect (mapStateToProps, {getUser})(UserIcon)