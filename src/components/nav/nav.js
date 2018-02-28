import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import UserIcon from '../userIcon/UserIcon';
import { getUser } from '../../ducks/reducer';
import stick from "./stick-512.png"
import "./nav.css";
import gold from './Coins.png'


class Nav extends Component {
    constructor() {
        super();

        this.state = {
            open: false
        }
    }

    componentWillMount() {
        this.props.getUser()
    }

    openmenu() {
        if (!this.state.open) {
            this.setState({
                open: true
            })
        } else {
            this.setState({
                open: false
            })
        }
    }

    render() {
        return (
            <div>
                <div className="navbar">


                    <div>
                        <img className="logo" src={stick} alt="a stick" />
                    </div>


                    <div className="NavBarInfo">
                        <p className="logoText">{this.props.user.name}</p>
                        <p className="Level">Lvl: {this.props.user.lvl}</p>
                    </div>

                

                    <Link to='/dashboard' className="nav-link"><div >Dashboard</div></Link>
                    <Link to='/inventory' className="nav-link"><div >Inventory</div></Link>
                    <Link to='/shop' className="nav-link"><div >Shop</div></Link>
                    
                

                    <div className="hammy"
                        onClick={() => this.openmenu()}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                
                </div>

                
                <div>
                    <div className={this.state.open ? "media-nav mediaNavOn" : "media-nav mediaNavOff"}>
                        <Link to='/dashboard' className="media-nav-link"><p>Dashboard</p></Link>
                        <Link to='/inventory' className="media-nav-link"><p>Inventory</p></Link>
                        <Link to='/shop' className="media-nav-link"><p>Shop</p></Link>
                        <a href ="http://localhost:3020/api/logout" className="media-nav-link">Logout</a>

                    </div>
                </div>
                    <UserIcon />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, { getUser })(Nav)