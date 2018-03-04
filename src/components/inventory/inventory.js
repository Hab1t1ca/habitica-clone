import React, { Component } from 'react';
import "./inventory.css";
import Nav from '../nav/nav';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { getInventory, equipItem, getEquipped} from '../../ducks/reducer';
import { connect } from 'react-redux';

class Inventory extends Component {

    componentDidMount(){
        this.props.getInventory()
        this.props.getEquipped()
    }

    equipItem(id){
        this.props.equipItem(id)
        setTimeout(()=> {
            window.location.reload()
        }, 1000)
    }

    render() {
        let inventory = this.props.inventory.map(item => {
                return (
                    <div className="itemCard" key={item.id}>
                    {this.props.equipped.includes(Number(item.itemid)) ? <button>Unequip</button>:<button className="buybutton" onClick={()=>equipItem(item.itemid)}>Equip</button>}
                    {console.log(this.props.equipped, item.itemid)}
                        <h4>{item.name}</h4>
                        <img src={item.image} />
                        <p>Lvl: {item.lvlavailable}</p>
                        <p>Cost: ${item.cost}</p>
                        <p>{item.description}</p>
                    </div>
                )}
            )
        return (
            <div>
                <Nav />
                <h1>Inventory</h1>

                <div className="items">
                    {inventory}
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
export default connect(mapStateToProps, { getInventory, equipItem, getEquipped })(Inventory)