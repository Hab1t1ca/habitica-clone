import React, { Component } from 'react';
import Nav from '../nav/nav';
import { connect } from 'react-redux';
import { shop, buy, buyPotion, getInventory } from '../../ducks/reducer';
import "./shop.css";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class Shop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 1,
            stuff: [],
            blowfish: false
        }
    }

    componentDidMount() {
        this.props.shop()
        this.props.getInventory()
    }

    componentWillReceiveProps(nextProps) {
        this.display(nextProps);
    }

    buyitem(itemid, cost, userGold) {
        if (userGold >= cost) {
            this.props.buy(itemid, cost, userGold)
            setTimeout(function () {
                window.location.reload()
            }, 1000)
        } else {
            return alert("You don't have enough gold, try again later")
        }
    }

    buyPotion(itemid, cost, userGold, hp, mp, maxhp, maxmana) {
        if (userGold >= cost) {
            this.props.buyPotion(itemid, cost, userGold, hp, mp, maxhp, maxmana)
            setTimeout(function () {
                window.location.reload()
            }, 1000)
        } else {
            return alert("You don't have enough gold, try again later")
        }
    }

    handleChange = (event, index, value) => {
        this.setState({ value });
        this.display(this.props);
    }

    display(props) {

        if (this.state.value === 1) {
            let stuff = []
            stuff.push(...props.items.sort(function (a, b) {
                return a.cost - b.cost
            }))

            // console.log('stuff', stuff)
            this.setState({
                stuff: stuff
            })
        }
        if (this.state.value === 2) {
            let stuff = []
            stuff.push(...props.items.sort(function (a, b) {
                return a.cost - b.cost
            }).reverse())

            this.setState({
                stuff: stuff
            })
        }
    }

    displayPotions() {
        let items = this.props.items.map(item => {
            if (item.bodlocation === "potion") {
                return (
                    <div className="itemCard" key={item.itemid}>
                        <button className="buybutton" onClick={() => this.buyPotion(item.itemid, item.cost, this.props.user.gold, this.props.user.hp, this.props.user.mana, this.props.user.maxhp, this.props.user.maxmana)}>buy</button>
                        <h4>{item.name}</h4>
                        <img className="itemImage" src={item.image} />
                        <p>Lvl: {item.lvlavailable}</p>
                        <p>Cost: ${item.cost}</p>
                        <p>{item.description}</p>
                    </div>
                )
            }
        })
        return items
    }


    render() {

        let weapons = this.state.stuff.map(item => {
            // console.log('getting item', item)//we are getting the correct item from state
            if (item.bodlocation === "hand") {
                return (
                    <div className={this.props.user.lvl >= item.lvlavailable ? "itemCard" : "itemCard noBuy"} key={item.itemid}>
                        {(item.lvlavailable > this.props.user.lvl) || (this.props.user.inventory.includes(Number(item.itemid))) ? <p></p> : <button className="buybutton" onClick={() => this.buyitem(item.itemid, item.cost, this.props.user.gold)}>buy</button>}
                        <h4>{item.name}</h4>
                        <img className="itemImage" src={item.preview} />
                        <p>Lvl: {item.lvlavailable}</p>
                        <p>Cost: ${item.cost}</p>
                        <p>{item.description}</p>
                    </div>
                )
            }
        })


        let armor = this.props.items.map(item => {
            if (item.bodlocation === "body" || item.bodlocation === "hat") {
                return (
                    <div className={this.props.user.lvl >= item.lvlavailable ? "itemCard" : "noBuy"} key={item.itemid}>
                        <h4>{item.name}</h4>
                        {(item.lvlavailable > this.props.user.lvl) || (this.props.user.inventory.includes(Number(item.itemid))) ? <p></p> : <button className="buybutton" onClick={() => this.buyitem(item.itemid, item.cost, this.props.user.gold)}>buy</button>}
                        <img className="itemImage" src={item.preview} />
                        <p>Lvl: {item.lvlavailable}</p>
                        <p>Cost: ${item.cost}</p>
                        <p>{item.description}</p>
                    </div>
                )
            }
        })
        return (
            <div className="shopCont">
                <Nav />
                <div className="shopHeader">
                <h1>Shop</h1>
                    <DropDownMenu
                        value={this.state.value}
                        onChange={this.handleChange}
                        style={{ fontSize:".2em",backgroundColor: "white",width: "110px", height: "40px", margin: "10px 0 0 20px", boxShadow: "0 2px 2px 0 rgb(168, 168, 168)" }}

                    >
                        <MenuItem value={1} primaryText="Cost ^" />
                        <MenuItem value={2} primaryText="Cost v" />
                    </DropDownMenu>
                </div>
                <div className="shop-main">



                    <h2 className="itemtitle">Potions</h2>
                    <div className="items">
                        {this.displayPotions()}
                    </div>


                    <h2 className="itemtitle">Weapons</h2>
                    <div className="items">
                        {this.props.user.inventory && weapons}
                    </div>


                    <h2 className="itemtitle" >Armor</h2>
                    <div className="items">
                        {this.props.user.inventory && armor}
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
export default connect(mapStateToProps, { shop, buy, buyPotion, getInventory })(Shop)