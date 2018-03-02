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

    componentWillReceiveProps(nextProps){

        console.log(nextProps, 'hitting props')
        this.display(nextProps);
    }

    buyitem(itemid, cost, userGold) {
        if (userGold >= cost) {
            this.props.buy(itemid, cost, userGold)
            setTimeout(function () {
                window.location.reload()
            }, 1000)
        }else{
            return alert("You don't have enough gold, try again later")
        }
    }

    buyPotion(itemid, cost, userGold, userid, hp, mp){
        if (userGold >= cost) {
            this.props.buyPotion(itemid, cost, userGold)
            setTimeout(function () {
                window.location.reload()
            }, 500)
        }else{
            return alert("You don't have enough gold, try again later")
        }
    }

    handleChange = (event, index, value) => { 
            this.setState({ value });  
            this.display(this.props);
            }

    display(props) {

        console.log('hitting display', props.items)
        // console.log(this.props.items.sort(function (a, b) {
        //     return a.cost - b.cost
        // }))
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
                            <button className="buybutton" onClick={() => this.buyPotion(item.itemid,item.cost,this.props.user.gold,this.props.user.userid,this.props.user.hp,this.props.user.mp)}>buy</button>
                            <h4>{item.name}</h4>
                            <img src={item.image} />
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
                {console.log(this.props.user.inventory, item.itemid)}
                    {this.props.user.inventory.includes(Number(item.itemid)) ? <p></p>:<button className="buybutton" onClick={() => this.buyitem(item.itemid,item.cost,this.props.user.gold)}>buy</button>}
                    <h4>{item.name}</h4>
                    <img src={item.image} />
                    <p>Lvl: {item.lvlavailable}</p>
                    <p>Cost: ${item.cost}</p>
                    <p>{item.description}</p>
                </div>
            )}
        })


let armor = this.props.items.map(item => {
    if (item.bodlocation === "body" || item.bodlocation === "hat") {
        return (
            <div className={this.props.user.lvl >= item.lvlavailable ? "itemCard" : "noBuy"} key={item.itemid}>
                 {this.props.user.inventory.includes(Number(item.itemid)) ? <p></p>:<button className="buybutton" onClick={() => this.buyitem(item.itemid,item.cost,this.props.user.gold)}>buy</button>}
                <h4>{item.name}</h4>
                <img src={item.image} />
                <p>Lvl: {item.lvlavailable}</p>
                <p>Cost: ${item.cost}</p>
                <p>{item.description}</p>
            </div>
        )
    }
})
        return (
            <div className="shop-main">
                <Nav />
                <h1>Shop</h1>
                <div>
                    <DropDownMenu
                        value={this.state.value}
                        onChange={this.handleChange}
                        style={{ backgroundColor: "purple" }}
                    >
                        <MenuItem value={1} primaryText="Cost ^" />
                        <MenuItem value={2} primaryText="Cost v" />
                    </DropDownMenu>
                </div>
                <div className="Potions">
                    <h2>Potions</h2>
                    <div className="items">
                        {this.displayPotions()}
                    </div>
                </div>
                <div className="weapons">
                    <h2>Weapons</h2>
                    <div className="items">
                        {this.props.user.inventory && weapons}
                    </div>
                </div>
                <div className="armor">
                    <h2>Armor</h2>
                    <div className="items">
                        {armor}
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