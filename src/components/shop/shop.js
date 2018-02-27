import React, { Component } from 'react';
import Nav from '../nav/nav';
import { connect } from 'react-redux';
import { shop, buy } from '../../ducks/reducer';
import "./shop.css";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class Shop extends Component {
    constructor(){
        super();

        this.state = {
            value: 1
        }
    }

    componentDidMount() {
        this.props.shop()
    }

    buyitem(thing) {
        this.props.buy(thing)
    }

    handleChange = (event, index, value) => {this.setState({value}), console.log(this.state.value)}

    displayWeapons() {
        let items = this.props.items.map(item => {
            if (item.bodlocation !== "body") {
                return (
                    <div className={this.props.user.lvl >= item.lvlavailable ? "itemCard" : "noBuy"} key={item.itemid}>
                        <button className={this.props.user.lvl >= item.lvlavailable ? "buybutton": "noBuy"} onClick={() => this.buyitem(item.itemid)}>buy</button>
                        <h4>{item.name}</h4>
                        <img src={item.image} />
                        <p>Lvl: {item.lvlavailable}</p>
                        <p>Cost: ${item.cost}</p>
                        <p>{item.description}</p>
                    </div>
                )
            }
        })

        if(this.state.value === 1){
            return items.sort(function(a,b){
                return a.cost - b.cost
            }).reverse()
        }
        if(this.state.value === 2){
            return items.sort(function(a,b){
                return a.cost - b.cost
            })
        }
        return items
    }

    displayArmor() {
        let items = this.props.items.map(item => {
            if (item.bodlocation === "body") {
                return (
                    <div className={this.props.user.lvl >= item.lvlavailable ? "itemCard" : "noBuy"} key={item.itemid}>
                        <button className={this.props.user.lvl >= item.lvlavailable ? "buybutton": "noBuy"} onClick={() => this.buyitem(item.itemid)}>buy</button>
                        <h4>{item.name}</h4>
                        <img src={item.image} />
                        <p>Lvl: {item.lvlavailable}</p>
                        <p>Cost: ${item.cost}</p>
                        <p>{item.description}</p>
                    </div>
                )
            }
        })

        if(this.state.value === 1){
            return items.sort(function(a,b){
                return a.cost - b.cost
            }).reverse()
        }
        if(this.state.value === 2){
            return items.sort(function(a,b){
                return a.cost - b.cost
            })
        }
        return items
    }

    render() {
        return (
            <div className="shop-main">
                <Nav />
                <h1>Shop</h1>
                <div>
                    <DropDownMenu
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={{backgroundColor : "purple"}}
                        >
                        <MenuItem value={1} primaryText="Cost ^" />
                        <MenuItem value={2} primaryText="Cost v" />
                    </DropDownMenu>
                </div>
                <div className="weapons">
                    <h2>Weapons</h2>
                    <div className="items">
                        {this.displayWeapons()}
                    </div>
                </div>
                <div className="armor">
                    <h2>Armor</h2>
                    <div className="items">
                        {this.displayArmor()}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        items: state.shop,
        user: state.user
    }
}
export default connect(mapStateToProps, { shop, buy })(Shop)