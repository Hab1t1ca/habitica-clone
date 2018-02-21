import React, { Component } from 'react';
import Nav from '../nav/nav';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { createChar } from '../../ducks/reducer';

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            firstModal: false,
            name: '',
            secondModal: false,
            thirdModal: false,
            class: ''
        }
    }

    name(string) {
        this.setState({
            name: string
        })
    }

    openFirstModal() {
        this.setState({
            firstModal: true
        })
    }

    submitUserName() {
        this.setState({
            firstModal: false,
            secondModal: true
        })
        //query to DB
    }


    class(field) {
        this.setState({
            class: field,
            secondModal: false,
            thirdModal: true
        })
    }

    render() {
        let createChar = this.props.createChar;

        console.log(this.state.class)
        return (
            <div>
                <Nav />
                <h1>Dashboard</h1>
                <button onClick={e => this.openFirstModal()}>Open Modal - test</button>
                {/* first modal */}
                <Dialog
                    title="Welcome to Stick To It!"
                    open={this.state.firstModal}
                    modal={true}
                    paperProps={{
                        style: { borderRadius: '25px' }
                    }}
                    style={{ opacity: '0.9', textAlign: "center", borderRadius: '25px' }}
                >
                    <p>Please call your stick person something. We don't care what. Just stick it in the box.</p>
                    <input placeholder="Name thing goes here" onChange={e => this.name(e.target.value)} />
                    <button onClick={createChar(this.state.name)}>Submit</button>
                </Dialog>
                {/* second modal */}
                <Dialog
                    title="Choose a character class:"
                    open={this.state.secondModal}
                    modal={true}
                    paperProps={{
                        style: { borderRadius: '25px' }
                    }}
                    style={{ opacity: '0.9', textAlign: "center", borderRadius: '25px' }}
                >

                    <div onClick={this.class.bind(this, 'mage')}>Mage</div>
                    <div onClick={this.class.bind(this, 'rogue')}>Rogue</div>
                    <div onClick={this.class.bind(this, 'warrior')}>Warrior</div>
                </Dialog>
                {/* third modal */}
                <Dialog
                    title="Choose a sexy bod..."
                    open={this.state.thirdModal}
                    modal={true}
                    paperProps={{
                        style: { borderRadius: '25px' }
                    }}
                    style={{ opacity: '0.9', textAlign: "center", borderRadius: '25px' }}
                >
                    <p>...or upload your face.</p>
                </Dialog>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        name: state.name
    }
}
export default connect(mapStateToProps, { createChar })(Dashboard)