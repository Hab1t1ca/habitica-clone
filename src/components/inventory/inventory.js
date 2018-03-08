import React, { Component } from 'react';
import "./inventory.css";
import Nav from '../nav/nav';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { getInventory, equipItem, getEquipped, unequipItem} from '../../ducks/reducer';
import { connect } from 'react-redux';

class Inventory extends Component {

    componentDidMount(){
        this.props.getInventory()
        this.props.getEquipped()
    }

    equipItem(id){
        this.props.equipItem(id);
        window.location.reload();
    }

    unequipItem(id){
            this.props.unequipItem(id);
            window.location.reload();
    }

    render() {
        let inventory = this.props.inventory.map(item => {
            console.log(this.props.equipped)
                return (
                    <div className="itemCard" key={item.id}>
                    {this.props.equipped.includes(Number(item.itemid)) ? <button className="buybutton" onClick={()=>this.unequipItem(item.itemid)}>Unequip</button>:<button className="buybutton" onClick={()=>this.equipItem(item.itemid)}>Equip</button>}
                        <h4>{item.name}</h4>
                        <img className="itemImage" src={item.preview} />
                        <p>Lvl: {item.lvlavailable}</p>
                        <p>Cost: ${item.cost}</p>
                        <p>{item.description}</p>
                    </div>
                )}
            )
        return (
            <div>
                <Nav />
                <div className="shop-main">
                <h1 className="itemtitle">Inventory</h1>

                <div className="items">
                    {inventory}
                </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        inventory: state.inventory,
        equipped: state.equipped
    }
}
export default connect(mapStateToProps, { getInventory, equipItem, getEquipped, unequipItem })(Inventory)