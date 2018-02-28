import React, { Component } from 'react';
import Nav from '../nav/nav';
import { connect } from 'react-redux';
import { shop, buy, inventory } from '../../ducks/reducer';
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
        this.props.inventory()
    }

    buyitem(itemid, cost, userGold) {

        this.props.buy(itemid, cost, userGold)
        setTimeout(function(){
            window.location.reload()
        },500)
    }

    handleChange = (event, index, value) => {this.setState({value}), console.log(this.state.value)}

    displayWeapons() {
        let items = this.props.items.map(item => {
            if (item.bodlocation === "hand") {
                return (
                    <div className={this.props.user.lvl >= item.lvlavailable ? "itemCard" : "itemCard noBuy"} key={item.itemid}>
                    {/* {console.log(this.props.inventory.includes(item.itemid),this.props.inventory, item.itemid)} */}
                        {this.props.inventory.includes(item.itemid) ? <p>something</p>:<button className="buybutton" onClick={() => this.buyitem(item.itemid,item.cost,this.props.user.gold)}>buy</button>}
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
            if (item.bodlocation !== "hand") {
                return (
                    <div className={this.props.user.lvl >= item.lvlavailable ? "itemCard" : "noBuy"} key={item.itemid}>
                        <button className={this.props.inventory.includes(item.itemid) ? "buybutton": "noButton"} onClick={() => this.buyitem(item.itemid,item.cost,this.props.user.gold)}>buy</button>
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
        user: state.user,
        inventory: state.inventory
    }
}
export default connect(mapStateToProps, { shop, buy, inventory })(Shop)