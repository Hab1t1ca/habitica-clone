import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import UserIcon from '../userIcon/UserIcon';
import stick from "./stick-512.png"


class Nav extends Component {
    constructor() {
        super();

        this.state = {
            open: false
        }
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

                    <div className="logoText">Stick To It</div>

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
                    <div className={this.state.open ? "media-nav on" : "media-nav off"}>
                        <Link to='/dashboard' className="media-nav-link"><div>Dashboard</div></Link>
                        <Link to='/inventory' className="media-nav-link"><div >Inventory</div></Link>
                        <Link to='/shop' className="media-nav-link"><div >Shop</div></Link>
                    </div>
                </div>
                <div className="main-header">
                    <UserIcon />
                </div>
            </div>
        )
    }
}

function mapStateToProps() {
    return {
       
    }
}
export default connect(mapStateToProps, {  })(Nav)