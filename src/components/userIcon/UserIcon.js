import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';
import "./userIcon.css";

class UserIcon extends Component {
    constructor() {
        super()
        this.state = {

        }
        this.displayUser = this.displayUser.bind(this)
    }

    componentWillMount() {
        this.props.getUser()
    }

    displayUser() {
        // let {user} = this.props
        console.log(this.props.user.hp, 'props')
        return (
            <div>
                {/* <h1>{user.hp}</h1> */}
            </div>
        )

    }





    render() {
        console.log(this.props.user, 'render props')
        return (

            <div className="mainHeader">
                <div className="avatarBox">box</div>


                <div className="stats">
                    <div className="Class">Class</div>

                    <div className="health">HP</div>
                    <div className="healthBarBorder">
                    <div style={{width: `${this.props.user.hp}%`}} className="healthBar"></div>
                    </div>

                    <div className="mana">Mana</div>
                    <div className="manaBarBorder">
                    <div className="manaBar"></div>
                    </div>

                    <div className="Xp">Xp</div>
                    <div className="XpBarBorder">
                    <div className="XpBar"></div>
                    </div>


                </div>

                {/* // <div>{this.displayUser()}</div> */}
            </div>


        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUser })(UserIcon)