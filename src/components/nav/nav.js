import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './nav.css';

export default class Nav extends Component {
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
            <div className="main-nav">
                <div className="navbar">
                    <div >
                        <img className="logo" src="http://clipartbarn.com/wp-content/uploads/2016/12/Tree-stick-clipart-3.png" alt="a stick" />
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
                    <div className={this.state.open ? "media-nav on" : "media-nav off"}>
                        <Link to='/dashboard'><span className="media-nav-link">Dashboard</span></Link>
                        <Link to='/inventory'><div className="media-nav-link">Inventory</div></Link>
                        <Link to='/shop'><div className="media-nav-link">Shop</div></Link>
                    </div>
                </div>
                <div className="main-header">

                </div>
            </div>
        )
    }
}