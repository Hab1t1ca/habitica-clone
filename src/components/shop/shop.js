import React, { Component } from 'react';
import Nav from '../nav/nav';
import './shop.css';
import { connect } from 'react-redux';
import { shop } from '../../ducks/reducer';

class Shop extends Component {

    componentDidMount() {
        this.props.shop()
    }

    displayItems() {
        let items = this.props.items.map(item => {
            return (
                <div className="itemCard" key={item.itemid}>
                    <h4>{item.name}</h4>
                    <img src={item.image} />
                    <p>Lvl: {item.lvlavailable}</p>
                    <p>Cost: ${item.cost}</p>
                    <p>{item.description}</p>
                </div>
            )
        })
        return items
    }

    render() {
        console.log(this.props.items)
        return (
            <div className="shop-main">
                <Nav />
                <h1>Shop</h1>
                <div>
                    <input />
                </div>
                <div className="weapons">
                    <h2>Weapons</h2>
                    <div className="items">
                        <div className="itemCard"></div>
                        <div className="itemCard"></div>
                        <div className="itemCard"></div>
                        <div className="itemCard"></div>
                        {this.displayItems()}
                    </div>
                </div>
                <div className="armor">
                    <h2>Armor</h2>
                    <div className="items">
                        <div className="itemCard"></div>
                        <div className="itemCard"></div>
                        <div className="itemCard"></div>
                        <div className="itemCard"></div>
                        <div className="itemCard"></div>
                        <div className="itemCard"></div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        items: state.shop
    }
}
export default connect(mapStateToProps, { shop })(Shop)