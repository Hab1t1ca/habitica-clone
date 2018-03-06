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

    // componentWillReceiveProps(next){
    //     this.forceUpdate()
    // }

    equipItem(id){

        this.props.equipItem(id);

            // console.log("heelllooo");
            // window.location.reload();
        this.props.getInventory();
        this.props.getEquipped();
    }

    unequipItem(id){
            this.props.unequipItem(id);
            // setTimeout(function () {
            window.location.reload();
            // }, 1000)
    }

    render() {
        let inventory = this.props.inventory.map(item => {
                return (
                    <div className="itemCard" key={item.id}>
                    {this.props.equipped.includes(Number(item.itemid)) ? <button className="buybutton" onClick={()=>unequipItem(item.itemid)}>Unequip</button>:<button className="buybutton" onClick={()=>equipItem(item.itemid)}>Equip</button>}
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
export default connect(mapStateToProps, { getInventory, equipItem, getEquipped, unequipItem })(Inventory)