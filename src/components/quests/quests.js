import React, { Component } from 'react';
import { connect } from 'react-redux';
import {quests, equipQuest} from '../../ducks/reducer'
import axios from 'axios';
import Nav from '../nav/nav';
import './quests.css';
import Dialog from 'material-ui/Dialog';


class Quests extends Component {
    constructor() {
        super();

        this.state = {
            questData: [],
            modal: false
        }

    }

    componentDidMount() {
        axios.get('/api/getQuests').then(res => {
            this.setState({
                questData: res.data
            })
        })
    }

    equipQuest(id){
        this.props.equipQuest(id);
        this.setState({
            modal: true
        })
    }

    handleClose = () => {
        this.setState({modal: false});
      };
     

    render() {
        let quests = this.state.questData.map(quest =>
            <div className="questBlock" key={quest.id}>
                <h2 className="questName">{quest.name}</h2>
                <img className="questPic" src={quest.avatar}/>
                <p className="questDes">{quest.description}</p>
                <p className="questP">Boss HP: {quest.bosshp}</p>
                <p className="questP">Boss Damage: {quest.bossdmg}</p>
                <p className="questP">Required Level: {quest.lvl}</p>
                <button className="questBtn" onClick={()=>this.equipQuest(quest.id)}>Start Quest!</button>
            </div>
        )

        return (
            <div className="questsDiv">
                <Nav />
                <h1 className="questHeader">Available Quests</h1>
                {quests}
                <Dialog
                    title="Your fight has begun!"
                    open={this.state.modal}
                    modal={false}
                    onRequestClose={this.handleClose}
                    paperProps={{
                        style: {
                            borderRadius: '0px',
                            width: '100%',
                            border: '1px solid white',
                        }
                    }}
                    style={{ opacity: '0.9', textAlign: "center", borderRadius: '25px', background: '#3D315B', }}
                >
                </Dialog>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        quest: state.id

    }
}
export default connect(mapStateToProps, {quests, equipQuest})(Quests)