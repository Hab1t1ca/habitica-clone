import React, { Component } from 'react';
import "./inventory.css";
import Nav from '../nav/nav';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { getInventory } from '../../ducks/reducer';
import { connect } from 'react-redux';

class Inventory extends Component {

    componentDidMount(){
        this.props.getInventory()
    }


    render() {
        return (
            <div>
                <Nav />
                <h1>Inventory</h1>
                <DropDownMenu>
                    <MenuItem value={1} primaryText="Cost v" />
                    <MenuItem value={2} primaryText="Cost ^" />
                    <MenuItem value={3} primaryText="Lvl v" />
                    <MenuItem value={4} primaryText="Lvl ^" />
                </DropDownMenu>

                <div>
                    {console.log(this.props.user.inventory,"inventory")}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        inventory: state.inventory
    }
}
export default connect(mapStateToProps, { getInventory })(Inventory)